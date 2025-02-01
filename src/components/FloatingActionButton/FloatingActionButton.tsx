import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, ImageSourcePropType } from 'react-native';
import MaterialCommunityIcon from '../MaterialCommunityIcon/MaterialCommunityIcon';
import { color, font } from '@app/styles';

interface AdditionalButton {
  onPress: () => void;
  icon: ImageSourcePropType;
  label: string;
}

interface Props {
  onPress?: () => void;
  additionalButtons?: AdditionalButton[];
}

const FloatingActionButton = ({ onPress, additionalButtons }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMainButtonPress = () => {
    if (additionalButtons?.length) {
      setIsExpanded(!isExpanded);
    } else {
      onPress?.();
    }
  };

  return (
    <View style={styles.container}>
      {isExpanded &&
        additionalButtons?.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.additionalButton}
            onPress={() => {
              button.onPress();
              setIsExpanded(false);
            }}
            activeOpacity={0.8}
          >
            <View style={styles.additionalButtonContent}>
              <Image source={button.icon} style={styles.image} resizeMode="contain" />
              <Text style={styles.buttonText}>{button.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      <TouchableOpacity onPress={handleMainButtonPress} activeOpacity={0.8}>
        <View style={styles.circle}>
          <MaterialCommunityIcon
            name={isExpanded ? 'close' : 'plus'}
            size={24}
            color={color.secondary}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    right: 30,
    zIndex: 2,
    alignItems: 'flex-end',
  },
  additionalButton: {
    marginBottom: 12,
  },
  image: {
    height: 24,
    width: 24,
  },
  additionalButtonContent: {
    backgroundColor: color.primary,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: color.secondary,
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
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
