import {
  ActivityIndicator,
  AppHeader,
  CalendarPicker,
  EmptyState,
  ErrorModal,
  FloatingActionButton,
  LoadingAnimation,
  MaterialCommunityIcon,
} from '@app/components';
import { ERR_NETWORK, IMAGES, LIMIT } from '@app/constant';
import GlobalContext from '@app/context';
import { getCurrentDateAtMidnightUTC } from '@app/helpers';
import { getExpenseItemsRequest } from '@app/services';
import { color, font } from '@app/styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationProp } from 'src/types/navigation/types';
import { ExpenseItem, ScreenStatusProps } from 'src/types/services/types';

const currentDate = getCurrentDateAtMidnightUTC();
const renderSeparator = () => <View style={styles.separator} />;

const CATEGORY_ICONS: { [key: string]: JSX.Element } = {
  manpower: <Image source={IMAGES.MAN_POWER} resizeMode="contain" />,
  electricity: <Image source={IMAGES.ELECTRICITY} resizeMode="contain" />,
  rent: <Image source={IMAGES.RENT} resizeMode="contain" />,
  consumables: <Image source={IMAGES.CONSUMABLES_OTHER} resizeMode="contain" />,
  others: <Image source={IMAGES.OTHER} resizeMode="contain" />,
};

const Expenses = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [totalCount, setTotalCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [shouldFetchItems, setShouldFetchItems] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const formattedDate = selectedDate
    ? format(selectedDate, 'MMM dd yyyy')
    : format(currentDate, 'MMM dd yyyy');
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const maxDate = new Date();
  const minDate = new Date(2023, 0, 1);

  const isFocused = useIsFocused();

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  const renderCardItem = ({ item }: { item: ExpenseItem }) => {
    const IconComponent = CATEGORY_ICONS[item.category.toLowerCase()] || (
      <Image source={IMAGES.OTHER} resizeMode="contain" />
    );
    return (
      <View style={styles.card}>
        {IconComponent}
        <View style={[styles.middleSection, styles.textContainer]}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={[styles.description, styles.text]}>{item.description}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.amount, styles.text, styles.textRight]}>
            ₱{item.amount.toLocaleString()}
          </Text>
          <Text style={[styles.date, styles.text, styles.textRight]}>
            {format(new Date(item.date), 'MMM dd, yyyy')}
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (isFocused || shouldFetchItems) {
      fetchExpenseItems();
      setShouldFetchItems(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, shouldFetchItems]);

  useEffect(() => {
    if (selectedDate) {
      fetchExpenseItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const fetchExpenseItems = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getExpenseItemsRequest(user.accessToken, 'date', 'desc', LIMIT, 0, {
      start: formattedDate,
      end: formattedDate,
    });

    if (response.success && response.data) {
      setExpenses(response.data.expenses);
      setTotalCount(response.data.totalCount);
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    } else {
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  const handleAddExpenseItem = () => {
    navigation.navigate('ExpensesForm');
  };

  const handleCalendarChange = (date: Date) => {
    setSelectedDate(date);
    setCalendarVisible(false);
  };

  const getDateValue = () => {
    return selectedDate ? format(new Date(selectedDate), 'MMM dd, yyyy') : formattedDate;
  };

  const onClose = () => {
    setCalendarVisible(false);
  };

  const onEndReached = async () => {
    if (isFetching || expenses.length >= totalCount) {
      return;
    }

    setIsFetching(true);
    const response = await getExpenseItemsRequest(user.accessToken, 'date', 'desc', LIMIT, 0, {
      start: formattedDate,
      end: formattedDate,
    });

    if (response.success && response.data) {
      setExpenses((prev) => [...prev, ...response.data?.expenses!]);
      setTotalCount(response.data.totalCount);
    }
    setIsFetching(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader
        title="Expenses"
        leftContent={
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <View style={styles.leftContent}>
              <Text style={styles.filter_date}>{getDateValue()}</Text>
              <MaterialCommunityIcon name={'chevron-down'} color="#888888" size={20} />
            </View>
          </TouchableOpacity>
        }
      />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchExpenseItems}
      />
      <View style={styles.heading}>
        <Text style={styles.label}>Expenses</Text>
      </View>

      {expenses.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={expenses}
          renderItem={renderCardItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={renderSeparator}
          onEndReached={onEndReached}
          ListFooterComponent={<ActivityIndicator isLoading={isFetching} />}
        />
      )}
      {isCalendarVisible && (
        <CalendarPicker
          date={selectedDate || currentDate}
          isVisible={isCalendarVisible}
          onSelectedDate={(date) => handleCalendarChange(date)}
          onClose={onClose}
          maxDate={maxDate}
          minDate={minDate}
        />
      )}

      <FloatingActionButton onPress={handleAddExpenseItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#F3F2EF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CECECE',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 25,
  },
  label: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#696969',
  },
  middleSection: {
    flex: 2,
    justifyContent: 'center',
  },
  category: {
    fontSize: 20,
    lineHeight: 20,
    ...font.regular,
    color: color.black,
  },
  description: {
    color: '#888888',
  },
  amount: {
    color: '#4BB543',
  },
  date: {
    color: '#888888',
  },
  filter_date: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: color.black,
  },
  text: {
    fontSize: 13,
    lineHeight: 13,
    ...font.regular,
  },
  textContainer: {
    gap: 8,
  },
  textRight: {
    textAlign: 'right',
  },
  separator: {
    marginTop: 10,
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: color.background,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    padding: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#CECECE',
    gap: 10,
  },
});

export default Expenses;
