import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MaterialCommunityIcon = Icon as unknown as React.ComponentType<{
  name: string;
  size?: number;
  color?: string;
}>;

export default MaterialCommunityIcon;
