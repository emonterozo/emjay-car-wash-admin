import React, { useContext, useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { format, startOfMonth } from 'date-fns';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import { NavigationProp } from '../../types/navigation/types';
import { ExpenseItem, ScreenStatusProps } from '../../types/services/types';
import {
  AppHeader,
  CalendarPicker,
  EmptyState,
  ErrorModal,
  FloatingActionButton,
  LoadingAnimation,
  MaterialCommunityIcon,
} from '@app/components';
import { ERR_NETWORK, IMAGES } from '@app/constant';
import GlobalContext from '@app/context';
import {
  formattedNumber,
  getCurrentDateAtMidnightUTC,
  getMinimumDateAtMidnightUTC,
} from '@app/helpers';
import { getExpenseItemsRequest } from '@app/services';
import { color, font } from '@app/styles';

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

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
          <Text style={styles.category}>
            {item.category.charAt(0) + item.category.slice(1).toLowerCase()}
          </Text>
          <Text style={[styles.description, styles.text]}>{item.description}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.amount, styles.text, styles.textRight]}>
            {formattedNumber(item.amount)}
          </Text>
          <Text style={[styles.date, styles.text, styles.textRight]}>
            {format(new Date(item.date), 'MMM dd, yyyy')}
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (isFocused) {
      fetchExpenseItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, selectedDate]);

  const fetchExpenseItems = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getExpenseItemsRequest(
      user.accessToken,
      user.refreshToken,
      'date',
      'desc',
      undefined,
      undefined,
      {
        start: format(startOfMonth(selectedDate), 'yyyy-MM-dd'),
        end: format(selectedDate, 'yyyy-MM-dd'),
      },
    );

    if (response.success && response.data) {
      setExpenses(response.data.expenses);
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

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleCalendarChange = (date: Date) => {
    setSelectedDate(date);
    toggleCalendar();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader
        title="Expenses"
        leftContent={
          <TouchableOpacity style={styles.leftContent} onPress={toggleCalendar}>
            <Text style={styles.filterDate}>{format(selectedDate, 'MMMM dd, yyyy')}</Text>
            <MaterialCommunityIcon
              name={isCalendarVisible ? 'chevron-up' : 'chevron-down'}
              color="#888888"
              size={20}
            />
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
        <Text style={styles.label}>Expenses Lists</Text>
      </View>
      <FlatList
        data={expenses}
        renderItem={renderCardItem}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={<EmptyState />}
      />
      {isCalendarVisible && (
        <CalendarPicker
          date={selectedDate}
          isVisible={isCalendarVisible}
          onSelectedDate={handleCalendarChange}
          onClose={toggleCalendar}
          maxDate={getCurrentDateAtMidnightUTC()}
          minDate={getMinimumDateAtMidnightUTC()}
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
  filterDate: {
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
