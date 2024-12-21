import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const OngoingServicesIcon = ({ width = 40, height = 40 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={40} height={40} fill="url(#pattern0_177_25)" />
    <Defs>
      <Pattern id="pattern0_177_25" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_177_25" transform="scale(0.0208333)" />
      </Pattern>
      <Image
        id="image0_177_25"
        width={48}
        height={48}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADQklEQVR4nO2ZzW9MURTAz9GiLRtfG+x0IbGQlGgFEaGkYUeFiFYimaTad8+8VuKjGBb4AxCRFA270k0xc84rGTbd6EJEF6obIYiPrhFU3ut05s6Mdr7evDeN+SV3c9+7557z3rnnnHsvQJkyZQonFJoDhtUAyjqNSvpRySskGUfin5NNxmN994HkFJDUO2N8xwivRJLLqPg9kkzk2N6h4ktgPl7hveLtg0uQ5Doq+ZGH4qntOxJfA5MXe6O8kgNI/DVNESUfkLgHjMhhCEbqbCMhMDzXaZ3RpaBkHRC3oJKbSPIxfTx/ASOyv3iKh6KVzldPVzwKwchuaO6ryEUWKN6DxE//YchV57mrmEPVSPIgeTIeBUN2FiybpAmVvEkxYsCe080vn6p8L3TJAncmAIBj0YVIcifNCDf+RKrbgJKzUCyIz6W41BUXFqxHyk9jBARlH+QfKvVow73gEUh8VzPiM7Q9XFSg6/Coqz6f3ZoYy9+V7AyrJSkgaxd4DUmTnuyg3Vqe9VinPNDjvE+g4meaF1zMblRzX4Ve2zhJyi+UneziBrzNrgA0rAa9PHA/K+aag/hT/GOavCHzIOJuzeoe8BlUfDuxFvlEFgOkPz7ALsz8Rkmrlp3vZXw/tvGY8v868JugtV4z4GXG91HJt7gBdknsN0Z4WVLJnYmk+B/qmwd+Y4TnJ+WDTKDi1zFrX0OJgDnpZHItKO4CI7wKSgWzBHUqMyNKjiLxIzB4G8w6AgM1SPIrtupHYPYxgUjyImbALZiVmEPV0MFrS+P4778mFK0Eg48DyRlojVZ56gEk552DYPtkL2+CfEgrZYPgFcoibd6WAgRxo7YvPgheQVazVhHvKExYUDaBsra7pVv280a2OPcIrqN4r/2LXV0TrdEqR2ZRT6dt1OBmbb98oRincWBYW12Tmz6R1CPxn9ji6nZNruKTibUW2eia3GkmawSSI4nw5mTuG07Zkc1x+2RgGLEvOmAqUdrh2o42tmzP6eDV2pbvSbzf5NrY8eCYU8/HQGLRIswaKIktn+LnqOQ3ELfF+xV3JdxCOhP9ErDfRZJhT5PjzExg2uGv/Qecmxf7JidlJxUYqHHGlClTBgrlL18Mjvs8r68+AAAAAElFTkSuQmCC"
      />
    </Defs>
  </Svg>
);
export default OngoingServicesIcon;
