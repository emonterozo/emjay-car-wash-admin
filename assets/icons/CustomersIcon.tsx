import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const CustomersIcon = ({ width = 40, height = 40 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={40} height={40} fill="url(#pattern0_177_9)" />
    <Defs>
      <Pattern id="pattern0_177_9" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_177_9" transform="scale(0.0208333)" />
      </Pattern>
      <Image
        id="image0_177_9"
        width={48}
        height={48}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADjElEQVR4nO1ZzW9MURQ/x6JFEyoEe4IIG6HR8m9QlJb4LN49M51Fl7P1GUoQiY8dSZfSzDvnTaWJUiGsfK1U7VgQ0ZKgzci9707b+Xjz8aba0cwvuUn77p3f/Z1zzz3nzBuAGmqoYX4ASZ4gSSp38ODcaeLBkjXlXygpVPKo+gyQVJ7FARNVBqwZMMfAeXwCPDgzFzaFoKTDZDXFY3Y8Bsc9YOYqBM6YzqANFN8tkNFuQ1VDyX6bp0ch4h0B1b8KTvatBuKj+pk5esX7Zl9YZ98yVHwRiT8i8W8kGUGSC0ADjfmKISj3RA4Hcad/Cvw4DHd4dCeXIsmbgJB4DU5iSXopkvwwBsRkZQ5PTFZaA8bCcIeG9obd+C043naISQOQ26z/t8/PhTUAy+AOb4CS10ZURHZkTKjkzklPZYcQcWcOkZKT2X0MlsFdgQE8Zr3akDERk4ackIhwW8Yl1iGgx/RLTN7eUNxhUdRLxK8y1pPcCUyjxLcq4Q4FJDk/FafcYrzlcEtwnJpCtt/vJLXXedQUngi3ZRcyLJs7DHSmsJ6a8UzR/Q+5M0ADjcZbSj6gkl9IPGy8051cWtXcZcNJ1ANxKxLfR5J3k72Q//c9cNzdEO+tg6qEkj22igZc4MmLPAzk7ZpdcdHkZiS5ajzpF6uvqOQlEp8FctfbubTIF0ByHLqS6yA6tMgMctfr9sL/zKQhl/UaVHLGPv9quP0LfAWUbKpcuJOoN+KUTBT1rM7ZJAcLt8w6Q/GhdMXGgnwygYp7wodcvLcOifutuD86v0PE2wrHHiz2i5PbPPWlm0chyk2lO8bbni5iqFMsuc2GU3OrxDbbko9bbgllhD5Gu8EXIzwbuloq/uwXIp3jywRxuxX4KacSa2hD/LDSGi6VR+4kNvpHKL/yiteIeEesgKcQCilEkud++y2H8y6JcpNtscfhNG8omVrHnhV3rcCah7Zxa68gc3XYffqD95HrNox7Sub1v1zo0HC3BBPbRuxUcjmERdfACivuW+CaiLvFXuyRknlRyXcjzkmsKWokcSvE4wvKFq8/Q95ea8D7wHVRXlvUyFxxcrPoO0nlUfGiVdoAxadLeJ14o3TvRIcWmVSm+GdWbs58nWGM4OHw4nl4uvgAA3TNuAMdAwthXgOVPAufEqtAJ6bjscqBQTprBswScN6fABbK/dX9ExMP/je/kam501RDDTXAzOIvjwkMfefR0D8AAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);
export default CustomersIcon;
