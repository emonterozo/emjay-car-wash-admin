import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const CancelIcon = ({ width = 48, height = 48 }: IconProps) => (
  <Svg viewBox="0 0 48 48" width={width} height={height}>
    <Path
      fill="#f44336"
      d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
    />
    <Path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z" />
    <Path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z" />
  </Svg>
);
export default CancelIcon;
