import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const EmployeesIcon = ({ width = 46, height = 40 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={46} height={40} fill="url(#pattern0_177_15)" />
    <Defs>
      <Pattern id="pattern0_177_15" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_177_15" transform="matrix(0.0125 0 0 0.014375 0 -0.075)" />
      </Pattern>
      <Image
        id="image0_177_15"
        width={80}
        height={80}
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default EmployeesIcon;
