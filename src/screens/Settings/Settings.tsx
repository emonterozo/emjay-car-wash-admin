import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import { color } from '@app/styles';
import { AppHeader, EmptyState } from '@app/components';

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Settings" />
      <View style={styles.content}>
        <EmptyState />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
  },
});

export default Settings;
