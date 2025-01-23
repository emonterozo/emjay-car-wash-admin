import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcon from '../MaterialCommunityIcon/MaterialCommunityIcon';
import { color } from '@app/styles';

const FloatingActionButton = ({ onPress }: { onPress?: () => void }) => (
  <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.circle}>
      <MaterialCommunityIcon name="plus" size={24} color={color.secondary} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 30,
    zIndex: 2,
  },
  circle: {
    backgroundColor: color.primary,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default FloatingActionButton;
