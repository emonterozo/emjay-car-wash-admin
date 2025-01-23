import { AppHeader, ErrorModal, LoadingAnimation } from '@app/components';
import { ERR_NETWORK, IMAGES, MESSAGE } from '@app/constant';
import GlobalContext from '@app/context';
import { getCustomerFreeWashServiceRequest } from '@app/services';
import { color, font } from '@app/styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Pressable,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { NavigationProp } from 'src/types/navigation/types';
import { ScreenStatusProps } from 'src/types/services/types';

type MessageType = keyof typeof MESSAGE;
type OnButtonPress = () => void;

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
    }

  }, [isFocused, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (_codes) => {
      setIsScannerActive(false);
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
      setCodeValue(_codes[0].value);
      checkIfCustomerExist(_codes[0].value);
    },
  });

  const checkIfCustomerExist = (scanCodeValue: string | undefined) => {
    if (!scanCodeValue) {return;}
    fetchEmployeeFreeWash(scanCodeValue);
  };

  const fetchEmployeeFreeWash = async (id: string) => {
    const response = await getCustomerFreeWashServiceRequest(user.accessToken, id);

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
        customerId: response.data.customer.id,
        freeWash: transformedFreeWash,
        transactionId: null,
        selectedServices: ['Car'],
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
        <LoadingAnimation isLoading={screenStatus.isLoading} />
        <ErrorModal
          type={screenStatus.type}
          isVisible={screenStatus.hasError}
          onCancel={toggleModal}
          onRetry={() => checkIfCustomerExist(codeValue)}
        />
        <View style={styles.displayContainer}>
          <View style={styles.iconContainer}>
            <Image source={IMAGES[image]} style={styles.image} resizeMode="contain" />
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
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={toggleModal}
        onRetry={() => checkIfCustomerExist(codeValue)}
      />
      <View style={styles.cameraContainer}>
        {isScannerActive && (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isScannerActive}
            codeScanner={codeScanner}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
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
    marginBottom: 24,
  },
  image: {
    width: 90,
    height: 97,
    alignSelf: 'center',
  },
});

export default Scan;
