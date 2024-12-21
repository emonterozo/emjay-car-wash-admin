import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const ChevronRightIcon = ({ width = 7, height = 7 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Path
      d="M0.6 5.672L5.124 3.788L0.6 1.64V0.704L6.252 3.524V4.124L0.6 6.608V5.672Z"
      fill="#DBDADA"
    />
  </Svg>
);
export default ChevronRightIcon;
