import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
const CircleArrowRightIcon = ({ width = 16, height = 16, fill = '#016fb9' }: IconProps) => (
  <Svg viewBox="0,0,256,256" width={width} height={height} fillRule="nonzero">
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
      <G transform="scale(8.53333,8.53333)">
        <Path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM20.707,15.707l-4,4c-0.195,0.195 -0.451,0.293 -0.707,0.293c-0.256,0 -0.512,-0.098 -0.707,-0.293c-0.391,-0.391 -0.391,-1.023 0,-1.414l2.293,-2.293h-7.586c-0.552,0 -1,-0.447 -1,-1c0,-0.553 0.448,-1 1,-1h7.586l-2.293,-2.293c-0.391,-0.391 -0.391,-1.023 0,-1.414c0.391,-0.391 1.023,-0.391 1.414,0l4,4c0.391,0.391 0.391,1.023 0,1.414z" />
      </G>
    </G>
  </Svg>
);
export default CircleArrowRightIcon;
