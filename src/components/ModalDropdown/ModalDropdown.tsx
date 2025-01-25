import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import FastImage from '@d11/react-native-fast-image';

import { Button, MaterialCommunityIcon } from '..';
import { font, color } from '@app/styles';
import { isStringEmpty } from '@app/helpers';
import { IMAGES } from '@app/constant';
import { ChevronLeftIcon } from '@app/icons';

export type ModalDropdownOption = {
  id: string;
  image: string;
  title: string;
  description: string;
  value?: string | number;
};

export type ModalDropdownProps = {
  label: string;
  labelColor?: string;
  placeholderTextColor?: string;
  placeholder?: string;
  enableColor?: string;
  disabledColor?: string;
  textColor?: string;
  selected: string[];
  options: ModalDropdownOption[];
  onSelected: (selected: string[]) => void;
  error?: string;
  isDisabled?: boolean;
  onToggleOpen?: () => void;
  title: string;
  multiSelect?: boolean;
};

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const ModalDropdown = ({
  label,
  labelColor = '#050303',
  placeholderTextColor = '#696969',
  enableColor = '#ECECEC',
  disabledColor = '#D9D9D9',
  textColor = '#050303',
  placeholder,
  selected,
  options,
  onSelected,
  error,
  isDisabled,
  onToggleOpen,
  title,
  multiSelect = false,
}: ModalDropdownProps) => {
  const [selectedHolder, setSelectedHolder] = useState(selected);
  const getDropdownColor = () => {
    return isDisabled ? disabledColor : enableColor;
  };

  const borderColor = useSharedValue(getDropdownColor());
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(borderColor.value, { duration: 200 }),
    };
  });

  const handlePressOpen = () => {
    borderColor.value = !isOptionOpen ? color.primary : getDropdownColor();
    setIsOptionOpen(!isOptionOpen);
    if (onToggleOpen) {
      onToggleOpen();
    }
  };

  const handlePressSelected = () => {
    borderColor.value = getDropdownColor();
    setIsOptionOpen(false);
    onSelected(selectedHolder);
  };

  useEffect(() => {
    if (error) {
      borderColor.value = isStringEmpty(error) ? getDropdownColor() : '#FF7070';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const getSelectedTitle = () => {
    const selectedTitle = selected.map((item) => {
      return options.find((option) => option.id === item)?.title;
    });

    return selectedTitle.join(', ');
  };

  const handlePressCancel = () => {
    borderColor.value = !isOptionOpen ? color.primary : getDropdownColor();
    setIsOptionOpen(!isOptionOpen);
    setSelectedHolder(selected);
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
    <View style={styles.content}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <TouchableWithoutFeedback onPress={handlePressOpen} disabled={isDisabled}>
        <Animated.View
          style={[styles.container, { backgroundColor: getDropdownColor() }, animatedStyle]}
        >
          {selected.length > 0 ? (
            <Text numberOfLines={1} style={[styles.label, { color: textColor }]}>
              {getSelectedTitle()}
            </Text>
          ) : (
            <Text
              numberOfLines={1}
              style={[
                styles.label,
                {
                  color: placeholderTextColor,
                },
              ]}
            >
              {placeholder}
            </Text>
          )}
          <MaterialCommunityIcon
            name={isOptionOpen ? 'chevron-up' : 'chevron-down'}
            color="#888888"
            size={30}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      {error && (
        <View style={styles.errorContainer}>
          <Image source={IMAGES.TERMINATED_STATUS} resizeMode="contain" style={styles.image} />
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
      <View>
        <Modal visible={isOptionOpen} animationType="slide" transparent={true}>
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
                        style={styles.optionImage}
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
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 8,
  },
  label: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
    flex: 1,
  },
  container: {
    height: 54,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 23,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  error: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: '#FF7070',
    flex: 1,
  },
  image: {
    width: 16,
    height: 16,
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
