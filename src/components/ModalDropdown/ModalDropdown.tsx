import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import FastImage from '@d11/react-native-fast-image';

import { Button } from '..';
import { font, color } from '@app/styles';
import { ChevronLeftIcon } from '@app/icons';

export type ModalDropdownOption = {
  id: string;
  image: string;
  title: string;
  description: string;
  value?: string | number;
};

export type ModalDropdownProps = {
  isVisible: boolean;
  selected: string[];
  options: ModalDropdownOption[];
  onSelected: (selected: string[]) => void;
  title: string;
  multiSelect?: boolean;
  imageColorBackground?: string;
  onCancel: () => void;
};

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const ModalDropdown = ({
  isVisible,
  selected,
  options,
  onSelected,
  title,
  multiSelect = false,
  imageColorBackground,
  onCancel,
}: ModalDropdownProps) => {
  const [selectedHolder, setSelectedHolder] = useState(selected);

  const handlePressSelected = () => {
    onSelected(selectedHolder);
  };

  const handlePressCancel = () => {
    setSelectedHolder(selected);
    onCancel();
  };

  const onSelect = (id: string) => {
    let selectedHolderValue = [...selectedHolder];
    if (multiSelect) {
      const index = selectedHolderValue.indexOf(id);
      if (index === -1) {
        selectedHolderValue.push(id);
      } else {
        selectedHolderValue.splice(index, 1);
      }
    } else {
      selectedHolderValue = [id];
    }

    setSelectedHolder(selectedHolderValue);
  };

  return (
    <View style={styles.container}>
      <Modal visible={isVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalViewContainer}>
            <View style={styles.headerContainer}>
              <TouchableOpacity style={styles.back} onPress={handlePressCancel}>
                <ChevronLeftIcon />
              </TouchableOpacity>
              <Text style={styles.title}>{title}</Text>
            </View>
            <FlatList
              data={options}
              showsVerticalScrollIndicator={false}
              bounces={false}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => onSelect(item.id)}>
                  <View
                    style={[styles.option, selectedHolder.includes(item.id) && styles.selected]}
                  >
                    <FastImage
                      style={[styles.optionImage, { backgroundColor: imageColorBackground }]}
                      source={{
                        uri: item.image,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    <Text style={styles.optionTitle}>{item.title}</Text>
                    <Text style={styles.optionDescription}>{item.description}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              ItemSeparatorComponent={ItemSeparator}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                variant="secondary"
                buttonStyle={styles.button}
                textStyle={styles.textStyle}
                onPress={handlePressCancel}
              />
              <Button
                title="Confirm"
                variant="primary"
                buttonStyle={styles.button}
                textStyle={styles.textStyle}
                onPress={handlePressSelected}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(141, 141, 141, 0.43)',
  },
  modalViewContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: '80%',
    backgroundColor: color.background,
    borderRadius: 24,
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  back: {
    position: 'absolute',
    zIndex: 999,
    left: 0,
    width: 32,
    height: 32,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  title: {
    ...font.regular,
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 20,
    color: '#050303',
  },
  option: {
    width: '49%',
    height: 164,
    gap: 8,
    padding: 12,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
  },
  optionImage: {
    width: 124,
    height: 100,
    borderRadius: 8,
  },
  optionTitle: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: color.black,
  },
  optionDescription: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: '#4BB543',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  separator: {
    height: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginTop: 40,
  },
  button: {
    padding: 12,
    borderRadius: 24,
    flex: 1,
  },
  textStyle: {
    ...font.regular,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 12,
  },
  selected: {
    borderWidth: 1,
    borderColor: color.primary,
  },
});

export default ModalDropdown;
