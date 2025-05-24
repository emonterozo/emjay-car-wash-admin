/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import App from './App';
import { name as appName } from './app.json';
import { showLocalNotification } from './src/utils/helpers';

// Function to check and show the local notification only if it's not a duplicate
async function onMessageReceived(message) {
  await showLocalNotification(message);
}

// Set up message listener for foreground
messaging().onMessage(onMessageReceived);

messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

AppRegistry.registerComponent(appName, () => App);
