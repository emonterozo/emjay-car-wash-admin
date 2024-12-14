import type { StackScreenProps } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

export type AuthStackParamList = {
  Attendance: undefined;
  Consumables: undefined;
  Customers: undefined;
  CustomerDetails: { id: string };
  Dashboard: undefined;
  Employee: undefined;
  EmployeeDetails: {
    id: string;
    fullName: string;
    title: string;
    status: string;
    dateStarted: string;
    contact: string;
  };
  Expenses: undefined;
  Ongoing: undefined;
  Publish: undefined;
  Sales: undefined;
  Scan: undefined;
  Services: undefined;
  Settings: undefined;
  Transaction: undefined;
};

export type NavigationProp = StackScreenProps<AuthStackParamList>['navigation'];

export type CustomerDetailsRouteProp = RouteProp<AuthStackParamList, 'CustomerDetails'>;
export type EmployeeDetailsRouteProp = RouteProp<AuthStackParamList, 'EmployeeDetails'>;
