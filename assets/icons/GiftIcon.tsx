import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const GiftIcon = ({ width = 48, height = 48 }: IconProps) => (
  <Svg viewBox="0 0 48 48" width={width} height={height}>
    <Path fill="#D32F2F" d="M38,42H10c-1.1,0-2-0.9-2-2V20h32v20C40,41.1,39.1,42,38,42z" />
    <Path fill="#F44336" d="M42,20H6v-6c0-1.1,0.9-2,2-2h32c1.1,0,2,0.9,2,2V20z" />
    <Path fill="#FF8F00" d="M22 20H26V42H22zM32 6L28 6 22 12 26 12z" />
    <Path fill="#FFC107" d="M20 6L16 6 22 12 22 20 26 20 26 12z" />
  </Svg>
);
export default GiftIcon;
