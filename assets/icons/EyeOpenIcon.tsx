import React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';

const EyeOpenIcon = ({ width = 25, height = 25 }: IconProps) => (
    <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
    >
        <Rect width={25} height={25} fill="url(#pattern0_178_179)" fillOpacity={0.8} />
        <Defs>
            <Pattern
                id="pattern0_178_179"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_178_179" transform="scale(0.02)" />
            </Pattern>
            <Image
                id="image0_178_179"
                width={50}
                height={50}
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADLElEQVR4nO1YzUtUURS/h4qEMqtNn9YudBVB9D/0IRnRIiLdBZlzzmiIy4ywzKJoE7TpY9uiXEwz58xY06ZdERFUZIsCJRE00ygRcuK+N4E67755d54zuLg/ODAMcz5+55x77j2jlIODg4ODg4ODw+rHudfraqJTFbTn6xRxKyAPKso2W+tTttnX5VaVSK9XNUcXbwWUy0AyBSRfFeb2VGyrI7UXiL9pW4qkT51PbVFVB+U3A8k1QJkBkgKQzKlO3h/bbiJ3QNsC3+ZPIO7XvlRVkOQzQDxedOaJl8EVQrHChUXyXVH29ErZV7ptACW3zEkBUCZVz1C9US+ROQ7ELwH5ly+SV0lpMf8+vQmQf5T4IZZYretBH2T/HBQCiNw1qQHKQKCOH1i/UY/knsHXpE6MPYFL+bWAchuIF0wBGbPrVcJEoqiLfMxelxeA+JY69XhNNBK9uQYgyZQNppsbg9S9diqjCyQvzBNMwnWR07oNw0kkMzuA+H2EQAreHRJMZLZ8MDIT6L89XxfFN5C8Ux2p7cqYDZSRiIYKpoMei0jPUH1U/0D8uXQI6EpYkPBbK7cvkAhKPkJ7PA8k0slNNjF4ZBZXBkhe2RnQdwi3BgaTlJayusnM0UBd5JO2cejYYxEBkvuBwfjt1R9SjStGPZRHsYgoHN4GKJ+sDOjZ3ptrMAWlR6yeTv6Z4VmvnUyV+P/8waALMVQ+6tiXGuoa3gUkXyx71Hi52QKIr1smckTHHGzNO/T81oLIH5XMHozNoosPaVsQncSb0koEvnkC3lbmnh9VifTuikl0cyMQj1kkT0LfeEugnwEkfYDyN6LxMZ3Vyp7v3i4SxccCIN+pbKtEOQHI01HbTO8qoQNgyV7jnYm5iFWfNo57yw3umcVBnALkB57jTm5SHfmNnujPOjHED62mE0oq/jN++UWHPGo31eIIjyviNlW1XZ3kptWEsRXk30Byoza7u75zkAcruMDKtKQMqAvZnarm0L1P3ObvLzxfQfvM+/tF5qy6KBvUqoAmhdkjgHwVUJ4C8gcgmShOJi0T/nf8xP+XRA6vnuAdHBwcHBwcHBxUCP4BigohlFrqeF8AAAAASUVORK5CYII="
            />
        </Defs>
    </Svg>
);
export default EyeOpenIcon;
