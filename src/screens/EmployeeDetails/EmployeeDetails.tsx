import React, { useState } from 'react';
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

import { AppHeader, EmptyState, ServiceTransactionItem } from '@app/components';
import { color, font } from '@app/styles';
import { EditIcon, WaterDropIcon } from '@app/icons';
import { RecentTransaction } from 'src/types/services/types';
import { formattedNumber } from '@app/helpers';
import { IMAGES } from '@app/constant';
import { NavigationProp } from 'src/types/navigation/types';
import { useNavigation } from '@react-navigation/native';

type EmployeeInformationProps = {
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: Date;
  contact_number: string;
  title: string;
  status: string;
  date_started: Date;
};

const employeeInformation: EmployeeInformationProps = {
  first_name: 'Dona',
  last_name: 'Mo',
  gender: 'FEMALE',
  date_of_birth: new Date('2000-12-23T08:00:00.000Z'),
  contact_number: '09876543210',
  title: 'Car Wash Attendant',
  status: 'Terminated',
  date_started: new Date('2024-12-23T08:00:00.000Z'),
};

const employeeDetails = employeeInformation
  ? [
      {
        label: 'Full Name',
        value: `${employeeInformation.first_name} ${employeeInformation.last_name}`,
      },
      {
        label: 'Date of Birth',
        value: format(new Date(employeeInformation.date_of_birth), 'MMMM dd, yyyy'),
      },
      { label: 'Contact number', value: `${employeeInformation.contact_number}` },
      {
        label: 'Employee Title',
        value: `${employeeInformation.title}`,
      },
      {
        label: 'Employee Status',
        value: `${employeeInformation.status}`,
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

const EmployeeDetails = () => {
  const navigation = useNavigation<NavigationProp>();
  const [transactions] = useState<RecentTransaction[]>([]);
  const isField = 'Employee Status';
  const isFieldValue = 'Active';

  const handleUpdateEmployee = () => {
    navigation.navigate('EmployeeForm', {
      type: 'Update',
      user: {
        id: '123',
        first_name: employeeInformation.first_name,
        last_name: employeeInformation.last_name,
        birth_date: employeeInformation.date_of_birth.toISOString(),
        gender: employeeInformation.gender,
        contact_number: employeeInformation.contact_number,
        employee_title: employeeInformation.title,
        employee_status: employeeInformation.status,
        date_started: employeeInformation.date_started.toISOString(),
      },
    });
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
