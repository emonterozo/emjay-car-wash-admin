import React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';

const EyeCloseIcon = ({ width = 25, height = 25 }: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
  >
    <Rect width={25} height={25} fill="url(#pattern0_59_27)" />
    <Defs>
      <Pattern id="pattern0_59_27" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_59_27" transform="scale(0.02)" />
      </Pattern>
      <Image
        id="image0_59_27"
        width={50}
        height={50}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADuklEQVR4nO2Yy4tUVxCHqzBBjeJjE19RY0RjQDRx4cZsE7MyLxTBhSAq2s6t6pkWDIIRFMXkDwgGNZsQNWYhyOTeqttKL6KiYML4wKCGYIijCYyPRMVR1JFzxmja7nMf01emJ7k/6E1zT1V951F16gDkypXr/ytk+QlJTkGhfSwMZCHrSWTtQdafBzZMSV9G0jMWhuQcrAnHw4BVKYdpUpXylWlSFdrHmiwWmc1aZDawtiHL1yZ9I+llZLmDrN1I8qfNhiS7wZO1wPomQA82D0yx/BqSbkPWi4//T/GTTiT5HFpkRj/DSBeSPqgKjuQ6kn4BLB8AB6/CygMvgecPNsDA4UIk2YEsN6vH6AMk+Q5IZ/YjzJNfN5BuAM8fETve80cgyVZkuVcDxPrt812hjZUXgOVTKMqSejDA4fzUNovBHLu9arddN1C43vrMVG3l6Uhy7LGT+w6Yvl1nWnQKsvzmOEcngPxZ2UBQsApJbj3jIFuYVpmLpHcdMN1QDJf3HWDliReRZWdE1rkPRZ2XFQySbI7Jcl/apJFKq9tHI8mhGMPXqg52ozC9Pm/EpOsfzHfJDHr+K0hyNrYGkGyvGfsMDJLuRdKrSPo3ku4HDl6Pco3RO+AfmNPxt3EqT0LWX5IUM+BwQYrU/HQV22Si0z8HHyUspL+aCa9vpPXgBPNB0qpsoJ0BRcLIPvdEhtOS+rd9Eh0cU2MDSY8mNmJAllaGOAOKhvnLPaYyPE0MyHqkFoT1SCqQQmW4MyBP33XDSJdzXEmHNQxinZKcSwzi+VNd8SDrV8CyrD6M7HFPgD81+dbSC1AMxtU31CYTk54TIP3QGdCacDyyXnHAuFMzyccJz8fZ+MzVe+hPJzC2I9JOMRiHpLuA5J2kMEiyPQFIh+laIUVxOhwDch24MgrSKApmXXlkbEEk8VP7NNcBcy2Inh3ZlM5oBAzJxgg/D03zBgv3DYI+i2WFbVXrH7i75sLXMIwn70VcGm8D6WLIROTPQtIfHY4u2k6wMRhXZjqefZNlmhwK19dfHekEr/xWZjAkt4Dkk+wbq3+rRWYgyYE6MPeQZUuiVnddeaSjBehBlu8j72OZi8pvG6f2IFYD3TS3WPCCRfbBwfQQrUeHQqF9MnjB+/bxoTc7ZducNSwO30CWz5DkUuKq/BT6vAVsGhirHrSPbp6sRdZvTOFClj/sA11vRvodSSu2kLIU6x7iQtPAZKBS/tbcpCrlK9OkKv2XVqZQlc06YECrYGE6zNNtf4eSK1cu6D89AuyuO42uYpktAAAAAElFTkSuQmCC"
      />
    </Defs>
  </Svg>
);

export default EyeCloseIcon;
