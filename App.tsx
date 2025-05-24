import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import notifee, { AndroidImportance } from '@notifee/react-native';

import Navigation from './src/navigation/Navigation';

const App = () => {
  useEffect(() => {
    const createChannel = async () => {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    };

    createChannel();
  }, []);

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
