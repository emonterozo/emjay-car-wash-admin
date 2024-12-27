import React from 'react';
import { StyleSheet, View, Modal, Pressable, Text, Dimensions } from 'react-native';

import { NetworkErrorIcon } from '@app/icons';
import { color, font } from '@app/styles';

export type ErrorModalProps = {
  isVisible: boolean;
  onRetry: () => void;
  onCancel: () => void;
};

const titleText = 'Something went wrong';
const descriptionText =
  "We're actively resolving the issue. Please refresh the page and try again.";

const ErrorModal: React.FC<ErrorModalProps> = ({ isVisible, onCancel, onRetry }) => {
  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onCancel} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalViewContainer}>
          <NetworkErrorIcon />

          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{titleText}</Text>
            <Text style={styles.descriptionText}>{descriptionText}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={onCancel}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? color.primary : 'white',
                  borderColor: pressed ? color.primary : '#9A9A9A',
                  borderWidth: 1,
                },
                styles.buttonCardContainer,
              ]}
            >
              {({ pressed }) => (
                <Text style={[styles.buttonCancelText, pressed && { color: color.background }]}>
                  Cancel
                </Text>
              )}
            </Pressable>
            <Pressable
              onPress={onRetry}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? color.primary_pressed_state : color.primary,
                },
                styles.buttonCardContainer,
              ]}
            >
              <Text style={styles.buttonTryAgainText}>Try Again</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(141, 141, 141, 0.43)',
  },
  modalViewContainer: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: 'white',
    borderRadius: 19.12,
    paddingVertical: 47.8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 38.24,
  },
  textContainer: {
    gap: 8,
  },
  titleText: {
    ...font.bold,
    fontSize: 19.12,
    color: 'black',
    textAlign: 'center',
  },
  descriptionText: {
    ...font.regular,
    fontSize: 12.75,
    color: '#5C5C5C',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  buttonCardContainer: {
    paddingHorizontal: 9.56,
    paddingVertical: 12.75,
    borderRadius: 47.8,
    width: 148.18,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonCancelText: {
    ...font.regular,
    fontSize: 19.12,
    textAlign: 'center',
    color: color.primary,
    lineHeight: 19.72,
  },
  buttonTryAgainText: {
    ...font.regular,
    fontSize: 19.12,
    color: 'white',
    textAlign: 'center',
    lineHeight: 19.72,
  },
});

export default ErrorModal;
