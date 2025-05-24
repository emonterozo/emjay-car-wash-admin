import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import { font } from '@app/styles';

const months = Array.from({ length: 12 }, (_, i) => ({
  label: new Date(0, i).toLocaleString('default', { month: 'long' }),
  value: i,
}));

const createYearsArray = (minDate: Date, maxDate: Date) => {
  const minYear = minDate.getFullYear();
  const maxYear = maxDate.getFullYear();

  return Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
    const year = minYear + i;
    return { label: `${year}`, value: year };
  });
};

const ITEM_HEIGHT = 60; // The height of each item
const VISIBLE_ITEMS = 3;

type Field = 'month' | 'year';

type CalendarWheelPickerProps = {
  selectedMonth: number;
  selectedYear: number;
  onSelected: (type: Field, value: number) => void;
  minDate: Date;
  maxDate: Date;
};

type Data = {
  label: string;
  value: number;
};

const CalendarWheelPicker = ({
  selectedMonth,
  selectedYear,
  onSelected,
  minDate,
  maxDate,
}: CalendarWheelPickerProps) => {
  const handleMomentumScroll =
    (field: Field, data: Data[]) => (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ITEM_HEIGHT);
      onSelected(field, data[index].value);
    };

  const getInitialIndex = (data: Data[], selectedValue: number) => {
    return data.findIndex((item) => item.value === selectedValue);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={months}
        keyExtractor={(item) => item.value.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.label}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={handleMomentumScroll('month', months)}
        style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS }}
        contentContainerStyle={{
          paddingVertical: (ITEM_HEIGHT * VISIBLE_ITEMS) / 2 - ITEM_HEIGHT / 2,
        }}
        initialScrollIndex={getInitialIndex(months, selectedMonth)} // Snap to the selected month
        getItemLayout={(_data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })} // Improves performance
      />
      <FlatList
        data={createYearsArray(minDate, maxDate)}
        keyExtractor={(item) => item.value.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.label}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={handleMomentumScroll('year', createYearsArray(minDate, maxDate))}
        style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS }}
        contentContainerStyle={{
          paddingVertical: (ITEM_HEIGHT * VISIBLE_ITEMS) / 2 - ITEM_HEIGHT / 2,
        }}
        initialScrollIndex={getInitialIndex(createYearsArray(minDate, maxDate), selectedYear)} // Snap to the selected month
        getItemLayout={(_data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })} // Improves performance
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  item: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...font.regular,
    fontSize: 20,
    lineHeight: 20,
    color: '#888888',
  },
});

export default CalendarWheelPicker;
