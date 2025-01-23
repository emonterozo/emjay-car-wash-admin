import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  LayoutRectangle,
  TouchableOpacity,
} from 'react-native';

import { EllipseIcon } from '@app/icons';
import { color, font } from '@app/styles';

type SizeDisplayProps = {
  sizes: string[];
  values: number[];
  isCountVisible?: boolean;
  onPress?: (index: number) => void;
};

const SizeDisplay = ({ sizes, values, isCountVisible = true, onPress }: SizeDisplayProps) => {
  const [layouts, setLayouts] = useState<LayoutRectangle[]>([]);
  const [layout, setLayout] = useState({ height: 0, width: 0, x: 0, y: 0 });
  const { height } = layout;

  const handleEllipseLayout = (event: LayoutChangeEvent) => {
    event.persist();
    setLayouts((prevLayouts) => [...prevLayouts, event.nativeEvent.layout]);
  };

  const handlePress = (index: number) => {
    if (onPress) {
      onPress(index);
    }
  };

  return (
    <View style={styles.track} onLayout={(event) => setLayout({ ...event.nativeEvent.layout })}>
      {layouts.map((item, index) => {
        if (index < sizes.length - 1) {
          return (
            <View
              key={item.x}
              style={[
                styles.line,
                {
                  top: height / 2 + 1.75,
                  left: item.x + item.width,
                  width:
                    index === 0
                      ? layouts[index + 1].x - item.width
                      : layouts[index + 1]?.x - (item.x + item.width),
                },
              ]}
            />
          );
        }
      })}

      {sizes.map((size, index) => (
        <View
          key={size}
          style={styles.itemContainer}
          onLayout={(event) => handleEllipseLayout(event)}
        >
          <Text
            style={[
              styles.valueText,
              values[index] > 0 && styles.highlightedValueText,
              !isCountVisible && styles.hide,
            ]}
          >
            {values[index]}
          </Text>
          <TouchableOpacity disabled={!onPress} onPress={() => handlePress(index)}>
            <EllipseIcon
              outerFill={values[index] === 10 ? color.primary : '#88888888'}
              innerFill={values[index] === 0 ? '#88888888' : color.primary}
            />
          </TouchableOpacity>
          <Text style={styles.labelText}>{size}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  itemContainer: {
    alignItems: 'center',
  },
  valueText: {
    ...font.regular,
    fontSize: 16,
    color: '#888888',
    marginBottom: 5,
  },
  highlightedValueText: {
    color: color.primary,
  },
  labelText: {
    ...font.regular,
    fontSize: 12,
    color: '#1E1E1E',
    marginTop: 5,
  },
  line: {
    borderWidth: 1,
    position: 'absolute',
    borderColor: '#88888888',
  },
  hide: {
    opacity: 0,
  },
});

export default SizeDisplay;
