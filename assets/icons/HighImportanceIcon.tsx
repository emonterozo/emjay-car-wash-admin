import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
const HighImportanceIcon = ({ width = 48, height = 48, fill = '#696969' }: IconProps) => (
  <Svg viewBox="0 0 256 256" width={width} height={height} fillRule="nonzero">
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
    >
      <G transform="scale(5.12,5.12)">
        <Path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM25,6c-10.477,0 -19,8.523 -19,19c0,10.477 8.523,19 19,19c10.477,0 19,-8.523 19,-19c0,-10.477 -8.523,-19 -19,-19zM24,13h2c0.552,0 1,0.448 1,1v13c0,0.552 -0.448,1 -1,1h-2c-0.552,0 -1,-0.448 -1,-1v-13c0,-0.552 0.448,-1 1,-1zM24,32h2c0.552,0 1,0.448 1,1v2c0,0.552 -0.448,1 -1,1h-2c-0.552,0 -1,-0.448 -1,-1v-2c0,-0.552 0.448,-1 1,-1z" />
      </G>
    </G>
  </Svg>
);
export default HighImportanceIcon;
