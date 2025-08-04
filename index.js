/**
 * @format
 */

import { AppRegistry } from 'react-native';
import {
  getMessaging,
  setBackgroundMessageHandler,
  onMessage,
} from '@react-native-firebase/messaging';

import App from './App';
import { name as appName } from './app.json';
import { showLocalNotification } from './src/utils/helpers';

const messaging = getMessaging();

// Function to check and show the local notification only if it's not a duplicate
async function onMessageReceived(message) {
  await showLocalNotification(message);
}

// Set up message listener for foreground
onMessage(messaging, onMessageReceived);

setBackgroundMessageHandler(messaging, async (remoteMessage) => {});

AppRegistry.registerComponent(appName, () => App);
