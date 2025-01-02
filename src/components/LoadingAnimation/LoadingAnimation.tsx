import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import LottieView from 'lottie-react-native';

export type LoadingAnimationProps = {
  isLoading: boolean;
};

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ isLoading }) => {
  return (
    <Modal visible={isLoading} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <LottieView
          style={styles.loading}
          source={require('../../../assets/lottie/loading.json')}
          autoPlay
          loop
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
