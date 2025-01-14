import {
  ConsumablesIcon,
  CustomersIcon,
  EmployeesIcon,
  ExpensesIcon,
  OngoingServicesIcon,
  PublishIcon,
  SalesIcon,
  ServicesIcon,
} from '@app/icons';
import { SizeKey } from '../../types/constant/types';

export const DASHBOARD_ITEMS = [
  {
    id: 1,
    title: 'Services',
    icon: ServicesIcon,
    screen: 'Services',
  },
  {
    id: 2,
    title: 'Customers',
    icon: CustomersIcon,
    screen: 'Customers',
  },
  {
    id: 3,
    title: 'Expenses',
    icon: ExpensesIcon,
    screen: 'Expenses',
  },
  {
    id: 4,
    title: 'Employee',
    icon: EmployeesIcon,
    screen: 'Employee',
  },
  {
    id: 5,
    title: 'Publish',
    icon: PublishIcon,
    screen: 'Publish',
  },
  {
    id: 6,
    title: 'Sales',
    icon: SalesIcon,
    screen: 'Sales',
  },
  {
    id: 7,
    title: 'Ongoing Services',
    icon: OngoingServicesIcon,
    screen: 'Ongoing',
  },
  {
    id: 8,
    title: 'Consumables',
    icon: ConsumablesIcon,
    screen: 'Consumables',
  },
];

export const IMAGES = {
  EM_JAY: require('../../../assets/images/emjay.png'),
  AVATAR: require('../../../assets/images/avatar.png'),
  EMPTY_STATE: require('../../../assets/images/no-data.png'),
  SCAN: require('../../../assets/images/scan.png'),
  HOME_ACTIVE: require('../../../assets/images/home-active.png'),
  HOME_INACTIVE: require('../../../assets/images/home-inactive.png'),
  MESSAGES_ACTIVE: require('../../../assets/images/messages-active.png'),
  MESSAGES_INACTIVE: require('../../../assets/images/messages-inactive.png'),
  TRANSACTIONS_ACTIVE: require('../../../assets/images/transactions-active.png'),
  TRANSACTIONS_INACTIVE: require('../../../assets/images/transactions-inactive.png'),
  SETTINGS_ACTIVE: require('../../../assets/images/settings-active.png'),
  SETTINGS_INACTIVE: require('../../../assets/images/settings-inactive.png'),
  CALENDAR_ACTIVE: require('../../../assets/images/calendar-active.png'),
  CALENDAR_INACTIVE: require('../../../assets/images/calendar-inactive.png'),
  ACTIVE_STATUS: require('../../../assets/images/active-status.png'),
  TERMINATED_STATUS: require('../../../assets/images/terminated-status.png'),
  AVATAR_BOY: require('../../../assets/images/avatar-boy.png'),
  AVATAR_GIRL: require('../../../assets/images/avatar-girl.png'),
  ERROR: require('../../../assets/images/error.png'),
  NO_CONNECTION: require('../../../assets/images/no-connection.png'),
  MALE: require('../../../assets/images/male.png'),
  FEMALE: require('../../../assets/images/female.png'),
};

export const ERROR_TYPE = {
  error: {
    title: 'Something went wrong',
    description: "We're actively resolving the issue. Please refresh the page and try again.",
  },
  connection: {
    title: 'No Internet Connection',
    description: 'No internet connections found. Check your connections and try again.',
  },
};

export const MESSAGE = {
  no_camera: {
    title: 'No Camera Detected',
    description: 'Unable to find a camera. Please check your device.',
    button: 'Go Back',
  },
  no_permission: {
    title: 'Permission Denied',
    description:
      'Camera access is required to proceed. Please grant permission in your device settings.',
    button: 'Open Settings',
  },
};

export const VEHICLE_TYPES = ['Car', 'Motorcycle'];
export const CAR_SIZES = ['Small', 'Medium', 'Large', 'Extra Large', 'Extra Extra Large'];
export const MOTORCYCLE_SIZES = ['Small', 'Medium', 'Large'];
export const SIZE_ORDER = ['sm', 'md', 'lg', 'xl', 'xxl'];
export const SIZE_DESCRIPTION: Record<SizeKey, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  xl: 'Extra Large',
  xxl: 'Extra Extra Large',
};

export const ERR_NETWORK = 'Network Error';
