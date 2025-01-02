import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from '@d11/react-native-fast-image';

import { color, font } from '@app/styles';
import { IMAGES } from '@app/constant';

type EmptyStateProps = {
  title?: string;
  description?: string;
};

const EmptyState = ({
  title = 'No data found',
  description = "It looks like there's nothing available right now. Please try again later.",
}: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={IMAGES.EMPTY_STATE}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 293,
  },
  title: {
    ...font.regular,
    fontSize: 24,
    lineHeight: 24,
    color: color.black,
  },
  description: {
    ...font.regular,
    marginTop: 7,
    fontSize: 16,
    lineHeight: 16,
    color: '#333333',
    textAlign: 'center',
  },
});

export default EmptyState;
