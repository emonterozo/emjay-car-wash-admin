import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';

import { NavigationProp, TransactionComputationRouteProp } from '../../types/navigation/types';
import {
  Employees,
  ScreenStatusProps,
  TransactionItem,
  TransactionSummary,
} from '../../types/services/types';
import { ModalDropdownOption } from '../../components/ModalDropdown/ModalDropdown';
import { color, font } from '@app/styles';
import {
  AppHeader,
  EmptyState,
  ErrorModal,
  LoadingAnimation,
  ModalDropdown,
  ServiceTransactionItem,
} from '@app/components';
import { formattedNumber } from '@app/helpers';
import { WaterDropIcon } from '@app/icons';
import { getEmployeesRequest, getTransactionsRequest } from '@app/services';
import GlobalContext from '@app/context';
import { ERR_NETWORK, IMAGES, LIMIT } from '@app/constant';

const renderSeparator = () => <View style={styles.separator} />;

const ICON_GENDER = [
  {
    id: '1',
    icon: Image.resolveAssetSource(IMAGES.AVATAR_BOY).uri,
    label: 'MALE',
  },
  {
    id: '2',
    icon: Image.resolveAssetSource(IMAGES.AVATAR_GIRL).uri,
    label: 'FEMALE',
  },
];

const TransactionComputation = () => {
  const { user } = useContext(GlobalContext);
  const { startDate, endDate } = useRoute<TransactionComputationRouteProp>().params;
  const navigation = useNavigation<NavigationProp>();

  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [employees, setEmployees] = useState<Employees[]>([]);
  const [employeeSelection, setEmployeeSelection] = useState<ModalDropdownOption[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [summary, setSummary] = useState<TransactionSummary | undefined>(undefined);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const fetchEmployees = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getEmployeesRequest(user.accessToken, '_id', 'asc', LIMIT, 0);

    if (response.success && response.data) {
      setEmployees(response.data.employees);
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    } else {
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  const fetchTransactions = async (selected: string[]) => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getTransactionsRequest(
      user.accessToken,
      {
        start: startDate,
        end: endDate,
      },
      selected,
    );

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
    const filteredEmployees = employees
      .filter((employee) => employee.employee_status === 'ACTIVE')
      .map((employee) => {
        return {
          id: employee._id,
          image: employee.gender === 'MALE' ? ICON_GENDER[0].icon : ICON_GENDER[1].icon,
          title: `${employee.first_name} ${employee.last_name}`,
          description: employee.employee_title,
          value: employee._id,
        };
      });

    setEmployeeSelection(filteredEmployees);
  }, [employees]);

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onRetry = () => {
    if (employees.length > 0) {
      fetchTransactions(selectedEmployees);
    } else {
      fetchEmployees();
    }
  };

  const toggleOption = () => setIsOptionOpen(!isOptionOpen);

  const getHeadingTitle = () => {
    const firstNames = employeeSelection
      .filter((option) => selectedEmployees.includes(option.id))
      .map((option) => option.title.split(' ')[0])
      .join(', ');

    return selectedEmployees.length > 0
      ? `${firstNames.replace(/, ([^,]*)$/, ' & $1')} Service Transactions`
      : 'Please select an employee';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Computation" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={onRetry}
      />

      <View style={styles.content}>
        <ModalDropdown
          isVisible={isOptionOpen}
          onCancel={toggleOption}
          selected={selectedEmployees}
          options={employeeSelection}
          onSelected={(selected) => {
            toggleOption();
            setSelectedEmployees(selected);
            if (selected.length > 0) {
              fetchTransactions(selected);
            } else {
              setSummary(undefined);
              setTransactions([]);
            }
          }}
          multiSelect={true}
          title="Select Employee"
          imageColorBackground="#46A6FF"
        />
        <TouchableOpacity style={styles.selection} onPress={toggleOption}>
          <Text style={[styles.heading, styles.topContent]}>{getHeadingTitle()}</Text>
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
  selection: {
    marginBottom: 7,
  },
  topContent: {
    marginVertical: 16,
    color: color.primary,
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

export default TransactionComputation;
