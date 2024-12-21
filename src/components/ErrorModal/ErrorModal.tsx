import React /*useState*/ from 'react';
import { StyleSheet, View, Modal, Pressable, Text, Dimensions } from 'react-native';
// import { Modal, Card, Text, Button } from '@ui-kitten/components';

// import { IMAGES } from '@app/constant';
import { NetworkErrorIcon } from '@app/icons';
// import { Text } from 'react-native-svg';
// import { Icon } from '@ui-kitten/components';

export type ErrorModalProps = {
  isVisible: boolean;
  // variant: 'network' | 'server'
  onRetry: () => void;
  onCancel: () => void;
};

const titleText = 'Something went wrong';
const descriptionText = 'Were actively resolving the issue. Please refresh the page and try again.';

const ErrorModal: React.FC<ErrorModalProps> = ({ isVisible, onCancel, onRetry }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={() => {
        onCancel;
      }}
      transparent={true}
    >
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
                  backgroundColor: pressed ? 'rgba(1, 111, 185, 0.84)' : 'white',
                  borderColor: pressed ? '#9A9A9A' : '#9A9A9A',
                  borderWidth: pressed ? 1 : 1,
                },
                styles.buttonCardContainer,
              ]}
            >
              <Text style={styles.buttonCancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={onRetry}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'rgba(255, 255, 255, 0.72)' : '#016FB9',
                },
                styles.buttonCardContainer,
              ]}
            >
              <Text style={styles.buttonTryAgainText}>Try Again</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* </View> */}
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
    width: Dimensions.get('window').width * 0.9, //- 87.81, //352.29 width as per Figma
    // height: 479.81, // height as per Figma
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
    fontSize: 19.12,
    fontFamily: 'AeonikTRIAL-Bold',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },

  descriptionText: {
    fontSize: 12.75,
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
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
    fontSize: 19.12,
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    textAlign: 'center',
    color: '#016FB9',
    lineHeight: 19.72,
  },

  buttonTryAgainText: {
    fontSize: 19.12,
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    color: 'white',
    textAlign: 'center',
    lineHeight: 19.72,
  },
});

export default ErrorModal;
