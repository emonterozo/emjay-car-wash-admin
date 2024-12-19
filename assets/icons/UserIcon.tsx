import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const UserIcon = ({width = 30, height = 30}: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
  >
    <Rect width={30} height={30} fill="url(#pattern0_59_18)" />
    <Defs>
      <Pattern
        id="pattern0_59_18"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_59_18" transform="scale(0.015625)" />
      </Pattern>
      <Image
        id="image0_59_18"
        width={64}
        height={64}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADz0lEQVR4nO2aTYhTSRCAq/zDw6oX0ZnFuwgq+HdTPIi7ouzuSfEXxYPiyKvO/Oh4EHLZBWF1ZmRP3te/AUFwSKreKDmKOg6iHlT0IDr+ILsHRxf820h3wqSTvGhMSOZ17A8ePF76Vb3urqqurg6Ax+PxeDwej8fj8XiaQRaBZAUkeAeQdJpL3yfSy81vLUvHUBsqHkDFY6gkG33xGJL0A12eDy0244eR+E3ljpcNxDgE3OO+RezOzETFZyM6+dw8Jz6BivvybZ6XtSM+o2WAm2QxovMjEMhPkExOKWuun6nwZ1Q8WjYITloCyeESs+6DzYNTv/peMjMtFysK7wJxNzhFt8xDktfWLJ74VhFIfLIoJnQMtYErYPEMjlQ189GWYLkD94FDvj82Yb7a52sl4A2WFT11IxYkwpWFj5ZnkQGvWpLJKaj4xcRgmmQp7hBvt8z2bL3iUMn5QjCUrRB7Au6x/P/PesWhkuNurQbE3dYAHK9XXC5Zyg+Aki6IPSrc9n27AMkKO+WtOwgSvyysKMPLwL1lkDfULIrCjdZgPnFjGQTtt9JvucGoTmpqS4TkVj3ZZHxSYcUD3yoClfxVlAo7VyMIipZDPYMnq7KE3MxbnTfBrxPcI4t6K1uyIxw1MaHSdjjn8wWzz2WTfzvj+5EFkbJBMAPxAknO5YshfWaps6K9dZ12uCBil8R0csTjVZfESF7nzN7VmY+CLs83s0389Audf2KifbfMg9YliyahUeG2ibK4vjdJTivNuMfjKSM5OAMotQqC9BYg2QeKe82l782z1CrTpqXoHF6Civ9A4htI8q6KJVC3uY4kvwPJYnCSfSPTQfFeJLlb/XFYxWOyO6BkT00bqkmBZCcSP6rQmf+R5B6SXEAlp5DkmLly9xeQ+L5pEz0YD3W9EWLLwfBHJBmK6PS4yecT8gv0Ds/5qhzdRoW/6jS4QvZ4CRLpdogVxOtRyb8lu79XJsB1ZH6oWa5+l/iIllUSJ/4BCtdBLCDZjYrfWx/3yZzx19PxUg5dnGWOyrRsK1hCkN4Fk4riA8U+y48hkV7TMH1BuNbsF6yYAkr2w6SQSG9C4g+Wyd+GILWgCXrbS47QP0KQ/g2aCqWWFv/jg69qM22a/iA1G0muWYP/RucbzVGeNCWrEUv5o0nZvnZl5qLiB5Yl3DL5R8NRctRS+hZUemHjlVb6lnAREv9nnRwdbazCpD6tlbexKlYq6SpyhXoOYqoBSW7mlV1puLJq2Dw4FUky+aXxZuMVdujkZHh1rIqVegcZhGubGog9Ho/H4/F4wHE+A4/rbu0VKR02AAAAAElFTkSuQmCC"
      />
    </Defs>
  </Svg>
);
export default UserIcon;
