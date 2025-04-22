import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const DoneIcon = ({ width = 48, height = 48 }: IconProps) => (
  <Svg viewBox="0 0 48 48" width={width} height={height}>
    <Path
      fill="#4caf50"
      d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
    />
    <Path
      fill="#ccff90"
      d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"
    />
  </Svg>
);
export default DoneIcon;
