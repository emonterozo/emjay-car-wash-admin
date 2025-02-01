import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { format } from 'date-fns';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

import { NavigationProp } from '../../types/navigation/types';
import { ScreenStatusProps, TransactionItem, TransactionSummary } from '../../types/services/types';
import { color, font } from '@app/styles';
import {
  AppHeader,
  EmptyState,
  ErrorModal,
  FloatingActionButton,
  LoadingAnimation,
  ServiceTransactionItem,
} from '@app/components';
import { formattedNumber } from '@app/helpers';
import { WaterDropIcon } from '@app/icons';
import { getTransactionsRequest } from '@app/services';
import GlobalContext from '@app/context';
import { ERR_NETWORK } from '@app/constant';
import Svg, {
  Rect,
  Text as SVGText,
  Path,
  Circle,
  LinearGradient,
  Stop,
  Defs,
} from 'react-native-svg';

const data1 = [
  { day: 'Sun', value: 5000, extra: 1000 },
  { day: 'Mon', value: 15000, extra: 2000 },
  { day: 'Tue', value: 20000, extra: 3000 },
  { day: 'Wed', value: 25000, extra: 5000 },
  { day: 'Thu', value: 10000, extra: 2000 },
  { day: 'Fri', value: 15000, extra: 3000 },
  { day: 'Sat', value: 28000, extra: 4000 },
];

const maxBarHeight = 200; // Max height of bars
const maxValue1 = Math.max(...data1.map((d) => d.value + d.extra)); // Find max value for scaling
const barWidth = 30;
const spacing = 20;

const CustomBarGraph = () => {
  return (
    <View
      style={{ alignItems: 'center', paddingVertical: 20, marginTop: 100, backgroundColor: 'red' }}
    >
      <Svg
        width={data.length * (barWidth + spacing) + spacing}
        height={300}
        style={{
          backgroundColor: 'pink',
          alignItems: 'center',
        }}
      >
        {data.map((item, index) => {
          const totalHeight = ((item.value + item.extra) / maxValue) * maxBarHeight;
          const extraHeight = (item.extra / maxValue) * maxBarHeight;
          const barX = index * (barWidth + spacing) + spacing;

          return (
            <React.Fragment key={index}>
              {/* Extra (orange) section */}
              <Rect
                x={barX}
                y={maxBarHeight - totalHeight}
                width={barWidth}
                height={extraHeight}
                fill="#F4A261"
                rx={4}
              />
              {/* Main (blue) section */}
              <Rect
                x={barX}
                y={maxBarHeight - (totalHeight - extraHeight)}
                width={barWidth}
                height={totalHeight - extraHeight}
                fill="#3D78FF"
                rx={4}
              />
              {/* Display value on top */}
              <SVGText
                x={barX + barWidth / 2}
                y={maxBarHeight - totalHeight - 0}
                fontSize={12}
                fill="black"
                textAnchor="middle"
              >
                {item.value + item.extra}
              </SVGText>
              {/* Day label below */}
              <SVGText
                x={barX + barWidth / 2}
                y={maxBarHeight + 15}
                fontSize={12}
                fill="black"
                textAnchor="middle"
              >
                {item.day}
              </SVGText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const data = [
  { day: 'M', value: 200 },
  { day: 'T', value: 200 },
  { day: 'W', value: 300 },
  { day: 'T', value: 200 },
  { day: 'F', value: 100 },
  { day: 'S', value: 250 },
  { day: 'S', value: 180 },
];

const maxValue = Math.max(...data.map((d) => d.value)); // Find max value for scaling
const graphHeight = 200;
const graphWidth = 300;
const padding = 40;
const pointRadius = 4;

const getBezierPath = () => {
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (graphWidth - padding * 2) + padding;
    const y = graphHeight - (d.value / maxValue) * graphHeight + padding;
    return { x, y };
  });

  let path = `M ${points[0].x},${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cp1x = p0.x + (p1.x - p0.x) / 2; // Control point 1 X
    const cp1y = p0.y; // Control point 1 Y
    const cp2x = p0.x + (p1.x - p0.x) / 2; // Control point 2 X
    const cp2y = p1.y; // Control point 2 Y

    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
  }

  return path;
};

const CustomBezierGraph = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 5,
      }}
    >
      {/* Chart Title */}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Chart title goes here</Text>
      <Text style={{ fontSize: 14, color: 'gray' }}>15 April - 21 April</Text>

      {/* SVG Graph */}
      <Svg width={graphWidth} height={graphHeight + 60}>
        <Defs>
          {/* Gradient for fill */}
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="blue" stopOpacity="0.4" />
            <Stop offset="100%" stopColor="blue" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Area Fill */}
        <Path
          d={`${getBezierPath()} L ${graphWidth - padding},${graphHeight + padding} L ${padding},${
            graphHeight + padding
          } Z`}
          fill="url(#grad)"
          opacity={0.3}
        />

        {/* Line Path with Bezier Curve */}
        <Path d={getBezierPath()} stroke="blue" strokeWidth="2.5" fill="none" />

        {/* Data Points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * (graphWidth - padding * 2) + padding;
          const y = graphHeight - (d.value / maxValue) * graphHeight + padding;

          return <Circle key={i} cx={x} cy={y} r={pointRadius} fill="blue" />;
        })}
      </Svg>

      {/* Tooltip */}
      <View
        style={{
          position: 'absolute',
          top: 90,
          left: 120,
          backgroundColor: 'white',
          padding: 8,
          borderRadius: 8,
          shadowOpacity: 0.2,
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>489</Text>
        <Text style={{ fontSize: 12, color: 'gray' }}>additional text</Text>
      </View>

      {/* X-Axis Labels */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: graphWidth - padding,
          marginTop: 10,
        }}
      >
        {data.map((d, i) => (
          <Text key={i} style={{ fontSize: 12, color: 'gray' }}>
            {d.day}
          </Text>
        ))}
      </View>
    </View>
  );
};

const Sales = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Sales" />
      {/* <LoadingAnimation isLoading={screenStatus.isLoading} type="modal" />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchTransactions}
      /> */}
      {/* <CustomBarGraph /> */}
      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
});

export default Sales;
