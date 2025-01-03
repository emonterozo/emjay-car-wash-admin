import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

import { AppHeader, ServiceTransactionItem } from '@app/components';
import { color, font } from '@app/styles';
import { CarIcon, MotorcycleIcon, WaterDropIcon } from '@app/icons';
import SizeDisplay from './SizeDisplay';
import { useRoute } from '@react-navigation/native';
import { CustomerDetailsRouteProp } from '../../types/navigation/types';

const OPTIONS = [
  {
    key: 'car',
    active: <CarIcon fill={color.primary} />,
    inactive: <CarIcon fill="#888888" />,
  },
  {
    key: 'motorcycle',
    active: <MotorcycleIcon fill={color.primary} />,
    inactive: <MotorcycleIcon fill="#888888" />,
  },
];

const size = {
  car: ['S', 'MD', 'LG', 'XL', 'XXL'],
  motorcycle: ['S', 'MD', 'LG'],
};

const value = {
  car: [0, 10, 5, 3, 2],
  motorcycle: [10, 10, 3],
};



const CustomerDetails = () => {
  const { id } = useRoute<CustomerDetailsRouteProp>().params;
  const [selectedVehicle, setSelectedVehicle] = useState('car');
  const servicesData = [
    { icon: <WaterDropIcon />, serviceName: 'Car Wash', price: 'P3000', date: '20 Dec 24, 5:00' },
    { icon: <WaterDropIcon />, serviceName: 'Oil Change', price: 'P1500', date: '22 Dec 24, 2:00' },
    {
      icon: <WaterDropIcon />,
      serviceName: 'Tire Replacement',
      price: 'P5000',
      date: '25 Dec 24, 11:00',
    },
    {
      icon: <WaterDropIcon />,
      serviceName: 'Tire Replacement',
      price: 'P5000',
      date: '25 Dec 24, 11:00',
    },
    {
      icon: <WaterDropIcon />,
      serviceName: 'Tire Replacement',
      price: 'P5000',
      date: '25 Dec 24, 11:00',
    },
    {
      icon: <WaterDropIcon />,
      serviceName: 'Tire Replacement',
      price: 'P5000',
      date: '25 Dec 24, 11:00',
    },
    {
      icon: <WaterDropIcon />,
      serviceName: 'Tire Replacement',
      price: 'P5000',
      date: '25 Dec 24, 11:00',
    },
  ];

  const handleSelectVehicle = (vehicle: string) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Customer" />
      <Text style={[styles.heading, styles.textCustomerDetails]}>Customer Details</Text>
      <ScrollView bounces={false}>
        <Text style={[styles.textTitle, styles.horizontalSeparatorMarginBottom21]}>
          Personal Information
        </Text>
        <View style={styles.personalInformationContainer}>
          <Text style={[styles.textPersonalDetails, styles.textGray]}>
            Full Name:
            <Text style={[styles.textBlack]}> John Smith</Text>
          </Text>
          <Text style={[styles.textPersonalDetails, styles.textGray]}>
            Date of Birth:
            <Text style={[styles.textBlack]}> May 20, 2003</Text>
          </Text>
          <Text style={[styles.textPersonalDetails, styles.textGray]}>
            Contact number:
            <Text style={[styles.textBlack]}> 09876543210</Text>
          </Text>
          <Text style={[styles.textPersonalDetails, styles.textGray]}>
            Address:
            <Text style={[styles.textBlack]}> No available data</Text>
          </Text>
          <Text style={[styles.textPersonalDetails, styles.textGray]}>
            Registration Date:
            <Text style={[styles.textBlack]}> November 21, 2024</Text>
          </Text>
        </View>
        <View style={styles.horizontalSeparator} />
        <Text style={[styles.textTitle, styles.horizontalSeparatorMarginBottom]}>
          {`${selectedVehicle === 'car' ? 'Car' : 'Motorcycle'} Wash Services Count`}
        </Text>
        <View style={styles.cardContainer}>
          {OPTIONS.map((option) => (
            <TouchableOpacity
              style={[
                styles.card,
                option.key === selectedVehicle && { shadowColor: color.primary },
              ]}
              key={option.key}
              onPress={() => handleSelectVehicle(option.key)}
            >
              {option.key === selectedVehicle ? option.active : option.inactive}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.countContainer}>
          {selectedVehicle === 'car' && <SizeDisplay sizes={size.car} values={value.car} />}
          {selectedVehicle === 'motorcycle' && (
            <SizeDisplay sizes={size.motorcycle} values={value.motorcycle} />
          )}
        </View>
        <View style={[styles.horizontalSeparator, styles.horizontalSeparatorMarginBottom]} />
        <Text style={[styles.textTitle, styles.horizontalSeparatorMarginBottom]}>
          Previous 7 Days Transactions
        </Text>
        <View style={styles.transactionsContainer}>
          {servicesData.map((service, index) => (
            <ServiceTransactionItem
              key={index}
              icon={<WaterDropIcon />}
              serviceName={service.serviceName}
              price={service.price}
              date={service.date}
            />
          ))}
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
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 35,
    paddingHorizontal: 25,
  },
  textCustomerDetails: {
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
  personalInformationContainer: {
    paddingHorizontal: 25,
    gap: 12,
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
  horizontalSeparatorMarginBottom21: {
    marginBottom: 21,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 25,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#F3F2EF',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    padding: 35,
    justifyContent: 'center',
    height: 120,
  },
  countContainer: {
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 16,
  },
  transactionsContainer: {
    gap: 24,
  },
});

export default CustomerDetails;
