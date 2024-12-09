import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

import { IMAGES } from '@app/constant';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.EMPTY_STATE} style={styles.image} resizeMode="contain" />
      <Text category="h5" status="info" style={styles.title}>
        No Content Available
      </Text>
      <Text category="s1" appearance="hint" style={styles.description}>
        It seems like there's nothing here at the moment. Please check back later.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
  },
  title: {
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: '#6C757D',
    lineHeight: 22,
  },
});

export default EmptyState;
