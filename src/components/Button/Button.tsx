import React from 'react';
import { Text, StyleSheet, Pressable, DimensionValue } from 'react-native';

import { color, font } from '@app/styles';

type ButtonStyle = {
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderRadius?: number;
  width?: DimensionValue;
};

type TextStyle = {
  fontSize?: number;
  fontWeight?: 'regular' | 'light' | 'bold';
};

type ButtonProps = {
  title: string;
  variant: 'primary' | 'secondary';
  buttonStyle?: ButtonStyle;
  textStyle?: TextStyle;
};

const Button = ({
  title,
  variant,
  buttonStyle = {
    paddingHorizontal: 23,
    paddingVertical: 18,
    borderRadius: 47.8,
    width: '100%',
  },
  textStyle = {
    fontSize: 16,
    fontWeight: 'regular',
  },
}: ButtonProps) => {
  const getButtonStyle = (pressed: boolean) => {
    let style = {
      backgroundColor: color.primary,
      borderColor: color.primary,
    };
    if (variant === 'primary') {
      style = {
        backgroundColor: pressed ? color.primary_pressed_state : color.primary,
        borderColor: pressed ? color.primary_pressed_state : color.primary,
      };
    } else {
      style = {
        backgroundColor: pressed ? color.primary : color.background,
        borderColor: pressed ? color.primary : '#9A9A9A',
      };
    }

    return style;
  };

  const getButtonTextStyle = (pressed: boolean) => {
    let textColor = color.secondary;

    if (variant === 'primary') {
      textColor = color.secondary;
    } else {
      textColor = pressed ? color.secondary : color.primary;
    }

    return {
      color: textColor,
    };
  };

  return (
    <Pressable style={({ pressed }) => [getButtonStyle(pressed), buttonStyle, styles.button]}>
      {({ pressed }) => (
        <Text
          style={[
            {
              ...font[textStyle.fontWeight!],
              fontSize: textStyle.fontSize,
              lineHeight: textStyle.fontSize,
            },
            styles.buttonText,
            getButtonTextStyle(pressed),
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default Button;
