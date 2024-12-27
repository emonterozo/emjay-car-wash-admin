import React from 'react';
import Svg, { Rect } from 'react-native-svg';
const HorizontalKebabIcon = ({width = 16, height = 4}: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
  >
    <Rect width={4} height={4} rx={2} fill="#333333" />
    <Rect x={6} width={4} height={4} rx={2} fill="#333333" />
    <Rect x={12} width={4} height={4} rx={2} fill="#333333" />
  </Svg>
);
export default HorizontalKebabIcon;
