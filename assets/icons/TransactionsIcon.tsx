import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
const TransactionIcon = ({ width = 48, height = 48, fill = '#696969' }: IconProps) => (
  <Svg viewBox="0 0 256 256" width={width} height={height}>
    <G
      fill={fill}
      fillRule="nonzero"
      stroke="none"
      strokeWidth={1}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit={10}
      strokeDasharray=""
      strokeDashoffset={0}
      style={{
        mixBlendMode: 'normal',
      }}
    >
      <G transform="scale(2,2)">
        <Path d="M120,72h-19.5c-7.4,0 -13.5,6.1 -13.5,13.5c0,7.4 6.1,13.5 13.5,13.5h6.5v15c0,3.9 -3.1,7 -7,7h-1c-53.8,0 -81.9,-4.9 -86,-7.7v-71.5c4.1,1.5 11.1,3 22.7,4.3c16.9,1.9 39.4,2.9 63.3,2.9h1c3.9,0 7,3.1 7,7v3.9c0,1.5 1,2.8 2.4,3.1c1.9,0.4 3.6,-1.1 3.6,-2.9v-4c0,-6.5 -4.8,-11.9 -11,-12.8v-3.9c0,-9 -7.4,-16.3 -16.4,-16.2h-0.1c-18.7,0.3 -36,1.3 -49.7,2.8c-26.6,2.9 -28.8,6.7 -28.8,10v78c0,3.3 2.2,7.1 28.7,10.1c16.9,1.9 39.4,2.9 63.3,2.9h1c7.2,0 13,-5.8 13,-13v-15h7c1.7,0 3,-1.3 3,-3v-21c0,-1.7 -1.3,-3 -3,-3zM117,93h-16.5c-4.1,0 -7.5,-3.4 -7.5,-7.5c0,-4.1 3.4,-7.5 7.5,-7.5h16.5z" />
      </G>
    </G>
  </Svg>
);
export default TransactionIcon;
