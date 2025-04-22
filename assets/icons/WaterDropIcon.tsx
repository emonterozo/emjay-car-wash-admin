import * as React from 'react';
import Svg, { RadialGradient, Stop, Path } from 'react-native-svg';
const WaterDropIcon = ({ width = 31, height = 31 }: IconProps) => (
  <Svg viewBox="0 0 48 48" width={width} height={height}>
    <RadialGradient
      id="Zv53WmLPBAWAZQg_vnriYa"
      cx={24.241}
      cy={27.381}
      r={17.178}
      fx={16.351}
      fy={27.405}
      gradientTransform="matrix(0 -1 .8265 0 1.61 51.622)"
      gradientUnits="userSpaceOnUse"
    >
      <Stop offset={0} stopColor="#b3f1ff" />
      <Stop offset={0.166} stopColor="#9ee4fc" />
      <Stop offset={0.509} stopColor="#68c2f3" />
      <Stop offset={0.996} stopColor="#118ce6" />
      <Stop offset={1} stopColor="#108ce6" />
    </RadialGradient>
    <Path
      fill="url(#Zv53WmLPBAWAZQg_vnriYa)"
      d="M37,30c0,7.18-5.82,13-13,13s-13-5.82-13-13C11,19.6,21.4,5,24,5S37,19.6,37,30z"
    />
  </Svg>
);
export default WaterDropIcon;
