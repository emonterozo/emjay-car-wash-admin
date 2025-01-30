import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, ScrollView } from 'react-native';
import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';

import { NavigationProp, TransactionDetailsRouteProp } from '../../types/navigation/types';
import {
  ScreenStatusProps,
  TransactionDetailsResponse,
  TransactionServiceEmployee,
} from '../../types/services/types';
import { SizeKey } from '../../types/constant/types';
import { color, font } from '@app/styles';
import { AppHeader, ErrorModal, LoadingAnimation } from '@app/components';
import { formattedNumber } from '@app/helpers';
import { getTransactionDetailsRequest } from '@app/services';
import GlobalContext from '@app/context';
import { ERR_NETWORK, IMAGES, NO_DATA, SIZE_DESCRIPTION } from '@app/constant';

const TransactionDetails = () => {
  const { user } = useContext(GlobalContext);
  const { transactionId, transactionServiceId } = useRoute<TransactionDetailsRouteProp>().params;
  const navigation = useNavigation<NavigationProp>();

  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [customerInformation, setCustomerInformation] = useState<
    | Pick<
        TransactionDetailsResponse['transaction'],
        'first_name' | 'last_name' | 'vehicle_type' | 'vehicle_size' | 'model' | 'plate_number'
      >
    | undefined
  >(undefined);
  const [transaction, setTransaction] = useState<
    | Pick<
        TransactionDetailsResponse['transaction'],
        | 'title'
        | 'deduction'
        | 'discount'
        | 'company_earnings'
        | 'employee_share'
        | 'start_date'
        | 'end_date'
        | 'price'
      >
    | undefined
  >(undefined);
  const [employees, setEmployees] = useState<TransactionServiceEmployee[]>([]);

  const fetchTransactions = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getTransactionDetailsRequest(
      user.accessToken,
      transactionId,
      transactionServiceId,
    );

    if (response.success && response.data) {
      const {
        first_name,
        last_name,
        vehicle_type,
        vehicle_size,
        model,
        plate_number,
        price,
        title,
        deduction,
        discount,
        company_earnings,
        employee_share,
        start_date,
        end_date,
        assigned_employees,
      } = response.data.transaction;
      setCustomerInformation({
        first_name,
        last_name,
        vehicle_type,
        vehicle_size,
        model,
        plate_number,
      });
      setTransaction({
        price,
        title,
        deduction,
        discount,
        company_earnings,
        employee_share,
        start_date,
        end_date,
      });
      setEmployees(assigned_employees);
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
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customerDetails = customerInformation
    ? [
        {
          label: 'Full Name',
          value: `${customerInformation.first_name} ${customerInformation.last_name}`,
        },
        {
          label: 'Vehicle Type',
          value:
            customerInformation.vehicle_type.charAt(0).toUpperCase() +
            customerInformation.vehicle_type.slice(1),
        },
        {
          label: 'Vehicle Size',
          value: SIZE_DESCRIPTION[customerInformation.vehicle_size as SizeKey],
        },
        { label: 'Model', value: customerInformation.model },
        { label: 'Plate Number', value: customerInformation.plate_number },
      ]
    : [
        {
          label: 'Full Name',
          value: NO_DATA,
        },
        { label: 'Vehicle Type', value: NO_DATA },
        { label: 'Vehicle Size', value: NO_DATA },
        { label: 'Model', value: NO_DATA },
        { label: 'Plate Number', value: NO_DATA },
      ];

  const transactionDetails = transaction
    ? [
        {
          label: 'Service',
          value: transaction.title,
        },
        {
          label: 'Price',
          value: formattedNumber(transaction.price),
        },
        {
          label: 'Deduction',
          value: formattedNumber(transaction.deduction),
        },
        {
          label: 'Discount',
          value: formattedNumber(transaction.discount),
        },
        { label: 'Company Earnings', value: formattedNumber(transaction.company_earnings) },
        {
          label: 'Employee Share',
          value: formattedNumber(transaction.employee_share),
        },

        {
          label: 'Start Date & Time',
          value:
            transaction.start_date !== null
              ? format(new Date(transaction.start_date!), 'dd MMM, hh:mm a')
              : NO_DATA,
        },
        {
          label: 'End Date & Time',
          value:
            transaction.end_date !== null
              ? format(new Date(transaction.end_date!), 'dd MMM, hh:mm a')
              : NO_DATA,
        },
      ]
    : [
        {
          label: 'Service',
          value: NO_DATA,
        },
        {
          label: 'Price',
          value: NO_DATA,
        },
        {
          label: 'Deduction',
          value: NO_DATA,
        },
        {
          label: 'Discount',
          value: NO_DATA,
        },
        { label: 'Company Earnings', value: NO_DATA },
        {
          label: 'Employee Share',
          value: NO_DATA,
        },
        {
          label: 'Start Date & Time',
          value: NO_DATA,
        },
        {
          label: 'End Date & Time',
          value: NO_DATA,
        },
      ];

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Record Details" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchTransactions}
      />
      <ScrollView bounces={false}>
        <View style={styles.content}>
          <Text style={[styles.heading, styles.topContent]}>Customer details</Text>
          <View style={styles.infoContainer}>
            {customerDetails.map((item, index) => (
              <Text key={index} style={styles.text}>
                {item.label}:<Text style={[styles.textBlack]}> {item.value}</Text>
              </Text>
            ))}
          </View>
          <View style={styles.horizontalSeparator} />
          <Text style={[styles.heading, styles.topContent]}>Service details</Text>
          <View style={styles.infoContainer}>
            {transactionDetails.map((item, index) => (
              <Text key={index} style={styles.text}>
                {item.label}:<Text style={[styles.textBlack]}> {item.value}</Text>
              </Text>
            ))}
          </View>
          <View style={styles.horizontalSeparator} />
          <Text style={[styles.heading, styles.topContent]}>Assigned employees</Text>
        </View>
        <View style={styles.transactionsContainer}>
          {employees.map((employee) => (
            <View key={employee.id} style={styles.row}>
              <Image
                source={employee.gender === 'MALE' ? IMAGES.AVATAR_BOY : IMAGES.AVATAR_GIRL}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.employee}>{`${employee.first_name} ${employee.last_name}`}</Text>
            </View>
          ))}
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
  topContent: {
    marginVertical: 16,
  },
  heading: {
    ...font.regular,
    fontSize: 20,
    lineHeight: 20,
    color: color.black,
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
    marginTop: 16,
    height: 2,
    backgroundColor: '#B0B0B0',
    width: '100%',
    alignSelf: 'center',
  },
  transactionsContainer: {
    gap: 24,
    marginBottom: 24,
    paddingHorizontal: 25,
    flex: 1,
  },
  employee: {
    ...font.regular,
    fontSize: 20,
    lineHeight: 20,
    color: color.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: 56,
    height: 56,
  },
});

export default TransactionDetails;
