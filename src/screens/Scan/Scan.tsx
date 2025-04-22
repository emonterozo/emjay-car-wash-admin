import { AppHeader, ErrorModal, LoadingAnimation } from '@app/components';
import { ERR_NETWORK, MESSAGE } from '@app/constant';
import GlobalContext from '@app/context';
import { AccessDeniedIcon, NoCameraIcon, UserNotFoundIcon } from '@app/icons';
import { getCustomerFreeWashServiceRequest } from '@app/services';
import { color, font } from '@app/styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Text, Pressable, Dimensions, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { NavigationProp } from 'src/types/navigation/types';
import { ScreenStatusProps } from 'src/types/services/types';

const { width, height } = Dimensions.get('window');

type MessageType = keyof typeof MESSAGE;
type OnButtonPress = () => void;

const ERROR_IMAGE: any = {
  CUSTOMER_NOT_EXIST: <UserNotFoundIcon width={85} height={85} />,
  NO_CAMERA: <NoCameraIcon width={85} height={85} />,
  PERMISSION_DENIED: <AccessDeniedIcon width={85} height={85} />,
};

const Scan = () => {
  const { user } = useContext(GlobalContext);
  const device = useCameraDevice('back');
  const navigation = useNavigation<NavigationProp>();
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isScannerActive, setIsScannerActive] = useState(true);
  const [isCustomerExist, setIsCustomerExist] = useState(true);
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [codeValue, setCodeValue] = useState<string | undefined>(undefined);
  const isFocused = useIsFocused();

  const toggleModal = () => setScreenStatus({ ...screenStatus, hasError: !screenStatus.hasError });

  useEffect(() => {
    requestPermission();
    if (isFocused) {
      setIsScannerActive(true);
      setIsCustomerExist(true);
    } else {
      setIsScannerActive(false);
    }
  }, [isFocused, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      setIsScannerActive(false);
      setCodeValue(codes[0].value);
      checkIfCustomerExist(codes[0].value);
    },
  });

  const checkIfCustomerExist = (scanCodeValue: string | undefined) => {
    if (!scanCodeValue) {
      return;
    }
    fetchEmployeeFreeWash(scanCodeValue);
  };

  const fetchEmployeeFreeWash = async (id: string) => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getCustomerFreeWashServiceRequest(
      user.accessToken,
      user.refreshToken,
      id,
    );

    if (response.success && response.data) {
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
      setIsCustomerExist(true);

      const transformedFreeWash = response.data.customer.free_wash.map(
        (item: { vehicle_type: string; size: string }) => ({
          type: item.vehicle_type,
          size: item.size,
        }),
      );

      navigation.navigate('AddOngoing', {
        customerId: response.data.customer._id,
        contactNumber: response.data.customer.contact_number,
        freeWash: transformedFreeWash,
        points: response.data.customer.points,
        transaction: undefined,
      });
    } else {
      switch (response.status) {
        case 404:
          setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
          setIsCustomerExist(false);
          setIsScannerActive(true);
          break;
        default:
          setScreenStatus({
            isLoading: false,
            type: response.error === ERR_NETWORK ? 'connection' : 'error',
            hasError: true,
          });
          break;
      }
    }
  };

  const renderErrorState = (messageType: MessageType, onButtonPress: OnButtonPress) => {
    const { title, description, button, image } = MESSAGE[messageType];

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={color.background} barStyle="dark-content" />
        <AppHeader title="QR Scan" />
        <View style={styles.displayContainer}>
          <View style={styles.errorFrame}>
            <View style={[styles.cornerTopLeft, styles.error]} />
            <View style={[styles.cornerTopRight, styles.error]} />
            <View style={[styles.cornerBottomLeft, styles.error]} />
            <View style={[styles.cornerBottomRight, styles.error]} />
            <View style={styles.iconContainer}>{ERROR_IMAGE[image]}</View>
          </View>
          <Text style={[styles.text, styles.textTitle, styles.textColor]}>{title}</Text>
          <Text style={[styles.text, styles.textDescription, styles.textColor]}>{description}</Text>
          <Pressable style={styles.button} onPress={onButtonPress}>
            <Text style={[styles.text, styles.textDescription, styles.buttonTextColor]}>
              {button}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  };

  const renderNoCamera = () => {
    return renderErrorState('no_camera', () => {
      navigation.goBack();
    });
  };

  const renderPermissionDenied = () => {
    return renderErrorState('permission_denied', () => Linking.openSettings());
  };

  const renderCustomerNotExist = () => {
    return renderErrorState('customer_not_exist', () => {
      setIsCustomerExist(true);
      setIsScannerActive(true);
    });
  };

  if (!hasPermission || device == null) {
    if (!hasPermission) {
      return renderPermissionDenied();
    }
    return renderNoCamera();
  }

  if (!isCustomerExist) {
    return renderCustomerNotExist();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="QR Scan" />
      <LoadingAnimation isLoading={screenStatus.isLoading} type="modal" />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={toggleModal}
        onRetry={() => checkIfCustomerExist(codeValue)}
      />
      <View style={styles.container}>
        <Camera
          style={{ height }}
          device={device}
          isActive={isScannerActive}
          codeScanner={codeScanner}
        />
        <Text style={styles.instruction}>{'Scan the QR Code to get\nstarted!'}</Text>
        <View style={styles.overlay}>
          <View style={styles.frame}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  textTitle: {
    ...font.regular,
    fontSize: 24,
    lineHeight: 24,
    marginBottom: 16,
  },
  textDescription: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
  },
  textColor: {
    color: '#050303',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width - 98,
    backgroundColor: color.primary,
    paddingHorizontal: 23,
    paddingVertical: 18,
    borderRadius: 24,
    marginTop: 40,
  },
  buttonTextColor: {
    color: color.background,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 135,
  },
  overlay: {
    position: 'absolute',
    top: height * 0.25,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  frame: {
    width: width * 0.6,
    height: width * 0.6,
    position: 'relative',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
  },
  instruction: {
    ...font.regular,
    fontSize: 24,
    lineHeight: 24,
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
  },
  errorFrame: {
    width: 135,
    height: 135,
    position: 'relative',
    marginBottom: 24,
  },
  error: {
    borderColor: 'black',
  },
});

export default Scan;
