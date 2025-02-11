import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { STATISTICS_FILTER } from '@app/constant';
import { CheckIcon } from '@app/icons';
import { color, font } from '@app/styles';

type FilterOptionProps = {
  selectedOptions: string[];
  toggleSelected: (item: string) => void;
  top: number;
};

const FilterOption = ({ selectedOptions, toggleSelected, top }: FilterOptionProps) => {
  return (
    <View style={[styles.container, { top }]}>
      <Text style={styles.label}>Select Filter</Text>
      {STATISTICS_FILTER.map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.selectionRow, selectedOptions.includes(item) && styles.selected]}
          onPress={() => toggleSelected(item)}
        >
          <CheckIcon fill={selectedOptions.includes(item) ? undefined : '#F4F9FD'} />
          <Text style={selectedOptions.includes(item) ? styles.selectedLabel : styles.label}>
            {item}
          </Text>
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
  label: {
    ...font.regular,
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
