import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
const EyeOpenIcon = ({ width = 25, height = 25 }: IconProps) => (
  <Svg viewBox="0,0,256,256" width={width} height={height} fillRule="nonzero">
    <G
      fill="#016fb9"
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
      <G transform="scale(5.12,5.12)">
        <Path d="M18.9375,12.84375c-10.01562,2.70313 -17.32422,11.07813 -17.6875,11.5c-0.32031,0.375 -0.32031,0.9375 0,1.3125c0.43359,0.50391 10.73828,12.34375 23.75,12.34375c13.01172,0 23.31641,-11.83984 23.75,-12.34375c0.32031,-0.375 0.32031,-0.9375 0,-1.3125c-0.36328,-0.42187 -7.67187,-8.79297 -17.6875,-11.5c2.96484,1.96875 4.9375,5.32813 4.9375,9.15625c-0.00391,6.07422 -4.92578,11 -11,11c-6.07422,0 -10.99609,-4.92578 -11,-11c0,-3.82812 1.97266,-7.1875 4.9375,-9.15625zM25,17c-2.76172,0 -5,2.23828 -5,5c0,2.76172 2.23828,5 5,5c2.76172,0 5,-2.23828 5,-5c0,-2.76172 -2.23828,-5 -5,-5z" />
      </G>
    </G>
  </Svg>
);
export default EyeOpenIcon;
