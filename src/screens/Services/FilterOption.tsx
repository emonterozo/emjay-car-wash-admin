import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { VEHICLE_TYPES, CAR_SIZES, MOTORCYCLE_SIZES } from '@app/constant';
import { CheckIcon } from '@app/icons';
import { color, font } from '@app/styles';

type FilterOptionProps = {
  selectedType: string;
  selectedSize: string;
  onSelectedType: (type: string) => void;
  onSelectedSize: (size: string) => void;
  top: number;
};

const FilterOption = ({
  selectedType,
  selectedSize,
  onSelectedType,
  onSelectedSize,
  top,
}: FilterOptionProps) => {
  return (
    <View style={[styles.container, { top }]}>
      <View style={styles.row}>
        <Text style={styles.label}>Default</Text>
        <Text style={styles.value}>Car/Small</Text>
      </View>
      {VEHICLE_TYPES.map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.selectionRow, selectedType === item && styles.selected]}
          onPress={() => onSelectedType(item)}
        >
          <CheckIcon fill={selectedType === item ? undefined : '#F4F9FD'} />
          <Text style={selectedType === item ? styles.selectedLabel : styles.label}>{item}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.label}>Size</Text>
      {(selectedType === 'Car' ? CAR_SIZES : MOTORCYCLE_SIZES).map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.selectionRow, selectedSize === item && styles.selected]}
          onPress={() => onSelectedSize(item)}
        >
          <CheckIcon fill={selectedSize === item ? undefined : '#F4F9FD'} />
          <Text style={selectedSize === item ? styles.selectedLabel : styles.label}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
    padding: 20,
    right: 15,
    borderRadius: 24,
    backgroundColor: color.background,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#888888',
  },
  value: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
    color: '#888888',
  },
  selectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingVertical: 12,
    gap: 10,
    borderRadius: 12,
    backgroundColor: '#F4F9FD',
  },
  selected: {
    backgroundColor: '#DFF2FF',
  },
  selectedLabel: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: color.primary,
  },
});

export default FilterOption;
