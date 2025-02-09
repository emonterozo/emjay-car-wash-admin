import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const ConsumablesIcon = ({ width = 40, height = 40 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={width} height={height} fill="url(#pattern0_177_28)" />
    <Defs>
      <Pattern id="pattern0_177_28" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_177_28" transform="scale(0.0208333)" />
      </Pattern>
      <Image
        id="image0_177_28"
        width={48}
        height={48}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACCElEQVR4nO1aS0oDQRDt2uQOiUQ3egk9gp7EYFUifpYu/F1AjyBIdKVCquJnYfAiogiCmI+LuJBIzzTm40ySSWfiRPpBb2bS1e9VVdcUVJSKAwWeB+QzQH4HkhoQF1WunFFTASwvGOKtnvWqCjczKukAknOPMPKFWueswutZILn0n8mpSjoAuarJdnl7nbNGVFUlHYDy5glYvZr7JYDk5W9YIa8A8i0gfwBx5YcsyUNArvsL+aj9Oz42z086zULgfm7os1S+tDwW7oCy101M7jsIhJCXL72vbYMPAOVR34ceAa2+C3nX3vO+saZa4w2VL6WDCIxqHoL26zNINvWZ3jubSADJnWdEkx+WQDT7rdD9KFsmCrc26VM3XkgHE+BnI3AxsvG8LBmCT4Hvc+WMScd6dOZDehhIDgfm8cDF+6Oeby1A7RRTvgg/EpEW8pNHfqeY+jsBMQOcAHIRsAK4FKJ/nkJAXBnDd6Ay3QKw3RxOXEDcACeAXASsAMm6xOHVZjoE9Kk2YXCXGNwltgO47wDF3UpwZXqq0AiVCVwKkWslrAAuhSiOSzx8TwSJrEIReiJwKUSuClkBrFNowHwgVhRuZoyA2sg2vMGeFkCyqSYN4m3rCY2eTxkvNPXIZyJ/F8iVMx55lE8TfbtppZ4U2nWcNs0eW04pOyPhpRM34ifO450TO6h48Q2X3eTT84ljrQAAAABJRU5ErkJggg=="
      />
    </Defs>
  </Svg>
);
export default ConsumablesIcon;
