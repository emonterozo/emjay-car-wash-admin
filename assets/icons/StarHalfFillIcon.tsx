import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
const StartHalfFillIcon = ({ width = 16, height = 15 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Path
      d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
      fill="url(#paint0_linear_177_60)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_177_60"
        x1={2.5}
        y1={6}
        x2={14.5}
        y2={6}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.44} stopColor="#FCC01C" />
        <Stop offset={0.475} stopColor="#757575" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default StartHalfFillIcon;
