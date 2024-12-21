import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';
const TransactionsIcon = ({ width = 31, height = 30 }: IconProps) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect x={0.666626} width={30} height={30} fill="url(#pattern0_178_949)" />
    <Defs>
      <Pattern id="pattern0_178_949" patternContentUnits="objectBoundingBox" width={1} height={1}>
        <Use xlinkHref="#image0_178_949" transform="scale(0.015625)" />
      </Pattern>
      <Image
        id="image0_178_949"
        width={64}
        height={64}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAECklEQVR4nO2bX4hUdRTHz8nKP5QhkqSiltBThIGREPtWPqiV+bARZG1ELLm795w7a7H+AWdDQV8U6Wk11EJQ2KeSbe8591r7YvYiEQiC2tZTBFpLYkRoOPH73XH2+mfXnTszO3f2/r5wXma4M/d8fn/uOed3LoCTk5OTk5OTk5OTU1PUeWoebBlaAL2yDPxoJbC+AKSrgcJXgGQtcNgOpG8DaSd4wVtQkJegfXAWZE5dI48BB08D6xqgcD2wvAesvci6F0mPIMnXyPo9klxE0j+R5B9kLaUz+QNJdoM3PH96nfSDxXZUSAvI+hmSnEKW88hyPb0zNRjJKBSi5xvkbQntdCPZhizfWOrNcPLBEK5Cjz5TP787RuaAJx8j689Nd27KEPSsHbCa1Rc9gaw/Nd2hFAYcvlE7AF+7m+1IepOTtQNg7W++IymN9Nd8A2D9t74ASG5mwKmqrM4A9FPwwxeBZReSCJL8lXkAFLVB57lH6gIAWPvv/LKEQNHyOEQNPkKWA0g6hCyXkOVGs50fN/kN/PDDdI9FngzAJDLUC6eX2hjeDzYA6/tA4Q5kOYgkJ+wMYvkBSS6YG0SSvxsOgmSgegicEkAaFUcehu5ooU2A/OC5OAGK2sAPXgVfX7dJkBe8a5OgislWYOm71+x9H7o7eAOWLdkF0Ah5w7Nt4jUO4QoUzs7ND4AKBBlN+LEOcgUAAMrL4bYfvbkDAKn94BkCgKSYcwC6ueKHeZLkDgCUMI5FtAOKxYdyCCCt2AHodzOA3RIotcQeYHIJlg+Q5FtTGa4iSRoFCp9t7T2AouXI8mPqugHr9tYF0B0tRNLLtaTKE/vG2QeALF8kih83TNQH3eGSB144Jd844wC6hp5C1v/G7zFsn/K1MwKAL+8kpvJ3VV07IwCQOaesANibRwA9CQCHcgggaks8z6+CN/xkvgC0D85KlruQ5TRs1UX5AWBEuglZbiVnApIeBpad968Yx4ak0cwAYBSfOdzKZSBUkRdsvHM5VAGAdDO0PAAjU+3x5GX7dCDdg6T7YpMziSVyZvxz3Wedn7BKxC0GYCLlvirMeS+LswPQ72YAuyVQqmkPQJJjUBx8FHK1B5B23RU0/I6sR+3xkm1HrUc3ZpZPh/tMp+ikxcZr5Y7vAfvDLG9Cj6ya/q7tSdQxMgdZfqkAMC07Vckbnp2uV9g0U8v5OOmQ40iy3/xO3OYir9n2F9PZbd4L+OSrxxvnvB5N3NdYdR0i9x4wriknHtqANjlT2xuz8Xxc5T0XN1JpVO4+G0TSL8vTOTaSgWRYWwlvzZonPZwc+Xj6iw91VdfQing0ZRuSfG4PJcyfZrKpUo5P357Vmak2ubF45LO+YRfr2yZn3mKxs7PKNf8/FlcDKKIRiNQAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);
export default TransactionsIcon;
