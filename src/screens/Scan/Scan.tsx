import { AppHeader } from '@app/components';
import { IMAGES, MESSAGE } from '@app/constant';
import { color, font } from '@app/styles';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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

type MessageType = keyof typeof MESSAGE;
type OnButtonPress = () => void;

const Scan = () => {
  const device = useCameraDevice('back');
  const navigation = useNavigation<NavigationProp>();
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isScannerActive, setIsScannerActive] = useState(true);
  const [isCustomerExist, setIsCustomerExist] = useState(true);

  useEffect(() => {
    requestPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (_codes) => {
      setIsScannerActive(false);
      //fetch details codes[0].value
      //simulate checking of customer existence
      const customerExist = checkIfCustomerExist(_codes[0].value);
      setIsCustomerExist(customerExist);
    },
  });

  const checkIfCustomerExist = (codeValue: string | undefined) => {
    return codeValue === 'valid_customer_code';
  };

  const renderErrorState = (messageType: MessageType, onButtonPress: OnButtonPress) => {
    const { title, description, button, image } = MESSAGE[messageType];

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={color.background} barStyle="dark-content" />
        <AppHeader title="QR Scan" />
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

  const renderCustomerExist = () => {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={color.background} barStyle="dark-content" />
        <AppHeader title="QR Scan" />
        <Text>Customer Exist</Text>
      </SafeAreaView>
    );
  };

  if (!hasPermission || device == null) {
    if (!hasPermission) {
      return renderPermissionDenied();
    }
    return renderNoCamera();
  }

  if (!isCustomerExist) {
    if (!isCustomerExist) {
      return renderCustomerNotExist();
    }
    return renderCustomerExist();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="QR Scan" />
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
