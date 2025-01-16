import { font } from '@app/styles';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';

type ToastProps = {
  isVisible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info'; // Toast types
  duration?: number; // Duration in milliseconds
  onClose: () => void;
};

const Toast = ({ isVisible, message, type = 'info', duration = 3000, onClose }: ToastProps) => {
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

  const getStatusColor = () => {
    switch (type) {
      case 'success':
        return '#CCF0C9';
      case 'error':
        return '#FFCCCC';
      case 'info':
      default:
        return '#D4EDFE';
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View style={[styles.toast, { backgroundColor: getStatusColor(), opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 25,
    left: 15,
    right: 15,
    zIndex: 1000,
    elevation: 5,
    borderRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  message: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    textAlign: 'center',
    color: '#050303',
  },
});

export default Toast;
