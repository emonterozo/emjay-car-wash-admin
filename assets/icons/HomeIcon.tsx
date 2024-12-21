import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const HomeIcon = ({ width = 30, height = 30 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={30} height={30} fill="url(#pattern0_178_943)" />
    <Defs>
      <Pattern id="pattern0_178_943" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_178_943" transform="scale(0.0208333)" />
      </Pattern>
      <Image
        id="image0_178_943"
        width={48}
        height={48}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO1YPWgUQRR+LxoRREFFQVARFBEU0cbSLoIBC0HBQkgKORDd9+4Sg3ZraWtpZSkEFAu9e+9OuMJCDGmigohoIbHzH8X4E09mo2Z2747s3t3ubXA+GDj2Zr73vb+ZnQVwcHBIB6yHkfQJkrwwv2FZgbSALN+RtREMkh/AchFyj5H6aiS5/k9405AbMK5rIJcoyS5knYkIfrAwQo7MgFfeCbkCVYeR9V1E6DXwJ1eBX1+JpFci/30E0uP9lg0ADTS1jaTzlrg5KFbPNE0lPY2sX6zs/DKOge8P9EU6eOV1yHIrFFnSV1CSQ23XsB5AlpeRMrsLZ++sz1Q7nJc9yPo0Ir4O47p5ybXnahuRRSNrnwOV92eiHUhPIcnncCnIVVPrsTlOTq4A1svh0pOvwDqanvBWzUj6CYp6omPOoh5DkvdNzV+YHuypdvDKm5DlXli8PINiZW/X3GO13cGJHe6L+1CsbOmJdvBqB5FkNhL5mzBxe21vDAAYLsMZCdCssd0dcbBrhPb3n0ByKdg+e44GGm5jwwrU286buzA9iCyPrbS+AZIhSBskQ8aWlYlHnfUE66hF8qEn9R4XpPvMaf3XPpCOJOaw92rw5AJkDdYJq3Qridcjy+vFCNS2Q9bgyo5QQyeFfcj05X3F9wesZp5PvN7e0lIRmLYGdA50D3QZ4P+tByi4Wk4h6bemC/3CsylgPZpPBzw9EtwN2n6RsPioOpw7B9BEPob4P9l4mD8HaLFsWt5xS7IhdPHPnQO89Pw0ONvCOdACLgNJ4EqoBVwJJYErob6XELV4IYs35rLkbAtkrXZkjESy5GyPMdkWfFqJGzUzzxjyylsz5XRwcIBljd/U4ejks5HjNgAAAABJRU5ErkJggg=="
      />
    </Defs>
  </Svg>
);
export default HomeIcon;
