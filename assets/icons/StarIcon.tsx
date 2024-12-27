import React from 'react';
import Svg, { Path } from 'react-native-svg';
const StarIcon = ({ width = 16, height = 15, fill = '#FCC01C' }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Path
      d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
      fill={fill}
    />
  </Svg>
);
export default StarIcon;
