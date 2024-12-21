import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const SettingIcon = ({ width = 30, height = 30 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={30} height={30} fill="url(#pattern0_178_952)" />
    <Defs>
      <Pattern id="pattern0_178_952" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_178_952" transform="scale(0.0208333)" />
      </Pattern>
      <Image
        id="image0_178_952"
        width={48}
        height={48}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFBklEQVR4nO1azY8URRSvAgUNQiJcVxI/TsBFTCR4Af8ACRjWk8Qbugv9akayFzHpmzH8FWz4yO6gCYnr9Hszh3EvnowfYHRFVCIRr7uAgBF2zKuurulhuvqjZtkdI7+kw2a6+tV7VfV+76MQ4jEeArS3S0UtCfS3VNTVT/x3i9+JUYcEalvFBx4kMeqQZuVFHbfaH+u41RhxT4w6pFntsr+vHsYb61fNgPFyc5VDrf2CBJyXQA8k4DeiFu3OHPdO5ymhWgcKDVCtA3ps5lzRbp7DzDXPcw+nfNB8USq6bpjkQfwvLgpFe3pj8DWpsCEV3ko56x8DBgDdSL3nsbNCRXvtAEV7WHbfXIqusw7+K2+Vx3kxMfesBJqxRgTREQk016NKvM2GCMDjImiOZSzGGL+LjaW/UhQ7F8uyys/Ec+G8NcJnJ6wAVv4EbdI/hp0nrBE9xX8RQEftmDKY7DwjFL3L3/bLohmeQ485QZt6RuAX1bQfb6yXiu7zVvbRYWKEwtNS0ZKA1gfi6FdPVhOeltXYIBSeZFkSaNoqn6bf+Djdr+zYUtG3A6vSh670VryMrDC120welREzwmK+EY8IYZ/yi07mK0SaGRSeFqsEGR/RQcbzAjNE7GRLIgzXFZ7pIHpLAp6XQAuamfRDC1LROX6nx+TKCNdpn+CYEURHVmI1PtfC2GHzoKI3B1gl+7kqgA7ly8KTlmKHgg5SZlIX2/CKAZ5KKfidUAQiaO7Q1MpPLdopoKUk4KUUZX7s3NGwsUEq/DWO3KlgVxUm6HQ1z7vG9JS/x9yee8z4ncIJHmuNcAGi94zcWeGF+pdP65APeFsHHtexSZQPWvtKy1bR/sQIofBg5pipi5vjiI23nLlT/iRJYoYN5zabM69XviqAJs0u/Ow6nlLRJ1p+jd6oXgYm2SPnNllgtknOfBE7OaM9XjYKHs6eA4MBEsgqT51lINCNzMQsPvvnzeqD8IXCmpnnbLYBzbH+LNZRnmaWgQWQgD/FXN3c4W1ALdppDFgo/c2x9raB8tSn3Evyf6eDl8GUdlRdH5T/qCvNN8trb0DQ3GKj/FAGrNURAtrlf4Twbk8ZZqDssP+n04kVnTMphhrCgLpR5kzm+/fxOdbBoVv0EI0iedEo4CVvGgX63otGAZGNKxfIAC+48xW6aqLpRGUDdH1MvPpXnIEM6NNygcw3lQA61MuDov2lZQf4erzbuKzbLC6GArwjgW76pRLpZC4nVeCEzBoBNJlbu/I7XvnkqAJ+VJhqeCdzDBXttZ0HVyGi02lrBB+JyxxhdQrNO8cP0C7tsObM88pr5UOH7wTNjVLRtaHTaUbS++EiI99YPMiJWXFBg1ecxyaBog/N+M/E0KhSUrIz1ugw5zZS0Y9xsNN+9IOmSmabojZMqHf0pqlD3h5O+f5237RYi6K+jq/6SRmltkrQfrmyjMLGlk/wciHMkNXXxsSvV7a1CDStfYIdu6hNkoegudE47JLuO7lai4D/VG8tlm7u0m86Ek9d3FxB8S2G56+Vau4CdcQqtNfvcA3L+Yuzvc65DacH8dhy7XWg38Vxel54oY4vFV5wxMFutu+Cg0vRogsOVlQVXHCw8t4XHFlXTOxMQ10x4bJOzFy5DdArvSsm6vivfBZKOVFSLeUYsGJzPRKskAFrh6605emx9rbcMvC/+V8NKFUGjiqgvZ1LPtvANbWCVt5RX4v/M/4FekL+OLYUxpsAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);
export default SettingIcon;
