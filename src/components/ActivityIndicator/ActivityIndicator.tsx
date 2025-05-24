import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export type LoadingAnimationProps = {
  isLoading: boolean;
};

const ActivityIndicator: React.FC<LoadingAnimationProps> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <View style={styles.modalContainer}>
        <LottieView
          style={styles.loading}
          source={require('../../../assets/lottie/loading.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  return undefined;
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 100,
    height: 100,
  },
});

export default ActivityIndicator;
