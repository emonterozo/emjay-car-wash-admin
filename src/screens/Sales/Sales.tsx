import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

import { ScreenStatusProps, TransactionItem } from '../../types/services/types';
import { NavigationProp } from '../../types/navigation/types';
import { DataProps } from '../../components/BarGraph/BarGraph';
import { color, font } from '@app/styles';
import {
  AppHeader,
  BarGraph,
  EmptyState,
  ErrorModal,
  LoadingAnimation,
  ServiceTransactionItem,
} from '@app/components';
import { getWeeklySalesRequest } from '@app/services';
import GlobalContext from '@app/context';
import { ERR_NETWORK } from '@app/constant';
import { WaterDropIcon } from '@app/icons';
import { formattedNumber } from '@app/helpers';

const renderSeparator = () => <View style={styles.separator} />;

const Sales = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const [week, setWeek] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [graphData, setGraphData] = useState<DataProps[]>([]);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);

  const fetchWeeklySales = async (start: Date, end: Date) => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getWeeklySalesRequest(user.accessToken, {
      start: format(start, 'yyyy-MM-dd'),
      end: format(end, 'yyyy-MM-dd'),
    });

    if (response.success && response.data) {
      const { transactions: resultTransactions, results } = response.data;
      const graphDataHolder: DataProps[] = results.map((item) => ({
        label: format(item.date, 'E'),
        subLabel: format(item.date, 'd'),
        income: item.gross_income,
        actualIncome: item.gross_income - item.deduction - item.discount,
        expenses: 0,
      }));
      setGraphData(graphDataHolder);
      setTransactions(resultTransactions);
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    } else {
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  useEffect(() => {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const end = endOfWeek(today, { weekStartsOn: 1 });
    setWeek({ start, end });
    fetchWeeklySales(start, end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Sales" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onBack}
        onRetry={() => fetchWeeklySales(week.start, week.end)}
      />
      <View style={styles.content}>
        <Text style={styles.label}>
          This Week's Summary
          <Text style={{ color: color.primary }}>{` (${format(week.start, 'MMM dd')} - ${format(
            week.end,
            'MMM dd',
          )})`}</Text>
        </Text>
        {!screenStatus.isLoading && <BarGraph data={graphData} />}
      </View>
      {!screenStatus.isLoading && (
        <Text
          style={styles.heading}
        >{`Total of ${transactions.length} completed transactions`}</Text>
      )}
      <View style={styles.transactionsContainer}>
        <FlatList
          bounces={false}
          data={transactions}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TransactionDetails', {
                  transactionId: item.transaction_id,
                  transactionServiceId: item.id,
                })
              }
            >
              <ServiceTransactionItem
                icon={<WaterDropIcon />}
                serviceName={item.service_name}
                price={formattedNumber(item.price)}
                date={format(new Date(item.date), 'dd MMM, hh:mm a')}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString() + item.transaction_id.toString()}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={<EmptyState />}
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
  label: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#696969',
    marginVertical: 16,
  },
  content: {
    paddingHorizontal: 25,
  },
  transactionsContainer: {
    gap: 24,
    marginTop: 24,
    flex: 1,
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: color.background,
  },
  separator: {
    marginTop: 24,
  },
  heading: {
    ...font.regular,
    fontSize: 16,
    color: '#696969',
    lineHeight: 16,
    marginHorizontal: 25,
    marginTop: 15,
  },
});

export default Sales;
