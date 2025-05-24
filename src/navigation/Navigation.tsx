import React, { useEffect, useMemo, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Consumables,
  Customers,
  Employee,
  EmployeeDetails,
  Expenses,
  Login,
  Ongoing,
  Publish,
  Sales,
  Services,
  CustomerDetails,
  PreTransaction,
  AddOngoing,
  EmployeeForm,
  AvailedServices,
  AvailedServiceDetails,
  AvailedServiceForm,
  TransactionDetails,
  TransactionComputation,
  ConsumablesForm,
  ExpensesForm,
  Statistics,
  PublishForm,
  Chat,
} from '@app/screens';
import GlobalContext from '@app/context';
import { AuthStackParamList } from '../types/navigation/types';
import { TNotification, TUser } from '../types/context/types';
import BottomTab from './BottomTab';

const UnAuthStack = createStackNavigator();
const AuthStack = createStackNavigator<AuthStackParamList>();

const Navigation = () => {
  const [user, setUser] = useState<TUser>({
    id: '',
    type: '',
    username: '',
    accessToken: '',
    refreshToken: '',
    fcmToken: '',
  });
  const [selectedNotification, setSelectedNotification] = useState<TNotification | undefined>(
    undefined,
  );

  const initialContext = useMemo(
    () => ({
      user,
      setUser,
      selectedNotification,
      setSelectedNotification,
    }),
    [user, setUser, selectedNotification, setSelectedNotification],
  );

  const requestUserPermission = async () => {
    // Request permissions (required for iOS)
    //await notifee.requestPermission();

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }

    const token = await messaging().getToken();

    setUser({
      ...user,
      fcmToken: token,
    });
  };

  const checkNotification = async () => {
    const value = await AsyncStorage.getItem('lastNotification');
    if (value) {
      const data = JSON.parse(value);
      setSelectedNotification({ type: data.type, id: data.id });

      await AsyncStorage.removeItem('lastNotification');
    }
  };

  useEffect(() => {
    requestUserPermission();
    checkNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribeForeground = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        const { notification } = detail;
        if (notification?.data) {
          const data = notification.data as TNotification;
          setSelectedNotification({ type: data.type, id: data.id });
        }
      }
    });

    return () => {
      unsubscribeForeground();
    };
  }, []);

  useEffect(() => {
    //Killed state: Notification tapped
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (!remoteMessage) {
          return;
        }

        const data = remoteMessage.data as TNotification;
        setSelectedNotification({ type: data.type, id: data.id });
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (!remoteMessage) {
        return;
      }

      const data = remoteMessage.data as TNotification;
      setSelectedNotification({ type: data.type, id: data.id });
    });
  }, []);

  return (
    <NavigationContainer>
      <GlobalContext.Provider value={initialContext}>
        {user.id.length > 0 ? (
          <AuthStack.Navigator
            initialRouteName="BottomTab"
            screenOptions={{ headerShown: false, gestureEnabled: false }}
          >
            <AuthStack.Screen name="BottomTab" component={BottomTab} />
            <AuthStack.Screen name="Consumables" component={Consumables} />
            <AuthStack.Screen name="Customers" component={Customers} />
            <AuthStack.Screen name="CustomerDetails" component={CustomerDetails} />
            <AuthStack.Screen name="Employee" component={Employee} />
            <AuthStack.Screen name="EmployeeDetails" component={EmployeeDetails} />
            <AuthStack.Screen name="Expenses" component={Expenses} />
            <AuthStack.Screen name="Ongoing" component={Ongoing} />
            <AuthStack.Screen name="Publish" component={Publish} />
            <AuthStack.Screen name="Sales" component={Sales} />
            <AuthStack.Screen name="Services" component={Services} />
            <AuthStack.Screen name="PreTransaction" component={PreTransaction} />
            <AuthStack.Screen name="AddOngoing" component={AddOngoing} />
            <AuthStack.Screen name="EmployeeForm" component={EmployeeForm} />
            <AuthStack.Screen name="AvailedServices" component={AvailedServices} />
            <AuthStack.Screen name="AvailedServiceDetails" component={AvailedServiceDetails} />
            <AuthStack.Screen name="AvailedServiceForm" component={AvailedServiceForm} />
            <AuthStack.Screen name="TransactionDetails" component={TransactionDetails} />
            <AuthStack.Screen name="TransactionComputation" component={TransactionComputation} />
            <AuthStack.Screen name="ConsumablesForm" component={ConsumablesForm} />
            <AuthStack.Screen name="ExpensesForm" component={ExpensesForm} />
            <AuthStack.Screen name="Statistics" component={Statistics} />
            <AuthStack.Screen name="PublishForm" component={PublishForm} />
            <AuthStack.Screen name="Chat" component={Chat} />
          </AuthStack.Navigator>
        ) : (
          <UnAuthStack.Navigator screenOptions={{ headerShown: false }}>
            <UnAuthStack.Screen name="Login" component={Login} />
          </UnAuthStack.Navigator>
        )}
      </GlobalContext.Provider>
    </NavigationContainer>
  );
};

export default Navigation;
