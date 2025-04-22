import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { font, color } from '@app/styles';
import CalendarPicker from '../CalendarPicker/CalendarPicker';
import {
  getCurrentDateAtMidnightUTC,
  getMinimumDateAtMidnightUTC,
  isStringEmpty,
} from '@app/helpers';
import { CalendarIcon, HighImportanceIcon } from '@app/icons';

export type CalendarPickerTriggerProps = {
  date: Date;
  label: string;
  labelColor?: string;
  placeholderTextColor?: string;
  placeholder?: string;
  enableColor?: string;
  disabledColor?: string;
  textColor?: string;
  error?: string;
  value: string | undefined;
  isDisabled?: boolean;
  onSelectedDate: (date: Date) => void;
  maxDate?: Date;
  minDate?: Date;
  onPressOpen?: () => void;
};

const CalendarPickerTrigger = ({
  date,
  label,
  labelColor = '#050303',
  placeholderTextColor = '#696969',
  enableColor = '#ECECEC',
  disabledColor = '#D9D9D9',
  textColor = '#050303',
  placeholder,
  error,
  value,
  isDisabled,
  onSelectedDate,
  maxDate = getCurrentDateAtMidnightUTC(),
  minDate = getMinimumDateAtMidnightUTC(),
  onPressOpen,
}: CalendarPickerTriggerProps) => {
  const getColor = () => {
    return isDisabled ? disabledColor : enableColor;
  };

  const borderColor = useSharedValue(getColor());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(borderColor.value, { duration: 200 }),
    };
  });

  const handlePressOpen = () => {
    borderColor.value = color.primary;
    setIsCalendarOpen(true);
    if (onPressOpen) {
      onPressOpen();
    }
  };

  const handlePressSelected = (selectedDate: Date) => {
    borderColor.value = getColor();
    setIsCalendarOpen(false);
    onSelectedDate(selectedDate);
  };

  useEffect(() => {
    if (error) {
      borderColor.value = isStringEmpty(error) ? getColor() : '#FF7070';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onClose = () => {
    borderColor.value = getColor();
    setIsCalendarOpen(false);
  };

  return (
    <View style={styles.content}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <TouchableWithoutFeedback onPress={handlePressOpen} disabled={isDisabled}>
        <Animated.View style={[styles.container, { backgroundColor: getColor() }, animatedStyle]}>
          <CalendarIcon width={25} height={25} fill={value ? color.primary : '#696969'} />
          {value ? (
            <Text style={[styles.label, { color: textColor }]}>{value}</Text>
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
        </Animated.View>
      </TouchableWithoutFeedback>
      {error && (
        <View style={styles.errorContainer}>
          <HighImportanceIcon width={16} height={16} fill="#FF7070" />
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
      <CalendarPicker
        date={date}
        isVisible={isCalendarOpen}
        onSelectedDate={handlePressSelected}
        onClose={onClose}
        maxDate={maxDate}
        minDate={minDate}
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
  text: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
    flex: 1,
    paddingVertical: 18,
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

export default CalendarPickerTrigger;
