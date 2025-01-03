import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { ChevronLeftIcon } from '@app/icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types/navigation/types';

type AppHeaderProps = {
  onBack?: () => void;
  title: string;
};

const AppHeader = ({ onBack, title }: AppHeaderProps) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePressBack = () => {
    return onBack ? onBack() : navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={handlePressBack}>
        <ChevronLeftIcon />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  back: {
    position: 'absolute',
    zIndex: 999,
    left: 24,
    width: 50,
    height: 50,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 24,
    color: '#050303',
  },
});

export default AppHeader;
