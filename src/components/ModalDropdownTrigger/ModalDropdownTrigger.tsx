import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ModalDropdownOption } from '../ModalDropdown/ModalDropdown';
import { MaterialCommunityIcon, ModalDropdown } from '..';
import { font, color } from '@app/styles';
import { isStringEmpty } from '@app/helpers';
import { IMAGES } from '@app/constant';

export type ModalDropdownTriggerProps = {
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
  imageColorBackground?: string;
};

const ModalDropdownTrigger = ({
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
  imageColorBackground,
}: ModalDropdownTriggerProps) => {
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

  const handlePressSelected = (selectedValue: string[]) => {
    borderColor.value = getDropdownColor();
    setIsOptionOpen(false);
    onSelected(selectedValue);
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
      <ModalDropdown
        isVisible={isOptionOpen}
        selected={selected}
        options={options}
        onSelected={handlePressSelected}
        title={title}
        onCancel={handlePressCancel}
        imageColorBackground={imageColorBackground}
        multiSelect={multiSelect}
      />
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
});

export default ModalDropdownTrigger;
