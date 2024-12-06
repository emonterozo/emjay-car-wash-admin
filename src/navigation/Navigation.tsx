import React, { useMemo, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {
  Attendance,
  Consumables,
  Customers,
  Dashboard,
  Employee,
  Expenses,
  Login,
  Ongoing,
  Publish,
  Sales,
  Scan,
  Services,
  Settings,
  Transaction,
} from '@app/screens';
import { AuthStackParamList } from 'src/types/navigation/types';
import GlobalContext from 'src/context/GlobalContext';
import { TUser } from 'src/types/context/types';

const UnAuthStack = createStackNavigator();
const AuthStack = createStackNavigator<AuthStackParamList>();

const Navigation = () => {
  const [user, setUser] = useState<TUser>({ id: '', type: '', username: '' });

  const initialContext = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser],
  );

  return (
    <NavigationContainer>
      <GlobalContext.Provider value={initialContext}>
        {user.id.length > 0 ? (
          <AuthStack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Attendance" component={Attendance} />
            <AuthStack.Screen name="Consumables" component={Consumables} />
            <AuthStack.Screen name="Customers" component={Customers} />
            <AuthStack.Screen name="Dashboard" component={Dashboard} />
            <AuthStack.Screen name="Employee" component={Employee} />
            <AuthStack.Screen name="Expenses" component={Expenses} />
            <AuthStack.Screen name="Ongoing" component={Ongoing} />
            <AuthStack.Screen name="Publish" component={Publish} />
            <AuthStack.Screen name="Sales" component={Sales} />
            <AuthStack.Screen name="Scan" component={Scan} />
            <AuthStack.Screen name="Services" component={Services} />
            <AuthStack.Screen name="Settings" component={Settings} />
            <AuthStack.Screen name="Transaction" component={Transaction} />
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
