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
  ADMIN: require('../../../assets/images/human.png'),
  SUPER_VISOR: require('../../../assets/images/user.png'),
  NO_INTERNET: require('../../../assets/images/no-wifi.png'),
  SERVER_DOWN: require('../../../assets/images/network.png'),
  EMPTY_STATE: require('../../../assets/images/no-data.png'),
  SCAN: require('../../../assets/images/scan.png'),
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
export const SIZE_DESCRIPTION = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  xl: 'Extra Large',
  xxl: 'Extra Extra Large',
};

export const MOCK_SERVICES = [
  {
    id: '1',
    title: 'Complete Wash',
    description: 'A complete wash, tire black, hydro something. Lorem ipsum dolor sit amet.',
    type: 'car',
    price_list: [
      { category: 'sm', price: 250 },
      { category: 'md', price: 350 },
      { category: 'lg', price: 450 },
      { category: 'xl', price: 550 },
      { category: 'xxl', price: 650 },
    ],
  },
  {
    id: '11',
    title: 'Complete Wash',
    description: 'A complete wash, tire black, hydro something. Lorem ipsum dolor sit amet.',
    type: 'motorcycle',
    price_list: [
      { category: 'sm', price: 80 },
      { category: 'md', price: 100 },
      { category: 'lg', price: 120 },
    ],
  },
  {
    id: '2',
    title: 'Seat Cover Removal',
    description: 'Give your car a showroom shine with our waxing and polishing service.',
    type: 'car',
    price_list: [{ category: 'All Size', price: 250 }],
  },
  {
    id: '3',
    title: 'Interior Cleaning',
    description: 'Deep cleaning for the interior. Refresh your car’s interior with our service.',
    type: 'car',
    price_list: [
      { category: 'sm', price: 250 },
      { category: 'md', price: 350 },
      { category: 'lg', price: 450 },
      { category: 'xl', price: 550 },
      { category: 'xxl', price: 650 },
    ],
  },
  {
    id: '4',
    title: 'Wax & Polish',
    description: 'Give your car a showroom shine with our waxing and polishing service.',
    type: 'car',
    price_list: [
      { category: 'sm', price: 250 },
      { category: 'md', price: 350 },
      { category: 'lg', price: 450 },
      { category: 'xl', price: 550 },
      { category: 'xxl', price: 650 },
    ],
  },
  {
    id: '5',
    title: 'Motor Buffing',
    description: 'Give your car a showroom shine with our waxing and polishing service.',
    type: 'motorcycle',
    price_list: [
      { category: 'sm', price: 250 },
      { category: 'md', price: 350 },
      { category: 'lg', price: 450 },
    ],
  },
];

export const MOCK_EMPLOYEES = [
  {
    id: 1,
    full_name: 'John First',
  },
  {
    id: 2,
    full_name: 'Jane First',
  },
  {
    id: 2,
    full_name: 'John Second',
  },
  {
    id: 3,
    full_name: 'Jane Second',
  },
  {
    id: 4,
    full_name: 'John Third',
  },
  {
    id: 5,
    full_name: 'Jane Third',
  },
];

export const ERR_NETWORK = 'ERR_NETWORK';
