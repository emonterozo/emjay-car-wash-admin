import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const FemaleIcon = ({ width = 48, height = 48, fill = '#696969' }: IconProps) => (
  <Svg viewBox="0 0 48 48" width={width} height={height} fill={fill}>
    <Path d="M 25 1 C 16.738281 1 10 7.738281 10 16 C 10 23.582031 15.675781 29.894531 23 30.875 L 23 36 L 16 36 L 16 40 L 23 40 L 23 47 L 27 47 L 27 40 L 34 40 L 34 36 L 27 36 L 27 30.875 C 34.324219 29.894531 40 23.582031 40 16 C 40 7.738281 33.261719 1 25 1 Z M 25 5 C 31.097656 5 36 9.902344 36 16 C 36 22.097656 31.097656 27 25 27 C 18.902344 27 14 22.097656 14 16 C 14 9.902344 18.902344 5 25 5 Z" />
  </Svg>
);
export default FemaleIcon;
