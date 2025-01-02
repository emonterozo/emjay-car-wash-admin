import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { AppHeader, ServiceTransactionItem } from '@app/components';
import { color, font } from '@app/styles';
import {
  CarSelectedIcon,
  CarUnselectedIcon,
  MotorcycleSelectedIcon,
  MotorcycleUnselectedIcon,
  WaterDropIcon,
} from '@app/icons';
import { ScrollView } from 'react-native-gesture-handler';

const CustomerDetails = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('car'); // 'car' is the default
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

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle); // Update selected vehicle
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Customer" />
      <Text style={[styles.heading, styles.textCustomerDetails]}>Customer Details</Text>
      <ScrollView>
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
            <Text style={[styles.textBlack]}> Blk 31 Lot 18 HH2, Marilao, Bulacan.</Text>
          </Text>
          <Text style={[styles.textPersonalDetails, styles.textGray]}>
            Registration Date:
            <Text style={[styles.textBlack]}> November 21, 2024</Text>
          </Text>
        </View>

        <View style={styles.horizontalSeparator} />

        <Text style={[styles.textTitle, styles.horizontalSeparatorMarginBottom]}>
          Car Wash Services Count
        </Text>

        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => handleSelectVehicle('car')}>
            {selectedVehicle === 'car' ? <CarSelectedIcon /> : <CarUnselectedIcon />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => handleSelectVehicle('motorcycle')}>
            {selectedVehicle === 'motorcycle' ? (
              <MotorcycleSelectedIcon />
            ) : (
              <MotorcycleUnselectedIcon />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.sizeContainer}>
          <View style={styles.textSizeValueRow}>
            <Text style={styles.textSizeValue}>0</Text>
            <Text style={styles.textSizeValue}>10</Text>
            <Text style={styles.textSizeValue}>10</Text>
            <Text style={styles.textSizeValue}>5</Text>
            <Text style={styles.textSizeValue}>5</Text>
          </View>

          <View style={styles.horizontalSeparator} />
          <View style={styles.circleIndicatorRow}>
            <View style={styles.circleIndicator} />
            <View style={styles.circleIndicator} />
            <View style={styles.circleIndicator} />
            <View style={styles.circleIndicator} />
            <View style={styles.circleIndicator} />
          </View>

          <View style={styles.textSizeValueRow}>
            <Text style={styles.textSizeDescription}>S</Text>
            <Text style={styles.textSizeDescription}>MD</Text>
            <Text style={styles.textSizeDescription}>LG</Text>
            <Text style={styles.textSizeDescription}>XL</Text>
            <Text style={styles.textSizeDescription}>XXL</Text>
          </View>
        </View>

        <View style={[styles.horizontalSeparator, styles.horizontalSeparatorMarginBottom]} />

        <Text style={[styles.textTitle, styles.horizontalSeparatorMarginBottom]}>
          Previous 7 Days Transactions
        </Text>

        <View style={styles.transactionsContainer}>
          {servicesData.map((service, index) => (
            <ServiceTransactionItem
              key={index}
              icon={service.icon}
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
    gap: 16,
    paddingHorizontal: 25,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#F3F2EF',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    padding: 40,
    alignItems: 'center',
  },
  sizeContainer: {
    alignItems: 'center',
    paddingHorizontal: 25,
    gap: 3,
    flexDirection: 'column',
  },
  circleIndicator: {
    height: 12,
    width: 12,
    borderRadius: 10,
    backgroundColor: color.primary,
  },
  circleIndicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  textSizeValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  textSizeValue: {
    ...font.regular,
    fontSize: 16,
    color: color.primary,
  },
  textSizeDescription: {
    ...font.regular,
    fontSize: 12,
    color: color.black,
  },
  transactionsContainer: {
    gap: 24,
  },
});

export default CustomerDetails;
