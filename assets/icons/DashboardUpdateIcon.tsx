import * as React from 'react';
import Svg, { Rect, Circle } from 'react-native-svg';
const DashboardUpdateIcon = ({width = 24, height = 24}: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"

  >
    <Rect x={0.5} y={0.5} width={23} height={23} rx={11.5} stroke="#6FFF00" />
    <Circle cx={12} cy={12} r={6} fill="#6FFF00" />
  </Svg>
);
export default DashboardUpdateIcon;
