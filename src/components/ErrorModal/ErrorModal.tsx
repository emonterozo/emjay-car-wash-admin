import React from 'react';
import { StyleSheet, View, Modal, Text, Dimensions, Image } from 'react-native';

import { font } from '@app/styles';
import { ERROR_TYPE, IMAGES } from '@app/constant';
import { Button } from '..';

export type ErrorModalProps = {
  isVisible: boolean;
  type: keyof typeof ERROR_TYPE;
  onRetry: () => void;
  onCancel: () => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ isVisible, type, onCancel, onRetry }) => {
  return (
    <View>
      <Modal visible={isVisible} animationType="slide" onRequestClose={onCancel} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalViewContainer}>
            <Image
              source={type === 'error' ? IMAGES.ERROR : IMAGES.NO_CONNECTION}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{ERROR_TYPE[type].title}</Text>
              <Text style={styles.descriptionText}>{ERROR_TYPE[type].description}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                variant="secondary"
                secondaryBackgroundColor="white"
                buttonStyle={styles.button}
                textStyle={styles.textStyle}
                onPress={onCancel}
              />
              <Button
                title="Try Again"
                variant="primary"
                buttonStyle={styles.button}
                textStyle={styles.textStyle}
                onPress={onRetry}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    color: '#050303',
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
  button: {
    paddingHorizontal: 9.56,
    paddingVertical: 12.75,
    borderRadius: 47.8,
    flex: 1,
  },
  textStyle: {
    ...font.regular,
    fontSize: 19.12,
    textAlign: 'center',
    lineHeight: 19.72,
  },
  image: {
    width: 207,
    height: 207,
  },
});

export default ErrorModal;
