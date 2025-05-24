import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import {
  add,
  format,
  getDaysInMonth,
  isAfter,
  isBefore,
  isSameMonth,
  isValid,
  sub,
  subMonths,
} from 'date-fns';

import { Button, MaterialCommunityIcon, TextInput } from '..';
import { color, font } from '@app/styles';
import {
  getCurrentDateAtMidnightUTC,
  getMinimumDateAtMidnightUTC,
  isValidDateString,
} from '@app/helpers';

const getMaxDayForMonth = (selectedDate: Date, minDate: Date, maxDate: Date) => {
  // Create a date for the specific day
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const day = selectedDate.getDate();
  const dateHolder = new Date(year, month, day); // Month is 0-based

  if (isSameMonth(selectedDate, minDate) && day < minDate.getDate()) {
    return minDate.getDate();
  }

  if (isSameMonth(selectedDate, maxDate) && day > maxDate.getDate()) {
    return maxDate.getDate();
  }

  if (isValid(dateHolder) && dateHolder.getDate() === day) {
    return day; // The day exists in this month and year
  } else {
    // Get the maximum number of days in the given month and year
    return getDaysInMonth(new Date(year, month - 1));
  }
};

// Days of the week
const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

type CalendarPickerProps = {
  date: Date;
  isVisible?: boolean;
  onSelectedDate: (date: Date) => void;
  onClose: () => void;
  maxDate?: Date;
  minDate?: Date;
};

const CalendarPicker = ({
  date,
  isVisible,
  onSelectedDate,
  onClose,
  maxDate = getCurrentDateAtMidnightUTC(),
  minDate = getMinimumDateAtMidnightUTC(),
}: CalendarPickerProps) => {
  const [days, setDays] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedDay, setSelectedDay] = useState(date.getDate());
  const [currentDate, setCurrentDate] = useState<
    | {
        startingDay: number;
        daysInCurrentMonth: number;
      }
    | undefined
  >(undefined);
  const [isDefaultSelection, setIsDefaultSelection] = useState(true);
  const [inputtedDate, setInputtedDate] = useState(format(date, 'MM/dd/yyyy'));
  const [inputError, setInputError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSelectedDate(date);
    setSelectedDay(date.getDate());
    setInputtedDate(format(date, 'MM/dd/yyyy'));
  }, [date]);

  useEffect(() => {
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1); // first day of the month

    const daysInCurrentMonth = getDaysInMonth(selectedDate); // Days in the current month
    const daysInPreviousMonth = getDaysInMonth(subMonths(selectedDate, 1)); // Days in the previous month
    const startingDay = firstDayOfMonth.getDay(); // The first day of the current month (0 = Sunday, 1 = Monday, etc.)

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
    setCurrentDate({
      startingDay,
      daysInCurrentMonth,
    });

    setSelectedDay(selectedDate.getDate());
    setDays(allDays);
  }, [selectedDate, minDate, maxDate]);

  const handlePressConfirm = () => {
    if (isDefaultSelection) {
      onSelectedDate(selectedDate);
    } else {
      if (!isValidDateString(inputtedDate)) {
        setInputError('Please input a valid date (MM/DD/YYYY)');
        return;
      }

      const [month, day, year] = inputtedDate.split('/').map(Number);

      // Check if month is valid (1-12) and day is valid for the given month
      if (month < 1 || month > 12 || day < 1 || day > 31) {
        setInputError('Please enter a valid month (1-12) and day (1-31)');
        return;
      }

      // Check for days in months with fewer than 31 days
      const daysInMonth = new Date(year, month, 0).getDate(); // Get last day of the month
      if (day > daysInMonth) {
        setInputError(
          'The day you entered is not valid for the selected month. Please enter a valid day',
        );
        return;
      }

      const formattedDate = new Date(Date.UTC(year, month - 1, day));

      if (isBefore(formattedDate, minDate)) {
        setInputError(`The date cannot be earlier than ${format(minDate, 'MM/dd/yyyy')}`);
      } else if (isAfter(formattedDate, maxDate)) {
        setInputError(`The date cannot be later than ${format(maxDate, 'MM/dd/yyyy')}`);
      } else {
        setIsDefaultSelection(true);
        setSelectedDay(formattedDate.getDate());
        setSelectedDate(formattedDate);
        onSelectedDate(formattedDate);
      }
    }
  };

  const handlePressClose = () => {
    setSelectedDay(date.getDate());
    setSelectedDate(date);
    setIsDefaultSelection(true);
    onClose();
  };

  const onChevronClick = (action: 'inc' | 'dec') => {
    if (action === 'inc') {
      setSelectedDate((dateData) => {
        const selected = add(dateData, { months: 1 });
        const day = getMaxDayForMonth(selected, minDate, maxDate);

        return new Date(Date.UTC(selected.getFullYear(), selected.getMonth(), day));
      });
    } else {
      setSelectedDate((dateData) => {
        const selected = sub(dateData, { months: 1 });
        const day = getMaxDayForMonth(selected, minDate, maxDate);

        return new Date(Date.UTC(selected.getFullYear(), selected.getMonth(), day));
      });
    }
  };

  const onSelectedDay = (day: number) => {
    setSelectedDate((dateData) => {
      return new Date(Date.UTC(dateData.getFullYear(), dateData.getMonth(), day));
    });
  };

  const formatDate = (text: string) => {
    let cleaned = text.replace(/\D/g, '');

    if (cleaned.length > 4) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    } else if (cleaned.length > 2) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }

    setInputtedDate(cleaned);
  };

  return (
    <View style={styles.container}>
      <Modal visible={isVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalViewContainer}>
            <View style={styles.row}>
              {isDefaultSelection && (
                <TouchableOpacity
                  style={[styles.arrow, styles.arrowLeft]}
                  onPress={() => onChevronClick('dec')}
                  disabled={isSameMonth(selectedDate, minDate)}
                >
                  <MaterialCommunityIcon name="chevron-left" size={25} color="#88888888" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.content}
                onPress={() => setIsDefaultSelection(!isDefaultSelection)}
              >
                <Text style={styles.date}>
                  {isDefaultSelection ? format(selectedDate, 'MMMM yyyy') : 'Date Manual Input'}
                </Text>
              </TouchableOpacity>
              {isDefaultSelection && (
                <TouchableOpacity
                  style={[styles.arrow, styles.arrowRight]}
                  onPress={() => onChevronClick('inc')}
                  disabled={isSameMonth(selectedDate, maxDate)}
                >
                  <MaterialCommunityIcon name="chevron-right" size={25} color="#88888888" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.separator} />
            {isDefaultSelection ? (
              <View>
                <View style={styles.headerRow}>
                  {daysOfWeek.map((day, index) => (
                    <Text key={index} style={styles.headerText}>
                      {day}
                    </Text>
                  ))}
                </View>
                <View style={styles.daysContainer}>
                  {currentDate &&
                    days.map((day, index) => {
                      const { startingDay, daysInCurrentMonth } = currentDate;
                      const maxDay = maxDate.getUTCDate();
                      const minDay = minDate.getUTCDate();

                      return (
                        <View key={index} style={styles.dayCell}>
                          <TouchableOpacity
                            style={[
                              styles.dayButton,
                              day === selectedDay &&
                                styles.selectedDay &&
                                index >= startingDay &&
                                index < startingDay + daysInCurrentMonth &&
                                styles.selectedDay,
                            ]}
                            disabled={
                              index < startingDay ||
                              index >= startingDay + daysInCurrentMonth ||
                              (day > maxDay && isSameMonth(selectedDate, maxDate)) ||
                              (day < minDay && isSameMonth(selectedDate, minDate))
                            }
                            onPress={() => onSelectedDay(day)}
                          >
                            <Text
                              style={[
                                styles.dayText,
                                day === selectedDay && styles.selectedDayText,
                                index < startingDay && styles.notActiveDate,
                                index >= startingDay + daysInCurrentMonth && styles.notActiveDate,
                                day > maxDay &&
                                  isSameMonth(selectedDate, maxDate) &&
                                  styles.notActiveDate,
                                day < minDay &&
                                  isSameMonth(selectedDate, minDate) &&
                                  styles.notActiveDate,
                              ]}
                            >
                              {day}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                </View>
              </View>
            ) : (
              <View style={styles.manualContainer}>
                <TextInput
                  label="Please input a date"
                  placeholder="MM/DD/YYYY"
                  error={inputError}
                  value={inputtedDate}
                  onChangeText={formatDate}
                  maxLength={10}
                  keyboardType="number-pad"
                  onFocus={() => setInputError(undefined)}
                />
              </View>
            )}
            <View style={styles.separator} />
            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                variant="secondary"
                buttonStyle={styles.button}
                textStyle={styles.textStyle}
                onPress={handlePressClose}
              />
              <Button
                title="Confirm"
                variant="primary"
                buttonStyle={styles.button}
                textStyle={styles.textStyle}
                onPress={handlePressConfirm}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
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
  buttonContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '60%',
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  textStyle: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
  },
  manualContainer: {
    width: '100%',
  },
  content: {
    flex: 1,
  },
  arrow: {
    width: 25,
  },
  arrowLeft: {
    marginLeft: 20,
  },
  arrowRight: {
    marginRight: 20,
  },
});

export default CalendarPicker;
