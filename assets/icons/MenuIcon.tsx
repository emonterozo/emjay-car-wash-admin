import * as React from 'react';
import Svg, { Rect } from 'react-native-svg';
const MenuIcon = ({ width = 20, height = 18 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect x={1} width={8} height={8} rx={3} fill="#016FB9" />
    <Rect x={11} width={8} height={8} rx={3} fill="#016FB9" />
    <Rect x={1} y={10} width={8} height={8} rx={3} fill="#016FB9" />
    <Rect x={11} y={10} width={8} height={8} rx={3} fill="#016FB9" />
  </Svg>
);
export default MenuIcon;
