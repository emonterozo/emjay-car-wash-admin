import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationProp } from '../../types/navigation/types';
import { ScreenStatusProps, TransactionItem, TransactionSummary } from '../../types/services/types';
import { color, font } from '@app/styles';
import {
  AppHeader,
  CalendarPicker,
  EmptyState,
  ErrorModal,
  FloatingActionButton,
  LoadingAnimation,
  ServiceTransactionItem,
} from '@app/components';
import {
  formattedNumber,
  getCurrentDateAtMidnightUTC,
  getMinimumDateAtMidnightUTC,
} from '@app/helpers';
import { CalculatorIcon, CalendarIcon, WaterDropIcon } from '@app/icons';
import { getTransactionsRequest } from '@app/services';
import GlobalContext from '@app/context';
import { ERR_NETWORK } from '@app/constant';
import { useNativeBackHandler } from '@app/hooks';

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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchTransactions = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getTransactionsRequest(user.accessToken, user.refreshToken, {
      start: format(selectedDate, 'yyyy-MM-dd'),
      end: format(selectedDate, 'yyyy-MM-dd'),
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
  }, [isFocused, selectedDate]);

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

  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  const onSelectedDate = (date: Date) => {
    toggleCalendar();
    setTimeout(() => {
      setSelectedDate(date);
    }, 500);
  };

  const onBack = () => {
    navigation.goBack();
    setSelectedDate(new Date());
  };

  useNativeBackHandler(() => {
    onBack();
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Records" onBack={onBack} />
      <LoadingAnimation isLoading={screenStatus.isLoading} type="modal" />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchTransactions}
      />
      <View style={styles.headingContainer}>
        <Text style={styles.label}>Record Lists</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.headerContainer} onPress={toggleCalendar}>
          <CalendarIcon width={25} height={25} fill={color.primary} />
          <Text style={[styles.heading, styles.topContent]}>{`${format(
            selectedDate,
            'MMMM dd, yyyy',
          )} Summary`}</Text>
        </TouchableOpacity>
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
        <CalendarPicker
          date={selectedDate}
          isVisible={isCalendarOpen}
          onSelectedDate={onSelectedDate}
          onClose={toggleCalendar}
          maxDate={getCurrentDateAtMidnightUTC()}
          minDate={getMinimumDateAtMidnightUTC()}
        />
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
                  transactionServiceId: item.transaction_availed_service_id,
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
          keyExtractor={(item) => item.transaction_availed_service_id.toString()}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={<EmptyState />}
        />
      </View>
      <FloatingActionButton
        fabIcon={<CalculatorIcon width={32} height={32} fill="#ffffff" />}
        onPress={() =>
          navigation.navigate('TransactionComputation', {
            startDate: format(selectedDate, 'yyyy-MM-dd'),
            endDate: format(selectedDate, 'yyyy-MM-dd'),
          })
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 25,
  },
  label: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#696969',
  },
  content: {
    paddingHorizontal: 25,
  },
  topContent: {
    marginVertical: 16,
    color: color.primary,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 3,
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
