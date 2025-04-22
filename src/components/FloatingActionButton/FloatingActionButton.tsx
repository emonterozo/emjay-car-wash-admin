import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcon from '../MaterialCommunityIcon/MaterialCommunityIcon';
import { color, font } from '@app/styles';
import { MenuIcon } from '@app/icons';

interface AdditionalButton {
  onPress: () => void;
  icon: string | ReactElement;
  label: string;
}

interface Props {
  onPress?: () => void;
  additionalButtons?: AdditionalButton[];
  fabIcon?: string | ReactElement;
  circleColor?: string;
}

const FloatingActionButton = ({
  onPress,
  additionalButtons,
  fabIcon = 'plus',
  circleColor,
}: Props) => {
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
              {typeof button.icon === 'string' ? (
                <MaterialCommunityIcon name={button.icon} size={25} color="#ffffff" />
              ) : (
                button.icon
              )}
              <Text style={styles.buttonText}>{button.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      <TouchableOpacity onPress={handleMainButtonPress} activeOpacity={0.8}>
        <View style={[styles.circle, circleColor && { backgroundColor: circleColor }]}>
          {additionalButtons ? (
            isExpanded ? (
              <MaterialCommunityIcon name="close" size={25} color="#ffffff" />
            ) : (
              <MenuIcon width={48} height={40} fill="#ffffff" />
            )
          ) : typeof fabIcon === 'string' ? (
            <MaterialCommunityIcon name={fabIcon} size={25} color="#ffffff" />
          ) : (
            fabIcon
          )}
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
