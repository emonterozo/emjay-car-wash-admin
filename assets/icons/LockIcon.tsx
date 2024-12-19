import React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';

const LockIcon = ({ width = 30, height = 30 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={30} height={30} fill="url(#pattern0_59_24)" />
    <Defs>
      <Pattern id="pattern0_59_24" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_59_24" transform="scale(0.02)" />
      </Pattern>
      <Image
        id="image0_59_24"
        width={50}
        height={50}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACM0lEQVR4nO2YyUokQRCGIxBEGJ9AxuUw+BCjDzCeBoRRb3NvrYi2fQBBmcWD41kEby70ebAirEO/huBtXM8qKKijZFaVh3Zpy66layY/SCiKyqz8M/6MXAAcjpJAwQB44iGJIOkeklyExT4LkMxATfqhY/F23iPrKrLeIOvdi4X0FlnqwP4QdBTsj9tRtx2VS2TdAM+fgFowDHP6zhbzzDKJJJvIehV9ew6e/xk6AtJZZPkbjfaGtVYrKr8HkWUrjg7QLkPxkdBbJLmGqk4nrh/OpWsrprDI1KQ/ttObRMSwUhSZM5je7YO8Qdb1Bzu12xbpdihG1iBXKBgIs5NcvmpOtIL9oSgB3JjsB7lhvJ1SNGLiyQ/t2DT5T9W3PzUpNi1IpyJ77UBeIOm+FTIrH1JrtBYMR5N+D/LCLGRWSKXRm1qjlUbvwyKZF/FWoyztPosT0gJ0EfkvrDVf70aWJSQ9bnm+yLzIEbL+MH1KPjqkP4sXoE0HMvmeXEg4CnfgyUcomqqOxJHp/AySVX/QCckGdBFhN0cyAZ21uE1rfW30IOkKsp6EuwP5Zd6VLiIYimhemZfLJ4T15Ik902kZhRw8joj+KaG1ZPGJiCyUL2t9qXc1CzHvSpl+sVlICm1BbhX/USEHaUz04ld21jEjwIrw5FM7TaHborDb/WYCOmuxs1YmoLMWRxd0VR2BoqFgNDrPHCaua+5aC78i5Ue752/JR8FeYhsxYWQKLSSHVsQLl9j3hUhzSwXT2DcAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);

export default LockIcon;
