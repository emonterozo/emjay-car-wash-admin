export const DASHBOARD_ITEMS = [
  {
    id: 1,
    title: 'Services',
    icon: 'car-wash',
    screen: 'Services',
  },
  {
    id: 2,
    title: 'Customers',
    icon: 'account-group',
    screen: 'Customers',
  },
  {
    id: 3,
    title: 'QR Scan',
    icon: 'qrcode-scan',
    screen: 'Scan',
  },
  {
    id: 4,
    title: 'Messages',
    icon: 'message-text',
    screen: 'AddOngoing',
  },
  {
    id: 5,
    title: 'Ongoing Services',
    icon: 'progress-clock',
    screen: 'Ongoing',
  },
  {
    id: 6,
    title: 'Transactions',
    icon: 'currency-usd',
    screen: 'Transaction',
  },
  // {
  //   id: 7,
  //   title: 'Attendance',
  //   icon: 'account-clock',
  //   screen: 'Customers',
  // },
  {
    id: 8,
    title: 'Employee',
    icon: 'account-multiple',
    screen: 'Employee',
  },
  {
    id: 9,
    title: 'Sales',
    icon: 'cash-multiple',
    screen: 'Customers',
  },
  {
    id: 10,
    title: 'Consumables',
    icon: 'cogs',
    screen: 'Customers',
  },
  {
    id: 11,
    title: 'Expenses',
    icon: 'credit-card-search-outline',
    screen: 'Customers',
  },
  {
    id: 12,
    title: 'Publish',
    icon: 'bullhorn',
    screen: 'Customers',
  },
  {
    id: 13,
    title: 'Settings',
    icon: 'cog',
    screen: 'Customers',
  },
];

export const IMAGES = {
  EM_JAY: require('../../../assets/images/emjay.png'),
  ADMIN: require('../../../assets/images/human.png'),
  SUPER_VISOR: require('../../../assets/images/user.png'),
  NO_INTERNET: require('../../../assets/images/no-wifi.png'),
  SERVER_DOWN: require('../../../assets/images/network.png'),
  EMPTY_STATE: require('../../../assets/images/no-data.png'),
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
