import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const ChevronLeftIcon = ({ width = 30, height = 30 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={30} height={30} fill="url(#pattern0_227_587)" />
    <Defs>
      <Pattern id="pattern0_227_587" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_227_587" transform="scale(0.015625)" />
      </Pattern>
      <Image
        id="image0_227_587"
        width={64}
        height={64}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyklEQVR4nO3aPQ7CMAyG4S9HQUwsLFyr2ILDVTEX4e8ASI3EFUDNBIgVCcnvM3bzV8dpo0gAAAAAAOBvbMelPPYaYqF0bFwXq614PIrFSWmL92wB2Gfxtc3PlLJ4j4niUzDefKPtnTU/MfBSMAZeY+A5A2/KO/As07e9pGL1nLb4WbG4pg5A2ZdA54dV8bi9bH93WWyUihOCCGFGJ4gQOjpBhNDRCSKEjk4QIXT8O+jLuWG9KB17C+GolIZYyGKX84IEAAAAAAD6pSdTH187i6RcKAAAAABJRU5ErkJggg=="
      />
    </Defs>
  </Svg>
);
export default ChevronLeftIcon;
