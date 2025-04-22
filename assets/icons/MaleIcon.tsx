import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const MaleIcon = ({ width = 48, height = 48, fill = '#696969' }: IconProps) => (
  <Svg viewBox="0 0 48 48" width={width} height={height} fill={fill}>
    <Path d="M 28 4 L 28 8 L 39.1875 8 L 28.09375 19.09375 C 25.566406 17.15625 22.414063 16 19 16 C 10.738281 16 4 22.738281 4 31 C 4 39.261719 10.738281 46 19 46 C 27.261719 46 34 39.261719 34 31 C 34 27.585938 32.84375 24.433594 30.90625 21.90625 L 42 10.8125 L 42 22 L 46 22 L 46 4 Z M 19 20 C 25.097656 20 30 24.902344 30 31 C 30 37.097656 25.097656 42 19 42 C 12.902344 42 8 37.097656 8 31 C 8 24.902344 12.902344 20 19 20 Z" />
  </Svg>
);
export default MaleIcon;
