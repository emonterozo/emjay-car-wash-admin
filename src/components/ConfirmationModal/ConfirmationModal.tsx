import React from 'react';
import { StyleSheet, View, Modal, Text, Dimensions, Image } from 'react-native';

import { font } from '@app/styles';
import { CONFIRM_TYPE, IMAGES } from '@app/constant';
import { Button } from '..';

export type ConfirmationModalProps = {
  isVisible: boolean;
  type: keyof typeof CONFIRM_TYPE;
  onYes: () => void;
  onNo: () => void;
  textCancel?: string;
  textProceed?: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  type,
  onNo,
  onYes,
  textCancel = 'No',
  textProceed = 'Yes',
}) => {
  return (
    <View>
      <Modal visible={isVisible} animationType="slide" onRequestClose={onNo} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalViewContainer}>
            <Image source={IMAGES.CANCEL} style={styles.image} resizeMode="contain" />
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{CONFIRM_TYPE[type].title}</Text>
              <Text style={styles.descriptionText}>{CONFIRM_TYPE[type].description}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={textCancel}
                variant="secondary"
                secondaryBackgroundColor="white"
                buttonStyle={styles.button}
                textStyle={styles.textStyle}
                onPress={onNo}
              />
              <Button
                title={textProceed}
                variant="primary"
                buttonStyle={styles.button}
                textStyle={styles.textStyle}
                onPress={onYes}
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
    ...font.regular,
    fontSize: 19.12,
    lineHeight: 19.12,
    color: '#050303',
    textAlign: 'center',
  },
  descriptionText: {
    ...font.regular,
    fontSize: 12.75,
    lineHeight: 12.75,
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
    lineHeight: 19.12,
  },
  image: {
    width: 207,
    height: 207,
  },
});

export default ConfirmationModal;
