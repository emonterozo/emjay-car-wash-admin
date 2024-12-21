import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const MessageIcon = ({ width = 31, height = 30 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect x={0.333374} width={30} height={30} fill="url(#pattern0_178_946)" />
    <Defs>
      <Pattern id="pattern0_178_946" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_178_946" transform="scale(0.015625)" />
      </Pattern>
      <Image
        id="image0_178_946"
        width={64}
        height={64}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACPklEQVR4nO2aMUscURDHZ5RYCBZ2gcQyhfgBhGA+QLAOQtKkEhJw5hQCdlvGkE+R1sqI5GbUQJLDYBFIIX4B9QQLtbCxe7K3m2RP9+72ds+4b50fPLibB499f2b+7z0YAMMwDMMwjF4EqyPI8gFJj5HV+TWkiaQr4R4gL0i6cvcbKThCEXILwNIMF4EFeQq+QVszfzIh9xoYqwieUvj70QTQe5IBgc9u39n1MwuAVXD7FNfPLgB77PZdXL8PAdTrWu+0DxOALQOclQCbB7i+zcNXzATZTgFnxyDbPcB18oTM5uErt+4ByLozwNdbo/u6/+ZLJIA0Bvhq+9F13cR8aQQoOyYAWwY4KwH25hTQwq7v9ynAxV3/vwtQdkwAtgxwVgJsHuA6eUJm8/AV8wA2D3B/M7lWf5a5QQJTSiC69bXfzjyIpV2y3ucVwPka67tJCku4iUHFMoGpi0nj+v28/LEBCuAjBQSQqEGCtmbAV/px/UItMiS7EARDkMaL1WFk+XZrT+Zso7frpzZJtUSIMqHXgCWZuLkIALC+9ro1NnOp8ObkjcklmUCS89Z8TV5B5QiCIWS9bG3wzcZ429y7tbGwNOIS+QrgECpHrT4Vp9tZW/ztxkMk/RltXg/C/1BJWCkWYC0Re44kR3H8EGjzCVQVJPkdHZXyElinkeRzwoR2YOHLY6gstfpswm33Er8vgGQZ5n89gCqDrPvtdwE9RdaPsLj9CO4DSPIdSU6Q9BOwzMH8+uhdf5NhGAbk5AptBiqGIu+anwAAAABJRU5ErkJggg=="
      />
    </Defs>
  </Svg>
);
export default MessageIcon;
