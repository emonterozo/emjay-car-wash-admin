import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const PublishIcon = ({ width = 40, height = 40 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={40} height={40} fill="url(#pattern0_177_19)" />
    <Defs>
      <Pattern id="pattern0_177_19" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_177_19" transform="scale(0.0125)" />
      </Pattern>
      <Image
        id="image0_177_19"
        width={80}
        height={80}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAACKklEQVR4nO2asUoDQRCGZwQ7oy+hjZXYWVjps1gI2dUiWKlPINhY6DsIqcxsAioaO7uA+AI2io1WohDJeUYbNXHvLjOX/4MtAsfdx8fe3SYbIgAAAAAAAAAAZYZ9uGIfuiaHk7aGgF3Lg0aNGhGr3mpErHqrEbHqrUbEqrcaEaveakSsev8mwskaUS61fB7UW1FAuWQXLrR8HtS7UNSIWPVWI2LVW42IVW81IuV9CweVv7hYCdjVMIb1LhTNkqzYzYQkK3YzIcmK3UxIsmI3E5Ks2M2EJCt2MyHJit1MSPIQbn8u+vPaAi1NQCft/yzIC5UsmqzcENB6QDb+XXh0Ad3fz5X8R/yeyMgCagYBI0HASBBwHAJyhhvhWZ/PSEDJbCM86/OZCKgZBIwEASNBwEgQcBwCMpYxsQEFy5iYgJoxcQtrBgEjQcBIEHAcAjKWMbEBBcuYmICaUXQLy3Ny8lq9QoZgNQFduE1O7sMCGYIHjVKrV5JjXXjKR8SFo0TEhW0qY0DfWEr3lzv5mGw0VlOZe6qeTJMRPjb9f95/6R/n5eBjBspefjJeztNpfky7uxNUFjYai+zCC/vwRtWT+fwu5Jpz7MJjP+JWa4bKEM/LXXr77hdxweWviPJAXnZ6ErR+NkVW6Lkmzzw5SGdeb0K0aO16shiBTZllH05H/4eiDIaT12TmFRbvO665wj4cspObz3WijdFzlU7ywsj1mQcAAAAAAAAAlDHvzvzMlkkhMecAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);
export default PublishIcon;
