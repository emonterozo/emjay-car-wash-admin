import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import Svg, { Rect, Text as SvgText, Line } from 'react-native-svg';

import { color } from '@app/styles';
import { formattedNumber, shortenNumber } from '@app/helpers';

export type DataProps = {
  label: string;
  subLabel?: string;
  income: number;
  actualIncome?: number;
  expenses?: number;
};

type ExtendedDataProps = DataProps & {
  incomeHeight: number;
  expensesHeight: number;
  isExpensesGreater: boolean;
};

type BarGraphProps = {
  data: DataProps[];
  chartHeight?: number;
  barWidth?: number;
  barSpacing?: number;
  shortenDisplay?: boolean;
  display?: ('income' | 'expenses')[];
};

const BarGraph = ({
  data,
  chartHeight = Dimensions.get('window').height / 3,
  barWidth = 45,
  barSpacing = 20,
  shortenDisplay,
  display = ['income'],
}: BarGraphProps) => {
  const [graphData, setGraphData] = useState<ExtendedDataProps[]>([]);
  const [maxValue, setMaxValue] = useState(0);
  const totalBars = data.length;
  const chartWidth = totalBars * (barWidth + barSpacing) + barSpacing - 5;

  useEffect(() => {
    // Normalize data and set default expenses to 0 if not provided
    const normalizedData = data.map((d) => ({
      ...d,
      expenses: d.expenses ?? 0,
    }));

    // Find the max value (considering both income and expenses)
    const maxValueHolder = Math.max(...normalizedData.map((d) => Math.max(d.income, d.expenses)));
    setMaxValue(maxValueHolder);

    // Normalize values to fit within the chart height
    const dataHolder = normalizedData.map((item) => {
      const incomeHeight = Math.round((item.income / maxValueHolder) * chartHeight) || 0;
      const expensesHeight = Math.round((item.expenses / maxValueHolder) * chartHeight) || 0;

      return {
        ...item,
        incomeHeight,
        expensesHeight,
        isExpensesGreater: item.expenses >= item.income, // True if expenses are greater than or equal to income
      };
    });

    setGraphData(dataHolder);
  }, [data, chartHeight]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}>
      <Svg width={chartWidth} height={chartHeight + 90} style={styles.svg}>
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

        {/* Bars (Income & Expenses) */}
        {graphData.map((item, index) => {
          const barX = index * (barWidth + barSpacing);
          let totalHeight = Math.max(item.incomeHeight, item.expensesHeight);
          const baseY = chartHeight - totalHeight + 40;

          return (
            <React.Fragment key={index}>
              <Rect
                x={barX}
                y={baseY}
                width={barWidth}
                height={totalHeight}
                rx={4}
                fill={item.isExpensesGreater ? '#F4A261' : color.primary_pressed_state}
              />

              {/* Income Inside Expenses (Blue) */}
              {item.isExpensesGreater && (
                <Rect
                  x={barX}
                  y={baseY + (item.expensesHeight - item.incomeHeight)}
                  width={barWidth}
                  height={item.incomeHeight}
                  rx={4}
                  fill={color.primary_pressed_state}
                />
              )}

              {/* Expenses Inside Income (Orange) */}
              {!item.isExpensesGreater && item.expensesHeight > 0 && (
                <Rect
                  x={barX}
                  y={baseY + (item.incomeHeight - item.expensesHeight)}
                  width={barWidth}
                  height={item.expensesHeight}
                  rx={4}
                  fill="#F4A261"
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Value Labels */}
        {graphData.map((item, index) => {
          const barX = index * (barWidth + barSpacing);
          const totalHeight = Math.max(item.incomeHeight, item.expensesHeight);

          return (
            <React.Fragment key={index}>
              <SvgText
                x={barX + barWidth / 2}
                y={chartHeight - totalHeight - 6 + 40}
                fontSize="12"
                fill={display.length > 1 ? color.primary_pressed_state : color.black}
                fontWeight="normal"
                fontFamily="AeonikTRIAL-Regular"
                textAnchor="middle"
              >
                {shortenDisplay
                  ? shortenNumber(display[0] === 'income' ? item.income : item.expenses!)
                  : formattedNumber(display[0] === 'income' ? item.income : item.expenses!, 0)}
              </SvgText>
              {display.length > 1 && (
                <SvgText
                  x={barX + barWidth / 2}
                  y={chartHeight - totalHeight - 22 + 40}
                  fontSize="12"
                  fill="#F4A261"
                  fontWeight="normal"
                  fontFamily="AeonikTRIAL-Regular"
                  textAnchor="middle"
                >
                  {shortenDisplay
                    ? shortenNumber(item.expenses!)
                    : formattedNumber(item.expenses!, 0)}
                </SvgText>
              )}
              {item.actualIncome! > 0 && (
                <SvgText
                  x={barX + barWidth / 2}
                  y={chartHeight - totalHeight - 22 + 40}
                  fontSize="12"
                  fill="#4BB543"
                  fontWeight="normal"
                  fontFamily="AeonikTRIAL-Regular"
                  textAnchor="middle"
                >
                  {shortenDisplay
                    ? shortenNumber(item.actualIncome!)
                    : formattedNumber(item.actualIncome!, 0)}
                </SvgText>
              )}
            </React.Fragment>
          );
        })}

        {/* X-Axis Labels */}
        {graphData.map((item, index) => (
          <React.Fragment key={index}>
            <SvgText
              x={index * (barWidth + barSpacing) + barWidth / 2}
              y={chartHeight + 60}
              fontSize="16"
              fill={maxValue === item.income + item.expenses! ? color.black : '#888888'}
              fontWeight="normal"
              fontFamily="AeonikTRIAL-Regular"
              textAnchor="middle"
            >
              {item.label}
            </SvgText>
            {item.subLabel && (
              <SvgText
                x={index * (barWidth + barSpacing) + barWidth / 2}
                y={chartHeight + 80}
                fontSize="12"
                fill={maxValue === item.income + item.expenses! ? color.black : '#888888'}
                fontWeight="normal"
                fontFamily="AeonikTRIAL-Regular"
                textAnchor="middle"
              >
                {item.subLabel}
              </SvgText>
            )}
          </React.Fragment>
        ))}
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
