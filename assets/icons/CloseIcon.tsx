import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const CloseIcon = ({ width = 12, height = 12 }: IconProps) => (
    <Svg width={12} height={12} viewBox={`0 0 ${width} ${height}`} fill="none">
    <Rect width={12} height={12} fill="url(#pattern0_1483_14082)" />
    <Defs>
      <Pattern
        id="pattern0_1483_14082"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_1483_14082" transform="scale(0.01)" />
      </Pattern>
      <Image
        id="image0_1483_14082"
        width={100}
        height={100}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACh0lEQVR4nO3dy27TQBiG4VmCgHsAqVJ7IwiJsuIkYAnqJqo8M6m67rWAWBUuDZUrIB+yhSGcgpMm5PPv95W8zkye+CDbsVMiIiIiIiIiIiIiIiKiwanWAzXNEzXNQ81mt6N+dTo/v6NSjru51nqQ3FKtN5Xze5WyUCn6tlyp1hcpWKr1lUr5/H2eOX9Rzu90cXEjudQN6AfE8rJQzicpSMr55Jcf3fLyNjmk09N7KwYZBkWrMfp53t33OJNKebpikCFQ9G+MfvP12GGwDwaAjBZFQzHapWnue+zQ2x14QBStg1HKJ5sde3f4N3zgo0DRehgLi83Vcsr5dXcIOHQCtc6SaWqaNyHmEgFFUTAioCgaxphRFBVjjCiKjjEmFE0FYwwomhqGM4qmiuGIoqljOKEIDB8UgeGDIjB8UASGD4rA8EERGD4oAsMHRWD4oAgMHxSB4YMiMMxuMiixbrKIsKZoX+fHJpW2hwKGEcqCNcMHZQGGD8oCjB2m9Q5tATHDECh+GALFD0Og+GEIlOtiZE6d2KQNThQ63GIUMl3jrC0oRhh9oGypbV7PEJsvH4w+UDZsl1f6xJrig9EHysD+5zVwsab4YPSB8pf2eXeIWFN8MPpAMcLomzyKE0aaOoojxmRRnDEmhzIGjMmgjAkjPMoYMcKijBkjHEoEjDAoKuV5tP9naP2HYD5LDrUP3f/pWegBMDZEudLZ2a2079Q0jyJibIhynEzeFhASY4NHjb9M+07z+VFkjLVQ5vOj5JBK+RgZYyDKZbJ640zOH37bybkceWyxdk5/eNb9ZfsdJLeU82G3T2lfeeRwxLGj2rl1c2znmvPhrj6HiIiIiIiIiIiIiIgoBewrvrMOyC6Iq6IAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);
export default CloseIcon;
