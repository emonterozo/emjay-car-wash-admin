import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { font, color } from '@app/styles';
import { IMAGES } from '@app/constant';
import CalendarPicker from '../CalendarPicker/CalendarPicker';
import { getCurrentDateAtMidnightUTC, getMinimumDateAtMidnightUTC } from '@app/helpers';

export type CalendarPickerTriggerProps = {
  date: Date;
  label: string;
  labelColor?: string;
  placeholderTextColor?: string;
  placeholder?: string;
  enableColor?: string;
  disabledColor?: string;
  textColor?: string;
  error?: boolean;
  value: string | undefined;
  isDisabled?: boolean;
  onSelectedDate: (date: Date) => void;
  maxDate?: Date;
  minDate?: Date;
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
  };

  const handlePressSelected = (selectedDate: Date) => {
    borderColor.value = getColor();
    setIsCalendarOpen(false);
    onSelectedDate(selectedDate);
  };

  useEffect(() => {
    borderColor.value = error ? '#FF7070' : getColor();
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
          <Image
            source={isCalendarOpen ? IMAGES.CALENDAR_ACTIVE : IMAGES.CALENDAR_INACTIVE}
            resizeMode="contain"
          />
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
    gap: 16,
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
});

export default CalendarPickerTrigger;
