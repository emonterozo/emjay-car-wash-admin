import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from '@d11/react-native-fast-image';

import { color, font } from '@app/styles';
import { ERROR_TYPE, IMAGES } from '@app/constant';
import { Button } from '..';

type ErrorStateProps = {
  type: keyof typeof ERROR_TYPE;
  onRetry: () => void;
};

const ErrorState = ({ type = 'error', onRetry }: ErrorStateProps) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={type === 'error' ? IMAGES.ERROR : IMAGES.NO_CONNECTION}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{ERROR_TYPE[type].title}</Text>
        <Text style={styles.description}>{ERROR_TYPE[type].description}</Text>
      </View>
      <Button
        title="Try Again"
        variant="primary"
        buttonStyle={styles.button}
        textStyle={styles.textStyle}
        onPress={onRetry}
      />
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
    width: 340,
    height: 340,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 16,
    marginBottom: 40,
  },
  title: {
    ...font.regular,
    fontSize: 24,
    lineHeight: 24,
    color: color.black,
  },
  description: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#5C5C5C',
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 23,
    paddingVertical: 18,
    borderRadius: 24,
    width: '90%',
  },
  textStyle: {
    ...font.regular,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default ErrorState;
