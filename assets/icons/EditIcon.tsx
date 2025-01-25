import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const EditIcon = ({ width = 30, height = 30 }: IconProps) => (
    <Svg width={30} height={30} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={30} height={30} fill="url(#pattern0_728_229)" />
    <Defs>
      <Pattern
        id="pattern0_728_229"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_728_229" transform="scale(0.01)" />
      </Pattern>
      <Image
        id="image0_728_229"
        width={100}
        height={100}
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default EditIcon;
