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
  CUSTOMER_NOT_EXIST: require('../../../assets/images/customer-not-exist.png'),
  NO_CAMERA: require('../../../assets/images/no-camera.png'),
  PERMISSION_DENIED: require('../../../assets/images/permission-denied.png'),
  CANCEL: require('../../../assets/images/cancel.png'),
  FREE: require('../../../assets/images/gift.png'),
  NOT_FREE: require('../../../assets/images/cart.png'),
  PENDING: require('../../../assets/images/pending.png'),
  ONGOING: require('../../../assets/images/ongoing.png'),
  CANCELLED: require('../../../assets/images/cancelled.png'),
  PAID: require('../../../assets/images/paid.png'),
  NOT_YET_PAID: require('../../../assets/images/not-yet-paid.png'),
  WALLET_CHECKED: require('../../../assets/images/wallet-checked.png'),
  WALLET_ERROR: require('../../../assets/images/wallet-error.png'),
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

export const CONFIRM_TYPE = {
  Add: {
    title: 'Are you sure you want to cancel adding employee?',
    description: 'By doing this, you will cancel adding the employee and lose any unsaved changes.',
  },
  Update: {
    title: 'Are you sure you want to cancel updating employee?',
    description:
      'By doing this, you will cancel updating the employee and lose any unsaved changes.',
  },
  UpdateAvailedService: {
    title: 'Are you sure you want to cancel updating availed service?',
    description:
      'By doing this, you will cancel updating the availed service and lose any unsaved changes.',
  },
  CancelTransaction: {
    title: 'Are you sure you want to Cancel the Transaction?',
    description:
      "Once canceled, the transaction cannot be undone. Please confirm if you'd like to proceed.",
  },
  AddConsumables: {
    title: 'Are you sure you want to cancel adding consumables?',
    description: 'By doing this, you will lose any unsaved changes.',
  },
  DeleteConsumables: {
    title: 'Are you sure you want to delete this consumables?',
    description:
      "By doing this, deleting cannot be undone Please confirm if you'd like to proceed.",
  },
};

export const LIMIT = 50;

type ImageKeys = keyof typeof IMAGES;
export const MESSAGE: Record<
  string,
  { title: string; description: string; button: string; image: ImageKeys }
> = {
  no_camera: {
    title: 'No Camera Detected',
    description: 'Unable to find a camera. Please check your device.',
    button: 'Go Back',
    image: 'NO_CAMERA',
  },
  permission_denied: {
    title: 'Permission Denied',
    description:
      'Camera access is required to proceed. Please grant permission in your device settings.',
    button: 'Open Settings',
    image: 'PERMISSION_DENIED',
  },
  customer_not_exist: {
    title: 'Customer Does Not Exist',
    description: "We couldn't find your account. Please try again later.",
    button: 'Go Back',
    image: 'CUSTOMER_NOT_EXIST',
  },
};

export const VEHICLE_TYPES = ['Car', 'Motorcycle'];
export const CAR_SIZES = ['Small', 'Medium', 'Large', 'Extra Large', 'Extra Extra Large'];
export const MOTORCYCLE_SIZES = ['Small', 'Medium', 'Large'];
export const SIZES = ['sm', 'md', 'lg', 'xl', 'xxl'];
export const SIZE_DESCRIPTION: Record<SizeKey, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  xl: 'Extra Large',
  xxl: 'Extra Extra Large',
};

export const ERR_NETWORK = 'Network Error';

export const NO_DATA = 'No available data';
