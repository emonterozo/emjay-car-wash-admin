import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';

type LoadingAnimationProps = {
  isLoading: boolean;
};

const LoadingAnimation = ({ isLoading }: LoadingAnimationProps) => {
  return isLoading ? (
    <LottieView
      style={styles.loading}
      source={require('../../../assets/lottie/loading.json')}
      autoPlay
      loop
    />
  ) : null;
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: 'rgba(33, 37, 41, 0.3)',
  },
});

export default LoadingAnimation;
