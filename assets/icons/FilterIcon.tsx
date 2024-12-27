import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const FilterIcon = ({ width = 20, height = 20 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={20} height={20} fill="url(#pattern0_246_693)" />
    <Defs>
      <Pattern id="pattern0_246_693" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_246_693" transform="scale(0.0208333)" />
      </Pattern>
      <Image
        id="image0_246_693"
        width={48}
        height={48}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACMElEQVR4nO2Y32sTQRDHpxG0IP5E0IqKQvpgILmb+e5tQgo9EEFffFAI+KKgglIQLFLQiKVV++PfLlNTWbc19i73K2U/cE+3+52Znd3ZH0SBQCDQSKIoumqMeSsiOwD26/hEZEd9AHAlcwAA3tXlOLxPg8gcQJ0jj+OZ+JUnA38EqCYwiw9nIYA9p/MCVU/LCWAvc28RGR8JaEWiiul2u9ecNTDOLDApX4cCzLxaipdTMMakjv03lBURgZPC7X6/f5MqIkmSW2rTsS+ZRUaj0TkRWXdENuM4XqaSieN4WW050+eT+pJLDMCSKwZgV0QelbSoF1RbbbiDptmYSZWZbwP46m0ur9M0XSzK8zRNF1XT27zGarsQA71e76K7qCffF2vtnVm1ASyJyIbn/PvhcHiJCqZljHns7g+6xTOzySuYJEkM4Idb75n5We45fxqY+aGIbHkj9jyj0RYzP/UyqlWnS1UA4IZWB8+Bj7r5/K+vtfYygDWv7+cqy/QhnU7nvDHmpefI92ml1lr7QES+eUflV0UWhMwAWPGO3loG7Qnt+m6JnPRZoSYQRdF9b2S3/TbuYtW22oeahJa9acdf918ZJbIQThsANRWEAGomZKBuQgbq5sxmoN1uX5jbAADccy8suZ4JawqgdcIdVwN4Qk0Ffx+tP3iObzFzj5oM/v3CvDYYDK5T08Fxx3f1Hq3TieYBAD+dKbNhjLlL84T5/WqxycwvtHTW7U8gEAhQ6RwAfWidwZQpd6oAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);
export default FilterIcon;
