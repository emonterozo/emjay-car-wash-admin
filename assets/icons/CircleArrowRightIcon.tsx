import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const CircleArrowRightIcon = ({ width = 16, height = 16 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={16} height={16} fill="url(#pattern0_177_150)" />
    <Defs>
      <Pattern id="pattern0_177_150" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_177_150" transform="scale(0.0208333)" />
      </Pattern>
      <Image
        id="image0_177_150"
        width={48}
        height={48}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACrElEQVR4nO1ZS2sUQRCuSrx4S+LJ6M34D3zkL3iVJPgXQpiunZOPy4JoFERRYvA/rEYkCbtVo7A3D4IRJTe9RD34iLm6elnp3rA4Ptie6ZqZDewHxcDCTH9fd3W9FmCEEUYIR70+BlEyCya5gkbW0Mg2kuwh8c+eyd7+b4+A5DKQnHXvVI6oeRxJbqDhj0jSzWgf0PAyxM+OlU986ekRJHmARn7kIP6ndZB4FWKeKoe8kQtIvKtAPG2Gv0LUWiiOeL19yO26NnH6S8h9u5Yu+fj5YSTZKJw89UWs2zV1yM83xpH4cWnkqW8bKidRitvQf21F4cJWRr5rDWoyl498zFM2MlQtAIl3bdg+aK7TDXMlm2F1kpSWdTJlbFce6C3+Dg3fds8wV7ruHzbz1Tb/NIh5pn+niLcCBOz4FYBRMqt5/H0BCiIg5jODBdiSWNV/eStVqAWIAOKLA/kXknUNv0qFQmpPIMmLHN95OFhAr/HQFaB1Eobf+Aj45v9BeYskt9DITR+zmT21WJxRhC25PQR4x3+ImicgFDHPZDiFjq6A3yNMXpjkpLaAjC7EV1108DI5V4YLbZd2iY28LOISrw1tGCVuDBRg5zZDt/OUIZHZoZOmgFSkCiCPrrlJTg0WUK+PuaGTtoBA8uhdzLl7wMt6/u8i1Z3gctrINcg4MuxoulKgdWApmfYX0CvqVoeAeLe3+3wPMsMlGfkyBOQ/w+LmJORC1FqoWgBQ6zyEwM4qqxPAdyEYrkcuIDuXNVrsD3cNr5dI/onecDc9Xl8pJeLMN8ahMNRkzkaGAvz9U/CF9cbi5uT+aSgkO/7udp3aE1A6lpJpOzFDI+9zEN9x5UGtdRQqhy2y7NDJ8CU7+rCNh+vsbHvaM9vlvXZjEVsSm+bp4fibdYQR4MDjF+MbPjW3TPQ8AAAAAElFTkSuQmCC"
      />
    </Defs>
  </Svg>
);
export default CircleArrowRightIcon;
