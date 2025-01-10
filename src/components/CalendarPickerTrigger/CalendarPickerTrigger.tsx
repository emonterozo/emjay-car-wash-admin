import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Modal,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { font, color } from '@app/styles';
import { IMAGES } from '@app/constant';
import MaterialCommunityIcon from '../MaterialCommunityIcon/MaterialCommunityIcon';

export type CalendarPickerTriggerProps = {
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
};

// Days of the week
const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const daysInCurrentMonth = 29; // Days in the current month
const daysInPreviousMonth = 30; // Days in the previous month (adjust dynamically if needed)

const startingDay = 2; // The first day of the current month (0 = Sunday, 1 = Monday, etc.)

// Generate dates for the previous month to fill the start
const previousMonthDays = Array.from(
  { length: startingDay },
  (_, i) => daysInPreviousMonth - startingDay + i + 1,
);

// Generate dates for the current month
const currentMonthDays = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

// Generate dates for the next month to fill the end
const nextMonthDays = Array.from(
  { length: (7 - ((startingDay + daysInCurrentMonth) % 7)) % 7 },
  (_, i) => i + 1,
);

// Combine all days
const allDays = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

const CalendarPickerTrigger = ({
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

  const handlePressSelected = () => {
    borderColor.value = getColor();
    setIsCalendarOpen(false);
  };

  useEffect(() => {
    borderColor.value = error ? '#FF7070' : getColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

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
      <Modal visible={isCalendarOpen} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalViewContainer}>
            <View style={styles.row}>
              <MaterialCommunityIcon name="chevron-left-circle" size={25} color={color.primary} />
              <Text style={styles.date}>July 2024</Text>
              <MaterialCommunityIcon name="chevron-right-circle" size={25} color={color.primary} />
            </View>
            <View style={styles.separator} />
            <View>
              <View style={styles.headerRow}>
                {daysOfWeek.map((day, index) => (
                  <Text key={index} style={styles.headerText}>
                    {day}
                  </Text>
                ))}
              </View>
              <View style={styles.daysContainer}>
                {allDays.map((day, index) => (
                  <View key={index} style={styles.dayCell}>
                    <TouchableOpacity
                      style={[
                        styles.dayButton,
                        day === 1 &&
                          index >= startingDay &&
                          index < startingDay + daysInCurrentMonth &&
                          styles.selectedDay,
                      ]}
                      onPress={handlePressSelected}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          day === 1 &&
                            index >= startingDay &&
                            index < startingDay + daysInCurrentMonth &&
                            styles.selectedDayText,
                          index < startingDay && styles.notActiveDate,
                          index >= startingDay + daysInCurrentMonth && styles.notActiveDate,
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.separator} />
            <Pressable style={styles.closeButton}>
              <Text style={styles.close}>Choose</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(141, 141, 141, 0.43)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalViewContainer: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: color.background,
    borderRadius: 8,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  date: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#000000',
    flex: 1,
    textAlign: 'center',
  },
  separator: {
    borderColor: '#DCDCDC',
    borderWidth: 1,
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  headerText: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: '#888888',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCell: {
    width: '14.285%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButton: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  dayText: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: '#050303',
  },
  selectedDay: {
    backgroundColor: color.primary,
  },
  selectedDayText: {
    color: color.background,
  },
  notActiveDate: {
    color: '#88888888',
  },
  closeButton: {
    backgroundColor: color.primary,
    padding: 8,
    borderRadius: 8,
    minWidth: 71,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  close: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: color.background,
  },
});

export default CalendarPickerTrigger;
