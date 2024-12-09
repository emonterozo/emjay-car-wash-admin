import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { Text, Icon, useTheme } from '@ui-kitten/components';

type ToastProps = {
  isVisible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info'; // Toast types
  duration?: number; // Duration in milliseconds
  onClose?: () => void;
};

const Toast = ({ isVisible, message, type = 'info', duration = 3000, onClose }: ToastProps) => {
  const theme = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto dismiss after duration
      const timer = setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, duration);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const getIconName = () => {
    switch (type) {
      case 'success':
        return 'checkmark-circle-2';
      case 'error':
        return 'alert-triangle';
      case 'info':
      default:
        return 'info';
    }
  };

  const getStatusColor = () => {
    switch (type) {
      case 'success':
        return theme['color-success-500'];
      case 'error':
        return theme['color-danger-500'];
      case 'info':
      default:
        return theme['color-info-500'];
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View style={[styles.toast, { backgroundColor: getStatusColor(), opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Icon name={getIconName()} fill="#FFFFFF" style={styles.icon} />
        <Text category="s1" style={styles.message}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    borderRadius: 8,
    padding: 16,
    zIndex: 1000,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  message: {
    color: '#FFFFFF',
    flex: 1,
  },
});

export default Toast;
