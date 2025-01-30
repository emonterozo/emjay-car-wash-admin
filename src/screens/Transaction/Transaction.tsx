import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { format } from 'date-fns';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { NavigationProp } from '../../types/navigation/types';
import { ScreenStatusProps, TransactionItem, TransactionSummary } from '../../types/services/types';
import { color, font } from '@app/styles';
import {
  AppHeader,
  EmptyState,
  ErrorModal,
  LoadingAnimation,
  ServiceTransactionItem,
} from '@app/components';
import { formattedNumber } from '@app/helpers';
import { WaterDropIcon } from '@app/icons';
import { getTransactionsRequest } from '@app/services';
import GlobalContext from '@app/context';
import { ERR_NETWORK } from '@app/constant';

const renderSeparator = () => <View style={styles.separator} />;

const Transaction = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [summary, setSummary] = useState<TransactionSummary | undefined>(undefined);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);

  const fetchTransactions = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getTransactionsRequest(user.accessToken, {
      start: format(new Date('2025-01-29'), 'yyyy-MM-dd'),
      end: format(new Date('2025-01-29'), 'yyyy-MM-dd'),
    });

    if (response.success && response.data) {
      setSummary(response.data.summary);
      setTransactions(response.data.transactions);
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
    if (isFocused) {
      fetchTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const summaryDetails = summary
    ? [
        {
          label: 'Gross Income',
          value: formattedNumber(summary.gross_income),
        },
        { label: 'Deductions', value: formattedNumber(summary.deduction) },
        { label: 'Discounts', value: formattedNumber(summary.discount) },
        {
          label: 'Company Earnings',
          value: formattedNumber(summary.company_earnings),
        },
        {
          label: 'Employee Earnings',
          value: formattedNumber(summary.employee_share),
        },
      ]
    : [
        {
          label: 'Gross Income',
          value: formattedNumber(0),
        },
        { label: 'Deductions', value: formattedNumber(0) },
        { label: 'Discounts', value: formattedNumber(0) },
        {
          label: 'Company Earnings',
          value: formattedNumber(0),
        },
        {
          label: 'Employee Earnings',
          value: formattedNumber(0),
        },
      ];

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Records" />
      <LoadingAnimation isLoading={screenStatus.isLoading} type="modal" />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchTransactions}
      />
      <View style={styles.content}>
        <Text style={[styles.heading, styles.topContent]}>January 29, 2025 Summary</Text>
        <View style={styles.infoContainer}>
          {summaryDetails.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item.label}:<Text style={[styles.textBlack]}> {item.value}</Text>
            </Text>
          ))}
        </View>
        <View style={styles.horizontalSeparator} />
        <Text
          style={styles.heading}
        >{`Total of ${transactions.length} completed transactions`}</Text>
      </View>
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
          keyExtractor={(item) => item.id.toString()}
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
  content: {
    paddingHorizontal: 25,
  },
  topContent: {
    marginVertical: 16,
  },
  heading: {
    ...font.regular,
    fontSize: 16,
    color: '#696969',
    lineHeight: 16,
  },
  infoContainer: {
    gap: 12,
  },
  text: {
    ...font.regular,
    fontSize: 20,
    lineHeight: 20,
    color: '#888888',
  },
  textBlack: {
    color: color.black,
  },
  horizontalSeparator: {
    marginVertical: 24,
    height: 2,
    backgroundColor: '#B0B0B0',
    width: '100%',
    alignSelf: 'center',
  },
  transactionsContainer: {
    gap: 24,
    marginTop: 24,
    flex: 1,
  },
  list: {
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: color.background,
  },
  separator: {
    marginTop: 24,
  },
});

export default Transaction;
