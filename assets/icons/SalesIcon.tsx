import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const SalesIcon = ({ width = 40, height = 40 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={40} height={40} fill="url(#pattern0_177_22)" />
    <Defs>
      <Pattern id="pattern0_177_22" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_177_22" transform="scale(0.015625)" />
      </Pattern>
      <Image
        id="image0_177_22"
        width={64}
        height={64}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEBUlEQVR4nO2aS2xMYRTHz/FaCEE9w8JCiKWFpUhKworEQkK8EhLS1j1nWpomHp16LCw8QpAWibC0Ehmcc1vqGRZCsWVjUZF6RAnV0CvfnSltZ0Zn2nvH1ztzki/3Mfd+33d+93v8vzMfQCTNQ4jJBmB3vX9eXOYhspxBVi+Z5ALE46OgOJ3XYoLgZXG+KCB4gzgfaQgeIkljP0dJOjKeJ68bIzQweulfnuQ8kh7ovQbWBiQ5HcGW4GV03nfMON0HQKqVRAsCkhzL2rTTAGTpKizHYaQasnzJ2q8zAsgI4TOMVEOWg0jaaVpC2qCWFUBv19GjBiCk/RYV+yeAYjAuAWgotQAudQGvNAZwaRD0SrMAl6bBBig64/81DVa2ToCYLgNWQtYmZLmOrG3I+hZZPyJrV6piXalrc78NSRPmeXDEAUfK/XxGDABqmQkku5DlPrJ0Dx6VySVJN5LeM/n6+VsJoCIxJbnGDsrpf8BgPQXcOtkeABWJKcjyMkOFu5DlUbLCSsDuamBdBJWJueYd2H5tvP++OZprc9/8bp5zxEGSk8j6EEm+peVN8sJ/xwoALBV9vtB7fz1u+v72J2MDyT/eOgaoeQmSnkDS9j/OkFZbAkCTBZC2D6mP5mPVUoakb/JypmAAWO5AAQxJ7loKQH8CSx3UNU8KvhAAqGmdBix7kfSXrQC8VEv4jqyXofbqxGHlWy1lwO5KYN2HJLcM4L7lWAxAU4OUy2nPrr0yGlh3IOmRfsmEtEnPIck1JHmGpB8GmxLtAUC6P+cKkm4JShMAS70dAFiXIktPTgCytJYhCKIeIHe5HQB6tcAAwQLk7oEwAJB8BZatYN1awLkxD0nPpuLz72CnLEx7hiQ+DMc7jBiC6pY5dq8G4/FRWVUg6bq8HGa9jaSHfWUZvzIuGmFx0jW+XuiXlIB0G8R0FcTcxbBLZwRWXugAqtzZSPIASR4DSwyqmqcGXwiAD4W1FlmfI+uTnLtC6AAc2T2g+XYFIoTMas8ERPxxQ1qQ9MeAWaY2OkKIpBFJLiLrVWR5iiSf/p8QqmleAKw1/jGnAqQ+UkIISV6nXniVUwGOlEdKCGFfJ3K1mFalFkH2CSHn5qa/ddKN4QCwWQgZXWIcNymXfUA4VAC2CqF8DYcLwDYhFDqAKsuFUOgAHMuFUOgA2HIhFD4AsVsIFaALlFsthMys5Nzc5KfQpsGYxUKIZfOfOhkIoQCwWQgVRArbLIQKDmCkR4TQViFUmZhlYIUeEUJbhJBzYzo4ugJJDpkdIgM3X4QWEcJ84wGB/DWmTUh6KSmE/H1CnYEJoXyXw0DufH/zgTlGQQjluxzO22wXQgWxmMVCqGDmWCqECm5xy4SQdUb2RoR+A95JGh4i1BdYAAAAAElFTkSuQmCC"
      />
    </Defs>
  </Svg>
);
export default SalesIcon;
