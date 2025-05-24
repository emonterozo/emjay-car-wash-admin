import React, { ReactElement } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { ChevronLeftIcon } from '@app/icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types/navigation/types';
import { font } from '@app/styles';

type AppHeaderProps = {
  onBack?: () => void;
  title: string;
  leftContent?: ReactElement;
};

const AppHeader = ({ onBack, title, leftContent }: AppHeaderProps) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePressBack = () => {
    return onBack ? onBack() : navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={handlePressBack}>
        <ChevronLeftIcon />
      </TouchableOpacity>
      <Text style={leftContent ? styles.titleWithLeft : styles.title}>{title}</Text>
      {leftContent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
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
    ...font.regular,
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 24,
    color: '#050303',
  },
  titleWithLeft: {
    ...font.regular,
    marginLeft: 80,
    fontSize: 24,
    lineHeight: 24,
    color: '#050303',
  },
});

export default AppHeader;
