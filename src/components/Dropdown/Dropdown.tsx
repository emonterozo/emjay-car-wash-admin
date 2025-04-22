import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { MaterialCommunityIcon } from '..';
import { font, color } from '@app/styles';
import { isStringEmpty } from '@app/helpers';
import { HighImportanceIcon } from '@app/icons';

export type Option = {
  id: string;
  icon?: React.ReactElement;
  label: string;
};

export type DropdownProps = {
  label: string;
  labelColor?: string;
  placeholderTextColor?: string;
  placeholder?: string;
  enableColor?: string;
  disabledColor?: string;
  textColor?: string;
  selected: Option | undefined;
  options: Option[];
  onSelected: (selected: Option) => void;
  error?: string;
  optionMinWidth?: number;
  isDisabled?: boolean;
  onToggleOpen?: () => void;
};

const Dropdown = ({
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
  optionMinWidth,
  isDisabled,
  onToggleOpen,
}: DropdownProps) => {
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

  const handlePressSelected = (option: Option) => {
    borderColor.value = getDropdownColor();
    setIsOptionOpen(false);
    onSelected(option);
  };

  useEffect(() => {
    if (error) {
      borderColor.value = isStringEmpty(error) ? getDropdownColor() : '#FF7070';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <View style={styles.content}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <TouchableWithoutFeedback onPress={handlePressOpen} disabled={isDisabled}>
        <Animated.View
          style={[styles.container, { backgroundColor: getDropdownColor() }, animatedStyle]}
        >
          {selected?.icon}
          {selected ? (
            <Text style={[styles.label, { color: textColor }]}>{selected?.label}</Text>
          ) : (
            <Text
              style={[
                styles.text,
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
          <HighImportanceIcon width={16} height={16} fill="#FF7070" />
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
      {isOptionOpen && (
        <View
          style={[
            styles.optionsContainer,
            {
              shadowColor: color.black,
              backgroundColor: color.background,
              minWidth: optionMinWidth,
            },
          ]}
        >
          {options.map((option) => (
            <TouchableOpacity key={option.id} onPress={() => handlePressSelected(option)}>
              <View style={styles.option}>
                {option.icon}
                <Text style={styles.optionText}>{option.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
  text: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
    flex: 1,
    paddingVertical: 18,
  },
  option: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  optionsContainer: {
    borderRadius: 18,
    position: 'absolute',
    zIndex: 999,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 12,
    paddingVertical: 18,
    gap: 12,
    maxWidth: '100%',
    right: 0,
    top: 90,
  },
  optionText: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
    flex: 1,
    color: '#696969',
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
});

export default Dropdown;
