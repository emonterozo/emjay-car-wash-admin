import React, { useMemo, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {
  Attendance,
  Consumables,
  Customers,
  Dashboard,
  Employee,
  EmployeeDetails,
  Expenses,
  Login,
  Ongoing,
  Publish,
  Sales,
  Scan,
  Services,
  Settings,
  Transaction,
  CustomerDetails,
  PreTransaction,
  AddOngoing,
} from '@app/screens';
import GlobalContext from '@app/context';
import { AuthStackParamList } from '../types/navigation/types';
import { TUser } from '../types/context/types';

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
            <AuthStack.Screen name="Dashboard" component={Dashboard} />
            <AuthStack.Screen name="Attendance" component={Attendance} />
            <AuthStack.Screen name="Consumables" component={Consumables} />
            <AuthStack.Screen name="Customers" component={Customers} />
            <AuthStack.Screen name="CustomerDetails" component={CustomerDetails} />
            <AuthStack.Screen name="Employee" component={Employee} />
            <AuthStack.Screen name="EmployeeDetails" component={EmployeeDetails} />
            <AuthStack.Screen name="Expenses" component={Expenses} />
            <AuthStack.Screen name="Ongoing" component={Ongoing} />
            <AuthStack.Screen name="Publish" component={Publish} />
            <AuthStack.Screen name="Sales" component={Sales} />
            <AuthStack.Screen name="Scan" component={Scan} />
            <AuthStack.Screen name="Services" component={Services} />
            <AuthStack.Screen name="Settings" component={Settings} />
            <AuthStack.Screen name="Transaction" component={Transaction} />
            <AuthStack.Screen name="PreTransaction" component={PreTransaction} />
            <AuthStack.Screen name="AddOngoing" component={AddOngoing} />
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
