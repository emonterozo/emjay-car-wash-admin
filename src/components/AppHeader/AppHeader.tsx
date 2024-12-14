import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';

import MaterialCommunityIcon from '../MaterialCommunityIcon/MaterialCommunityIcon';

interface AppHeaderProps {
  title: string;
  onBack?: () => void;
}

const AppHeader = ({ title, onBack }: AppHeaderProps) => {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity onPress={onBack}>
          <MaterialCommunityIcon name="chevron-left" size={50} color="#04528E" />
        </TouchableOpacity>
      )}
      <Text category="h4" style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default AppHeader;
