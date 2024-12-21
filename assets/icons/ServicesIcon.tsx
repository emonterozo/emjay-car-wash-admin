import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const ServicesIcon = ({ width = 40, height = 40 }: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
  >
    <Rect width={40} height={40} fill="url(#pattern0_177_6)" />
    <Defs>
      <Pattern id="pattern0_177_6" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_177_6" transform="scale(0.0208333)" />
      </Pattern>
      <Image
        id="image0_177_6"
        width={48}
        height={48}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEjklEQVR4nO1ZbYxcYxQ+x0cU9VEfiVTQ0Eo0lKD0l18imiJtoiJI/SDb7K57zp1dVR9hZVukCT/4J4KQNBGfDZs759wp84eKpb6KrJRQVd8lxbbRqOW8M2bunbkzuzvXzt2VOcnJzNx733uf895znvc57wB0rGMdmzJDkvuR5S8kPYAk62BGWU9xNpL8jqxjzkl/hX49Eqal9RXORNYHgfXiyjHWOyrgyw6kt1XOe+ESN4bCBZCpUbgAWb+NzPRbyPpBLfiI27nhyPXfQE7mZ4YfWTY0ATtBl/syCwByclHaAID0gozZxqVNawGQbskUfCkA+TAhLXYA6QpjI1iz6ShgWY6kIwlBvJ8dcgNGcnsi+O6hOXXXdw/NQdadiezUU5zdVuzI+kCM5+OAVjQcyOHKBoX8G5KubxP8MXSra6OibDabawvHNKmJP6dHAJZajYyLx06DAMD4fxBZ9yQGwLK84UDSaxuA3wMkA9BW63r5CPDk1gRqHIGcHFd3fW/heCT5OqFmcpDbcjhkZQ2kw04rWMt5575ejaTb64OV9zIDHglgOIWMeDNb9CVVmVJKBIszw/9/EHPzTRJHAL1hed0E7LuWNpHfu8ALzsgugH+DYBkEP7ywcox1TT29al/lPAWL3ZjMwTdrKU0eRHneaHcmGZKsKzX0eiD1IpXbfDKSPIaku5H0D2T9DEhvaj6IgkVI8jCSfoSso26HgfXncs4bdT4PLHeBJ5eDF5wIU/cmB5HlJ1fsveFcS7vyW/0heRDrJa4YTRaz3AO3yLnu9Q8MHORkst3EGngvf41jIZJXkeQXJPkUWR8Fkuus0U+1uq589mAg7bIiR9KnoE9OqXaAsq1CADHrDefarCLpF6ZZHOAJ2xhCrnAOeOIhyXP2ipFk7zj0ud+aIfDDm9346gQuLb/118DPn++OecHRyPpIVEQCy9oakSXfuVy9sTgLptJIrnCfXe8cCr5cX1rMpN/SEFlDJPkEfL2yGpB1cxENRbobWFa5c1F+bldzbdoJvOCwyLaMYfjSpSdLNwwUDykBz89D1k01QvEF6Bk6KXqzsXaAjgcgm0tKNlyCpFsrAcR29XQ9suyLiL7vreYSbpYygL7iCZZ2yPpx7IGT1kPS7+qAZZUr3Pj5je45ybORIgDLTaPV1jXQfpdOVsQcnlW/PSO7gMOrmmJoOQCn7+VJa2jAzy9ztNozdNqkV1u/cDpQeKdt/tYE+IS1n+OOt8UJsjDSsx3d1vbWpNvB08smfJ+2B+AFC5H1aWvgMd6Z7QXWeydN4S4AkwGsS4H0biR9qSQTZEd5IRpFkrfd+pBmK9yAkz7TYDfjFZdKrVgLxTfsGIOCReP+YWG87ueXIcuLycBlW2VRa9XSd1MtOOlXpnPA9E5aay9w+dHpl/9SqmB1VkxnF2zP0yjSVB9Q4VSnKM3tu5+/1LoqJH28LKdto3Z0HOAmv4vAunrGNTQd61jH2mmcnwekNxjNIclD1ts6Vqr6CJJ8XvXEhWlf/Jo6f73mniVn3eie51w2OKo198RzW/Ws5yX+ZfUP7r8Bx0FgL4y9b9kAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);
export default ServicesIcon;
