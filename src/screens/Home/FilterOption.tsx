import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { color, font } from '@app/styles';

type FilterOptionProps = {
  selectedFilter: string;
  onSelectedFilter: (filter: string) => void;
  top: number;
};

const OPTIONS = [
  {
    label: 'Top',
    value: 'top',
  },
  {
    label: 'Most Recent',
    value: 'most_recent',
  },
  {
    label: 'Low',
    value: 'low',
  },
];

const FilterOption = ({ selectedFilter, onSelectedFilter, top }: FilterOptionProps) => {
  return (
    <View style={[styles.container, { top }]}>
      <View style={styles.content}>
        <Text style={styles.header}>Rated Services</Text>
        <View style={styles.options}>
          {OPTIONS.map((item) => (
            <View key={item.value}>
              <TouchableOpacity onPress={() => onSelectedFilter(item.value)}>
                <Text style={selectedFilter === item.value ? styles.selectedOption : styles.option}>
                  {item.label}
                </Text>
              </TouchableOpacity>
              {item.value !== 'low' && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
    padding: 20,
    right: 0,
    borderRadius: 24,
    backgroundColor: color.background,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    gap: 10,
    paddingVertical: 24,
    paddingHorizontal: 16,
    minWidth: 177,
  },
  content: {
    gap: 24,
  },
  options: {
    gap: 8,
  },
  header: {
    ...font.regular,
    fontSize: 16,
    color: color.black,
  },
  option: {
    ...font.regular,
    color: '#888888',
    fontSize: 16,
    lineHeight: 16,
  },
  selectedOption: {
    ...font.bold,
    color: color.black,
    fontSize: 16,
    lineHeight: 16,
  },
  separator: {
    marginTop: 5,
    borderColor: '#DCDCDC',
    borderWidth: 1,
  },
});

export default FilterOption;
