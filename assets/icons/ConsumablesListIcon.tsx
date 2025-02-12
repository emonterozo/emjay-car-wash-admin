import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const ConsumablesListIcon = ({ width = 40, height = 41 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect y={0.5} width={40} height={40} fill="url(#pattern0_1334_13648)" />
    <Defs>
      <Pattern
        id="pattern0_1334_13648"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_1334_13648" transform="scale(0.01)" />
      </Pattern>
      <Image
        id="image0_1334_13648"
        width={100}
        height={100}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADZUlEQVR4nO2dv2sUQRTHR0UQFK1E/HHzLsFeQVC0slTUBAR/NDb5Jyy1EAkI4s5sk8pCbCSFhWAVYyuKKHZCsvMuEhOw0ihamJVNFJK7ibnbvZ192ft+4JVv5837MDs7x7GrFAAAAAAAAGArcGLizU51K91edR0iIdu6TpbnyXJa6zDuUzZXJZY03UaWb5Nxy5U3ywaNSNzqpIfJLm34sYDmpBXFs6PRx71KAg3Lh8i41wKaklYZ2rj3zXiWKpVBcXJcG9fqKNC4L2STs0FqsOvHDjNmclpbXvCImW/Gc6dUFWjLV8i4751FuQ/auKFQdVAFQjIOR3NHtOW3HSvF8k8duxtBN29t+SZZ99uzbJ8PT8zsC1eMqkxIxv54cY827qnnDrFMhsdL3+yzzZssP9rgPhqpJ+mOUgsQJmTd06WvJ4YnD9z7vLuUcfV9d1Bb98qzRH9RlIypiqCqhfyrI0rGVnrR2Z93ww9mdF8Ha5rZY9oyV7l5SxeSoSN3Rhte9G32Q6Z1si+DkEku+zdvBPXUA/ejEfGl4tb9xhE2x1nF8kLxFYLmp/3sAYTYmgspfMEBgyBEFhAiDAgRBoQIA0KEASHCgBBh1E5IM+ZRbd1Lsm4p/4HMLWnD0w3LI6Hrr5UQMjze75OyNu5u0DnURUgz5tGyfr7Q1l0MNY/aCNErt6myhPCLUPOojRAy7tvacRsxX817rSy3TchXFQgI8dA0fA1CCqINT5d1yyLLUyoQtVkhDcsjpe0hxl0INY/aCMnIHlFLkHFHBaRWQjKyR9Tsqah9k+8pVnOnQq6M2grZ6kCIMCBEGBAiDAgRBoQIA0KEASHCgBBhQIgwIEQYECIMCBEGhAgDQoQBIcKAEGFAiDAgRBgQIgwIEQaECANCumD1ZZ08HiIPQjZh3butemhugTz8L2sjvC8a66K5efP+5kKIjw3f+rZJc/PmrcmHkJ6a+p/m5s1ruwaE9NxUT3Pz5rUDIZuQt0Gh88JdsGIIQmRBECILghBZEITIgiBEFgQhsiAIGWwI5xBZQEgbXf/8UTC6HV8N+kmdIEQWBCGyIAgBa8EeIgwIEQaECANChAEhgyYEwaWc6CHEblkhbg6rgvsiI/uydnEhJjnv/UQ3Iu1VBsWtc4WFAAAAAAAAAIDqL38AveszZLNcS7kAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);
export default ConsumablesListIcon;
