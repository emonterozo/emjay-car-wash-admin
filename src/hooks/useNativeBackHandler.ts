import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useNativeBackHandler = (onBackPress: () => boolean) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return onBackPress();
    });

    return () => backHandler.remove();
  }, [onBackPress]);
};

export default useNativeBackHandler;
