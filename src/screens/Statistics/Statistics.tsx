import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenStatusProps, StatisticsFilter, TransactionItem } from '../../types/services/types';
import { NavigationProp } from '../../types/navigation/types';
import { DataProps } from '../../components/BarGraph/BarGraph';
import { color, font } from '@app/styles';
import {
  AppHeader,
  BarGraph,
  CalendarPicker,
  EmptyState,
  ErrorModal,
  LoadingAnimation,
  MaterialCommunityIcon,
  ServiceTransactionItem,
} from '@app/components';
import { getSalesStatisticsRequest } from '@app/services';
import GlobalContext from '@app/context';
import { ERR_NETWORK } from '@app/constant';
import { FilterIcon, WaterDropIcon } from '@app/icons';
import {
  formattedNumber,
  getCurrentDateAtMidnightUTC,
  getMinimumDateAtMidnightUTC,
} from '@app/helpers';
import { useMeasure } from '@app/hooks';
import FilterOption from './FilterOption';

const renderSeparator = () => <View style={styles.separator} />;

const OPTIONS = [
  { key: 'daily', label: 'Day' },
  { key: 'weekly', label: 'Week' },
  { key: 'monthly', label: 'Month' },
  { key: 'yearly', label: 'Year' },
];

const Statistics = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [option, setOption] = useState<{
    filter: StatisticsFilter;
    date: Date;
  }>({
    filter: 'daily',
    date: new Date(),
  });
  const [graphData, setGraphData] = useState<DataProps[]>([]);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const touchableRef = useRef<View>(null);
  const { layout, measure } = useMeasure(touchableRef);
  const [isOptionVisible, setIsOptionVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(['Income']);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const showPopover = () => {
    measure();
    setIsOptionVisible(!isOptionVisible);
  };

  const fetchSalesStatistics = async (filter: StatisticsFilter, date: Date) => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getSalesStatisticsRequest(
      user.accessToken,
      user.refreshToken,
      filter,
      format(date, 'yyyy-MM-dd'),
    );

    if (response.success && response.data) {
      const { transactions: resultTransactions, income, expenses } = response.data;
      const mergedData = income.map((item) => {
        const matchingExpense = expenses.find((expense) => item.period === expense.period);

        return {
          ...item,
          expenses: matchingExpense ? matchingExpense.amount : 0,
        };
      });

      const graphDataHolder: DataProps[] = [];
      mergedData.forEach((item, index) => {
        switch (filter) {
          case 'weekly':
            graphDataHolder.push({
              label: format(item.period, 'MMM'),
              subLabel: `W${index + 1}`,
              income: item.company_earnings,
              expenses: item.expenses,
            });
            break;
          case 'monthly':
            graphDataHolder.push({
              label: format(item.period, 'MMM'),
              subLabel: format(item.period, 'yyyy'),
              income: item.company_earnings,
              expenses: item.expenses,
            });
            break;
          case 'yearly':
            graphDataHolder.push({
              label: item.period,
              income: item.company_earnings,
              expenses: item.expenses,
            });
            break;
          default:
            graphDataHolder.push({
              label: format(item.period, 'MMM'),
              subLabel: format(item.period, 'd'),
              income: item.company_earnings,
              expenses: item.expenses,
            });
            break;
        }
      });

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
    fetchSalesStatistics(option.filter, option.date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option.filter, option.date]);

  const onBack = () => {
    navigation.goBack();
  };

  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  const onSelectedDate = (date: Date) => {
    toggleCalendar();
    setTimeout(() => {
      setOption({ ...option, date: date });
    }, 500);
  };

  const filterGraphData = () => {
    if (selectedFilters.length > 1) {
      return graphData;
    } else {
      switch (selectedFilters[0]) {
        case 'Income':
          return graphData.map((item) => ({ ...item, expenses: 0 }));
        default:
          return graphData.map((item) => ({ ...item, income: 0 }));
      }
    }
  };

  const getDisplay = () => {
    return selectedFilters.map((item) => item.toLowerCase()) as ('income' | 'expenses')[];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader
        title="Statistics"
        leftContent={
          <TouchableOpacity style={styles.leftContent} onPress={toggleCalendar}>
            <Text style={styles.date}>{format(option.date, 'MMMM dd, yyyy')}</Text>
            <MaterialCommunityIcon
              name={isCalendarOpen ? 'chevron-up' : 'chevron-down'}
              color="#888888"
              size={20}
            />
          </TouchableOpacity>
        }
      />
      <View>
        <CalendarPicker
          date={option.date}
          isVisible={isCalendarOpen}
          onSelectedDate={onSelectedDate}
          onClose={toggleCalendar}
          maxDate={getCurrentDateAtMidnightUTC()}
          minDate={getMinimumDateAtMidnightUTC()}
        />
      </View>
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onBack}
        onRetry={() => fetchSalesStatistics(option.filter, option.date)}
      />
      <View style={styles.top}>
        <Text style={styles.label}>Statistics Overview</Text>
        <TouchableOpacity ref={touchableRef} style={styles.filterContainer} onPress={showPopover}>
          <FilterIcon />
          <Text style={styles.label}>{selectedFilters.join('/')}</Text>
        </TouchableOpacity>
        {isOptionVisible && (
          <FilterOption
            top={layout?.height! + 5}
            selectedOptions={selectedFilters}
            toggleSelected={(item) => {
              const isSelected = selectedFilters.includes(item);

              if (isSelected && selectedFilters.length === 1) {
                return;
              }

              const holder = isSelected
                ? selectedFilters.filter((i) => i !== item)
                : item === 'Income'
                ? [item, ...selectedFilters]
                : [...selectedFilters, item];

              setSelectedFilters(holder);
              showPopover();
            }}
          />
        )}
      </View>
      <View style={styles.line} />
      <View style={styles.optionContainer}>
        {OPTIONS.map((item) => (
          <TouchableOpacity
            onPress={() => setOption({ ...option, filter: item.key as StatisticsFilter })}
            key={item.key}
            style={[styles.option, option.filter === item.key && styles.optionActive]}
          >
            <Text
              style={[styles.optionText, option.filter === item.key && styles.optionTextActive]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.contentView}>
        <View style={styles.content}>
          {graphData.length > 0 && <BarGraph data={filterGraphData()} display={getDisplay()} />}
        </View>
        <Text style={styles.heading}>Previous 14 Days Transactions</Text>
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
            keyExtractor={(item) =>
              item.transaction_availed_service_id.toString() + item.transaction_id.toString()
            }
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={renderSeparator}
            ListEmptyComponent={<EmptyState />}
          />
        </View>
      </ScrollView>
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
  heading: {
    ...font.regular,
    fontSize: 16,
    color: '#696969',
    lineHeight: 16,
    marginHorizontal: 25,
    marginTop: 15,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 25,
  },
  label: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#696969',
  },
  line: {
    marginVertical: 24,
    marginHorizontal: 25,
    borderTopWidth: 1,
    borderBlockColor: '#DCDCDC',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderBottomWidth: 0.3,
    borderRightWidth: 0.2,
    borderLeftWidth: 0.2,
    borderColor: '#888888',
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  optionText: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
    color: '#888888',
  },
  optionActive: {
    backgroundColor: color.primary,
  },
  optionTextActive: {
    color: color.background,
  },
  filterContainer: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: color.black,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    padding: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#CECECE',
    gap: 3,
  },
  contentView: {
    flexGrow: 1,
  },
});

export default Statistics;
