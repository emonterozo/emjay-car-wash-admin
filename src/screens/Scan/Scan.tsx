import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Linking } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';

import { ERR_NETWORK, IMAGES, MESSAGE, SIZE_DESCRIPTION, SIZE_ORDER } from '@app/constant';
import { LoadingAnimation } from '@app/components';
import { getCustomerServicesCountRequest } from '@app/services';
import { NavigationProp } from '../../types/navigation/types';

type ContentType = 'no_camera' | 'no_permission';

type Content = {
  type: ContentType;
  onPress: (type: ContentType) => void;
};

const Content = ({ type, onPress }: Content) => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.EMPTY_STATE} style={styles.image} resizeMode="contain" />
      <View style={styles.content}>
        <Text category="h5" style={styles.title}>
          {MESSAGE[type].title}
        </Text>
        <Text category="s1" style={styles.subtitle}>
          {MESSAGE[type].description}
        </Text>
        <Button style={styles.button} onPress={() => onPress(type)}>
          {MESSAGE[type].button}
        </Button>
      </View>
    </View>
  );
};

const Scan = () => {
  const navigation = useNavigation<NavigationProp>();
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isScannerActive, setIsScannerActive] = useState(true);
  const [screenStatus, setScreenStatus] = useState({
    isLoading: false,
    error: '',
  });

  const fetchCustomerServicesCount = (id: string) => {
    setScreenStatus({ error: '', isLoading: true });
    getCustomerServicesCountRequest(id)
      .then((response) => {
        const motorList = response.motor_services_count
          .filter((item) => item.count >= 10)
          .map((item) => ({
            icon: 'motorbike',
            size: item.size,
            // @ts-ignore
            description: SIZE_DESCRIPTION[item.size],
          }));
        const carList = response.car_services_count
          .filter((item) => item.count >= 10)
          .map((item) => ({
            icon: 'car-hatchback',
            size: item.size,
            // @ts-ignore
            description: SIZE_DESCRIPTION[item.size],
          }));

        const list = [...carList, ...motorList].sort(
          (a, b) => SIZE_ORDER.indexOf(a.size) - SIZE_ORDER.indexOf(b.size),
        );
        setScreenStatus({ ...screenStatus, isLoading: false });
        navigation.replace('AddOngoing', {
          customerId: id,
          firstName: response.first_name,
          lastName: response.last_name,
          freeCarwashList: list,
        });
      })
      .catch((error) => {
        setScreenStatus({
          isLoading: false,
          error: error.code === ERR_NETWORK ? 'network' : 'server',
        });
      });
  };

  useEffect(() => {
    requestPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      setIsScannerActive(false);
      fetchCustomerServicesCount(codes[0].value!);
    },
  });

  const onPress = (type: ContentType) => {
    if (type === 'no_permission') {
      Linking.openSettings();
    } else {
      navigation.goBack();
    }
  };

  if (!hasPermission || device == null) {
    return <Content type={hasPermission ? 'no_camera' : 'no_permission'} onPress={onPress} />;
  }
  return (
    <View style={styles.container}>
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      {isScannerActive && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isScannerActive}
          codeScanner={codeScanner}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  content: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.65,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  image: {
    width: undefined,
    height: '50%',
    aspectRatio: 1,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
    color: '#222B45',
  },
  subtitle: {
    marginBottom: 16,
    textAlign: 'center',
    color: '#8F9BB3',
  },
  button: {
    borderRadius: 8,
    width: '70%',
  },
});

export default Scan;
