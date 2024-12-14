import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Modal, Card, Text, Button } from '@ui-kitten/components';

import { IMAGES } from '@app/constant';

export type ErrorModalProps = {
  isVisible: boolean;
  variant: 'network' | 'server';
  onRetry: () => void;
  onCancel: () => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ isVisible, variant, onCancel, onRetry }) => {
  return (
    <Modal visible={isVisible} backdropStyle={styles.backdrop}>
      <Card disabled={true} style={styles.card}>
        <View style={styles.header}>
          <Image
            source={variant === 'network' ? IMAGES.NO_INTERNET : IMAGES.SERVER_DOWN}
            style={styles.image}
            resizeMode="contain"
          />
          <Text category="h5" style={styles.title}>
            {variant === 'network' ? 'No Internet Connection' : 'Something went wrong'}
          </Text>
        </View>
        <Text category="p1" appearance="hint" style={styles.description}>
          {variant === 'network'
            ? 'Poor network connection detected. Please check your connectivity'
            : 'We are currently experiencing some issues with our server. Please try again'}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            style={[styles.button, styles.cancelButton]}
            appearance="outline"
            onPress={onCancel}
          >
            Cancel
          </Button>
          <Button style={styles.button} status="primary" onPress={onRetry}>
            Try Again
          </Button>
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(33, 37, 41, 0.8)',
  },
  card: {
    borderRadius: 16,
    padding: 10,
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 12,
  },
  image: {
    width: 50,
    height: 50,
  },
  title: {
    flexWrap: 'wrap',
    flex: 1,
  },
  description: {
    marginBottom: 24,
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
});

export default ErrorModal;
