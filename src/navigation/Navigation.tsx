import React, { useMemo, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

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
} from '@app/screens';
import GlobalContext from '@app/context';
import { AuthStackParamList } from '../types/navigation/types';
import { TUser } from '../types/context/types';
import BottomTab from './BottomTab';

const UnAuthStack = createStackNavigator();
const AuthStack = createStackNavigator<AuthStackParamList>();

const Navigation = () => {
  const [user, setUser] = useState<TUser>({ id: '', type: '', username: '', token: '' });

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
          <AuthStack.Navigator initialRouteName="BottomTab" screenOptions={{ headerShown: false }}>
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
            <AuthStack.Screen
              name="EmployeeForm"
              component={EmployeeForm}
              options={{ gestureEnabled: false }}
            />
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
