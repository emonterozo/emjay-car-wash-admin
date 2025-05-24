import * as React from 'react';
import Svg, { Rect, Circle } from 'react-native-svg';

type EllipseIconProps = {
  width?: number;
  height?: number;
  innerFill?: string;
  outerFill?: string;
};

const EllipseIcon = ({
  width = 20,
  height = 20,
  innerFill = '#016FB9',
  outerFill = '#016FB9',
}: EllipseIconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect x={0.5} y={0.5} width={19} height={19} rx={9.5} stroke={outerFill} />
    <Circle cx={10} cy={10} r={6} fill={innerFill} />
  </Svg>
);
export default EllipseIcon;
