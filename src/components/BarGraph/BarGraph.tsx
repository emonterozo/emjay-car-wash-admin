import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import Svg, { Rect, Text as SvgText, Line } from 'react-native-svg';

import { color } from '@app/styles';
import { formattedNumber, shortenNumber } from '@app/helpers';

export type DataProps = {
  label: string;
  subLabel?: string;
  value: number;
};

type ExtendedDataProps = DataProps & {
  display: number;
};

type BarGraphProps = {
  data: DataProps[];
  chartHeight?: number;
  barWidth?: number;
  barSpacing?: number;
  shortenDisplay?: boolean;
};

const BarGraph = ({
  data,
  chartHeight = Dimensions.get('window').height / 3,
  barWidth = 45,
  barSpacing = 20,
  shortenDisplay,
}: BarGraphProps) => {
  const [graphData, setGraphData] = useState<ExtendedDataProps[]>([]);
  const [maxValue, setMaxValue] = useState(0);
  const totalBars = data.length; // Number of bars
  const chartWidth = totalBars * (barWidth + barSpacing) + barSpacing - 5; // Dynamic chart width

  useEffect(() => {
    // Find the max value in the dataset
    const maxValueHolder = Math.max(...data.map((d) => d.value));
    setMaxValue(maxValueHolder);
    // Convert values to whole number percentages
    const dataHolder = data.map((item) => ({
      ...item,
      value: Math.round((item.value / maxValueHolder) * chartHeight) || 0,
      display: item.value,
    }));

    setGraphData(dataHolder);
  }, [data, chartHeight]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}>
      <Svg width={chartWidth} height={chartHeight + 60} style={styles.svg}>
        {/* Horizontal Grid Lines */}
        {[1, 0.75, 0.5, 0.25].map((y, index) => (
          <Line
            key={`h-${index}`}
            x1="0"
            y1={chartHeight * (1 - y)}
            x2={chartWidth}
            y2={chartHeight * (1 - y)}
            stroke="rgba(0,0,0,0.1)"
            strokeDasharray="4"
          />
        ))}

        {/* Vertical Grid Lines */}
        {graphData.map((_, index) => (
          <Line
            key={`v-${index}`}
            x1={index * (barWidth + barSpacing) + barWidth / 2}
            y1="0"
            x2={index * (barWidth + barSpacing) + barWidth / 2}
            y2={chartHeight}
            stroke="rgba(0,0,0,0.1)"
            strokeDasharray="4"
          />
        ))}

        {/* Bars */}
        {maxValue > 0 &&
          graphData.map((item, index) => {
            let barHeight = (item.value / Math.max(...graphData.map((d) => d.value))) * chartHeight;
            barHeight = barHeight >= chartHeight ? barHeight - 30 : barHeight;

            return (
              <Rect
                key={index}
                x={index * (barWidth + barSpacing)}
                y={chartHeight - barHeight}
                width={barWidth}
                height={barHeight}
                rx={6}
                fill={color.primary_pressed_state} // Blue bars
              />
            );
          })}

        {graphData.map((item, index) => {
          let barHeight = (item.value / Math.max(...graphData.map((d) => d.value))) * chartHeight;
          barHeight = barHeight >= chartHeight ? barHeight - 30 : barHeight;

          return (
            <SvgText
              key={index}
              x={index * (barWidth + barSpacing) + barWidth / 2}
              y={maxValue > 0 ? chartHeight - barHeight - 6 : chartHeight} // Position label at the top of the bar
              fontSize="12"
              fill={color.black}
              fontWeight="regular"
              fontFamily="AeonikTRIAL-Regular"
              textAnchor="middle"
            >
              {shortenDisplay ? shortenNumber(item.display) : formattedNumber(item.display, 0)}
            </SvgText>
          );
        })}

        {/* X-Axis Labels (Days) */}
        {graphData.map((item, index) => {
          let barHeight = (item.value / Math.max(...graphData.map((d) => d.value))) * chartHeight;

          return (
            <React.Fragment key={index}>
              {/* First text (Day Label) */}
              <SvgText
                x={index * (barWidth + barSpacing) + barWidth / 2}
                y={chartHeight + 25} // Existing text position
                fontSize="16"
                fill={barHeight >= chartHeight ? color.black : '#888888'}
                fontWeight="regular"
                fontFamily="AeonikTRIAL-Regular"
                textAnchor="middle"
              >
                {item.label}
              </SvgText>
              {/* Second text (Additional Label) */}
              {item.subLabel && (
                <SvgText
                  x={index * (barWidth + barSpacing) + barWidth / 2}
                  y={chartHeight + 45} // Adjusted lower for spacing
                  fontSize="12"
                  fill={barHeight >= chartHeight ? color.black : '#888888'}
                  fontWeight="regular"
                  fontFamily="AeonikTRIAL-Regular"
                  textAnchor="middle"
                >
                  {item.subLabel}
                </SvgText>
              )}
            </React.Fragment>
          );
        })}
      </Svg>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  svg: {
    overflow: 'visible',
  },
});

export default BarGraph;
