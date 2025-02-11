import type { StackScreenProps } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import { TransactionServicesResponse, TransactionStatusType } from '../services/types';

export type CarwashList = {
  icon: string;
  size: string;
  description: string;
};

export type AuthStackParamList = {
  Attendance: undefined;
  Consumables: undefined;
  Customers: undefined;
  CustomerDetails: { id: string };
  BottomTab: undefined;
  Employee: undefined;
  EmployeeDetails: { id: string };
  Expenses: undefined;
  Ongoing: undefined;
  Publish: undefined;
  Sales: undefined;
  Scan: undefined;
  Services: undefined;
  Settings: undefined;
  Transaction: undefined;
  AddOngoing: {
    customerId: string | null;
    contactNumber: string | null;
    freeWash: { type: string; size: string }[];
    transaction:
      | (Omit<TransactionServicesResponse['transaction'], 'availed_services' | 'contact_number'> & {
          availedServices: string[];
        })
      | undefined;
  };
  PreTransaction: { id: string };
  EmployeeForm:
    | { type: 'Add'; employee?: never }
    | {
        type: 'Update';
        employee: {
          id: string;
          firstName: string;
          lastName: string;
          birthDate: string;
          gender: string;
          contactNumber: string;
          employeeTitle: string;
          employeeStatus: string;
          dateStarted: string;
        };
      };
  AvailedServices: {
    customerId: string | null;
    transactionId: string;
    transactionStatus: TransactionStatusType;
    model: string;
    plateNumber: string;
  };
  AvailedServiceDetails: {
    transactionId: string;
    transactionStatus: TransactionStatusType;
    transactionServiceId: string;
  };
  AvailedServiceForm: {
    service: {
      transactionId: string;
      transactionServiceId: string;
      title: string;
      price: number;
      discount: number;
      deduction: number;
      companyEarnings: number;
      employeeShare: number;
      serviceCharge: boolean;
      status: string;
      paymentStatus: boolean;
      startDateTime: string | '';
      endDateTime: string | '';
      assignedEmployees: string[];
    };
  };
  TransactionDetails: { transactionId: string; transactionServiceId: string };
  TransactionComputation: { startDate: string; endDate: string };
  ConsumablesForm: undefined;
  Statistics: undefined;
};

export type NavigationProp = StackScreenProps<AuthStackParamList>['navigation'];

export type CustomerDetailsRouteProp = RouteProp<AuthStackParamList, 'CustomerDetails'>;

export type PreTransactionsRouteProp = RouteProp<AuthStackParamList, 'PreTransaction'>;

export type AddOngoingRouteProp = RouteProp<AuthStackParamList, 'AddOngoing'>;

export type EmployeeDetailsRouteProp = RouteProp<AuthStackParamList, 'EmployeeDetails'>;

export type EmployeeFormRouteProp = RouteProp<AuthStackParamList, 'EmployeeForm'>;

export type AvailedServicesRouteProp = RouteProp<AuthStackParamList, 'AvailedServices'>;

export type AvailedServiceDetailRouteProp = RouteProp<AuthStackParamList, 'AvailedServiceDetails'>;

export type AvailedServiceFormRouteProp = RouteProp<AuthStackParamList, 'AvailedServiceForm'>;

export type TransactionDetailsRouteProp = RouteProp<AuthStackParamList, 'TransactionDetails'>;

export type TransactionComputationRouteProp = RouteProp<
  AuthStackParamList,
  'TransactionComputation'
>;
