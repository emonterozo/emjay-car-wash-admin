import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

const Scan = () => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isScannerActive, setIsScannerActive] = useState(true);

  useEffect(() => {
    requestPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (_codes) => {
      setIsScannerActive(false);
      //fetch details codes[0].value
    },
  });

  if (!hasPermission || device == null) {
    return <></>;
  }
  return (
    <View style={styles.container}>
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
});

export default Scan;
