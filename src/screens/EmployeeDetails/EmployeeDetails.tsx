import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { format } from 'date-fns';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { EmployeeDetailsRouteProp, NavigationProp } from 'src/types/navigation/types';
import {
  AppHeader,
  EmptyState,
  ErrorModal,
  LoadingAnimation,
  ServiceTransactionItem,
} from '@app/components';
import { color, font } from '@app/styles';
import { EditIcon, WaterDropIcon } from '@app/icons';
import { getEmployeeInformationRequest } from '@app/services';
import GlobalContext from '@app/context';
import {
  EmployeeInformation,
  RecentTransaction,
  ScreenStatusProps,
} from 'src/types/services/types';
import { formattedNumber } from '@app/helpers';
import { ERR_NETWORK, IMAGES } from '@app/constant';

const isField = 'Employee Status';
const isFieldValue = 'ACTIVE';

const EmployeeDetails = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const { id } = useRoute<EmployeeDetailsRouteProp>().params;
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [employeeInformation, setEmployeeInformation] = useState<EmployeeInformation | undefined>(
    undefined,
  );
  const [transactions, setTransactions] = useState<RecentTransaction[]>([]);
  const isFocused = useIsFocused();

  const employeeDetails = employeeInformation
    ? [
        {
          label: 'Full Name',
          value: `${employeeInformation.first_name} ${employeeInformation.last_name}`,
        },
        {
          label: 'Date of Birth',
          value: format(new Date(employeeInformation.birth_date), 'MMMM dd, yyyy'),
        },
        { label: 'Contact number', value: `${employeeInformation.contact_number}` },
        {
          label: 'Employee Title',
          value: `${employeeInformation.employee_title}`,
        },
        {
          label: 'Employee Status',
          value: `${employeeInformation.employee_status}`,
        },
        {
          label: 'Date Started',
          value: format(new Date(employeeInformation.date_started), 'MMMM dd, yyyy'),
        },
      ]
    : [
        {
          label: 'Full Name',
          value: 'No available record',
        },
        {
          label: 'Date of Birth',
          value: 'No available record',
        },
        {
          label: 'Contact number',
          value: 'No available record',
        },
        {
          label: 'Employee Title',
          value: 'No available record',
        },
        {
          label: 'Date Started',
          value: 'No available record',
        },
      ];

  const handleUpdateEmployee = () => {
    if (!employeeInformation) {
      return;
    }
    navigation.navigate('EmployeeForm', {
      type: 'Update',
      employee: {
        id: id,
        firstName: employeeInformation.first_name,
        lastName: employeeInformation.last_name,
        birthDate: employeeInformation.birth_date,
        gender: employeeInformation.gender,
        contactNumber: employeeInformation.contact_number,
        employeeStatus: employeeInformation.employee_title,
        employeeTitle: employeeInformation.employee_status,
        dateStarted: employeeInformation.date_started,
      },
    });
  };

  useEffect(() => {
    if (isFocused) {
      fetchEmployeeDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const fetchEmployeeDetails = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getEmployeeInformationRequest(user.accessToken, id);

    if (response.success && response.data) {
      const { employee } = response.data;
      setEmployeeInformation(employee);
      setTransactions(employee.recent_transactions);
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    } else {
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  const getTextStyle = (label: string, value: string) => {
    if (label === isField) {
      return value === isFieldValue ? styles.textGreen : styles.textRed;
    }
    return styles.textBlack;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Employee Details" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchEmployeeDetails}
      />
      <View style={styles.heading}>
        <Text style={styles.employeeDetails}>Employee Details</Text>
        <TouchableOpacity onPress={handleUpdateEmployee}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <ScrollView bounces={false}>
        <Image
          source={employeeInformation?.gender === 'MALE' ? IMAGES.AVATAR_BOY : IMAGES.AVATAR_GIRL}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={[styles.textTitle, styles.horizontalSeparatorMarginBottom21]}>
          Personal Information
        </Text>
        <View style={styles.personalInformationContainer}>
          {employeeDetails.map((item, index) => (
            <Text key={index} style={[styles.textPersonalDetails, styles.textGray]}>
              {item.label}:<Text style={getTextStyle(item.label, item.value)}> {item.value}</Text>
            </Text>
          ))}
        </View>
        <View style={[styles.horizontalSeparator, styles.horizontalSeparatorMarginBottom]} />
        <Text style={[styles.textTitle, styles.horizontalSeparatorMarginBottom]}>
          Previous 7 Days Transactions
        </Text>
        <View style={styles.transactionsContainer}>
          {transactions.length === 0 ? (
            <View style={styles.emptyState}>
              <EmptyState />
            </View>
          ) : (
            transactions.map((item) => (
              <ServiceTransactionItem
                key={item.id}
                icon={<WaterDropIcon />}
                serviceName={item.service_name}
                price={formattedNumber(item.price)}
                date={format(new Date(item.date), 'dd MMM yy, hh:mm a')}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 35,
    paddingHorizontal: 25,
  },
  employeeDetails: {
    ...font.regular,
    fontSize: 16,
    color: '#696969',
    lineHeight: 16,
  },
  textTitle: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#888888',
    paddingHorizontal: 25,
  },
  horizontalSeparatorMarginBottom21: {
    marginBottom: 21,
  },
  personalInformationContainer: {
    paddingHorizontal: 25,
    gap: 12,
  },
  textPersonalDetails: {
    ...font.regular,
    fontSize: 20,
    lineHeight: 20,
  },
  textGray: {
    color: '#888888',
  },
  textBlack: {
    color: color.black,
  },
  textGreen: {
    color: '#4BB543',
  },
  textRed: {
    color: '#FF7070',
  },
  horizontalSeparator: {
    marginVertical: 25,
    height: 2,
    backgroundColor: '#B0B0B0',
    width: Dimensions.get('window').width - 48,
    alignSelf: 'center',
  },
  horizontalSeparatorMarginBottom: {
    marginBottom: 24,
  },
  transactionsContainer: {
    gap: 24,
    marginBottom: 10,
  },
  emptyState: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  image: {
    width: 187,
    height: 187,
    alignSelf: 'center',
    marginTop: 41,
    marginBottom: 41,
  },
});

export default EmployeeDetails;
