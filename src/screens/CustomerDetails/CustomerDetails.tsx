import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { format } from 'date-fns';

import { NavigationProp } from '../../types/navigation/types';

import {
  AppHeader,
  EmptyState,
  ErrorModal,
  LoadingAnimation,
  ServiceTransactionItem,
} from '@app/components';
import { color, font } from '@app/styles';
import { CarIcon, MotorcycleIcon, WaterDropIcon } from '@app/icons';
import SizeDisplay from './SizeDisplay';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CustomerDetailsRouteProp } from '../../types/navigation/types';
import { getCustomerInformationRequest } from '@app/services';
import GlobalContext from '@app/context';
import { CustomerInformation } from 'src/types/services/types';

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

const CustomerDetails = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const { id } = useRoute<CustomerDetailsRouteProp>().params;
  const [selectedVehicle, setSelectedVehicle] = useState('car');
  const [screenStatus, setScreenStatus] = useState({
    isLoading: false,
    hasError: false,
  });
  const [customerInformation, setCustomerInformation] = useState<CustomerInformation>();
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [carServicesCountBySize, setCarServicesCountBySize] = useState<any[]>([]);
  const [motoServicesCountBySize, setMotoServicesCountBySize] = useState<any[]>([]);
  const [value, setValue] = useState({
    car: [0, 0, 0, 0, 0],
    motorcycle: [0, 0, 0],
  });

  const customerDetails = customerInformation
    ? [
        {
          label: 'Full Name',
          value: `${customerInformation.first_name} ${customerInformation.last_name}`,
        },
        { label: 'Date of Birth', value: 'May 20, 2003' },
        { label: 'Contact number', value: `${customerInformation.contact_number}` },
        {
          label: 'Address',
          value: Object.values({
            address: customerInformation.address,
            barangay: customerInformation.barangay,
            city: customerInformation.city,
            province: customerInformation.province,
          }).every(Boolean)
            ? `${customerInformation.address} ${customerInformation.barangay} ${customerInformation.city} ${customerInformation.province}`
            : 'No available record',
        },
        {
          label: 'Registration Date',
          value: format(new Date(customerInformation.registered_on), 'MMMM dd, yyyy'),
        },
      ]
    : [];

  const transformServicesCountBySizeData = (customerServices: CustomerInformation) => {
    const carCountData = customerServices.car_services_count.map((item, index) => ({
      size: item.size,
      count: value.car[index] || 0,
    }));
    setCarServicesCountBySize(carCountData);

    const motoCountData = customerServices.moto_services_count.map((item, index) => ({
      size: item.size,
      count: value.motorcycle[index] || 0,
    }));
    setMotoServicesCountBySize(motoCountData);

    setValue((prevValue) => ({
      ...prevValue,
      car: carCountData.map((item) => item.count),
      motorcycle: motoCountData.map((item) => item.count),
    }));
  };

  const handleSelectVehicle = (vehicle: string) => {
    setSelectedVehicle(vehicle);
  };

  useEffect(() => {
    fetchCustomerDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomerDetails = async () => {
    setScreenStatus({ hasError: false, isLoading: true });
    const response = await getCustomerInformationRequest(user.token, id);

    if (response.success && response.data) {
      const { data, errors } = response.data;

      if (errors.length > 0) {
        setScreenStatus({ isLoading: false, hasError: true });
      } else {
        setCustomerInformation(data.customer_services);
        setServicesData(data.customer_services.recent_transactions || []);
        transformServicesCountBySizeData(data.customer_services);
        setScreenStatus({ hasError: false, isLoading: false });
      }
    } else {
      setScreenStatus({ isLoading: false, hasError: true });
    }
  };

  const onCancel = () => {
    setScreenStatus({ hasError: false, isLoading: false });
    navigation.goBack();
  };

  const handleContactNumber = (phoneNumber: string) => {
    const isContactNumberValid = phoneNumber !== 'No available record';
    return (
      <Text
        onPress={isContactNumberValid ? () => Linking.openURL(`tel:${phoneNumber}`) : undefined}
        style={[
          styles.textPersonalDetails,
          isContactNumberValid ? styles.textPrimary : styles.textBlack,
        ]}
      >
        {phoneNumber}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Customer" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchCustomerDetails}
      />
      <Text style={[styles.heading, styles.textCustomerDetails]}>Customer Details</Text>
      <ScrollView bounces={false}>
        <Text style={[styles.textTitle, styles.horizontalSeparatorMarginBottom21]}>
          Personal Information
        </Text>
        <View style={styles.personalInformationContainer}>
          {customerDetails.map((item, index) => (
            <Text key={index} style={[styles.textPersonalDetails, styles.textGray]}>
              {item.label}:
              <Text style={[styles.textBlack]}>
                {' '}
                {item.label === 'Contact number' ? handleContactNumber(item.value) : item.value}
              </Text>
            </Text>
          ))}
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
          {selectedVehicle === 'car' && (
            <SizeDisplay
              sizes={size.car}
              values={carServicesCountBySize.map((item) => item.count)}
            />
          )}
          {selectedVehicle === 'motorcycle' && (
            <SizeDisplay
              sizes={size.motorcycle}
              values={motoServicesCountBySize.map((item) => item.count)}
            />
          )}
        </View>
        <View style={[styles.horizontalSeparator, styles.horizontalSeparatorMarginBottom]} />
        <Text style={[styles.textTitle, styles.horizontalSeparatorMarginBottom]}>
          Previous 7 Days Transactions
        </Text>
        <View style={styles.transactionsContainer}>
          {servicesData.length === 0 ? (
            <View style={styles.emptyState}>
              <EmptyState />
            </View>
          ) : (
            servicesData.map((_service, index) => (
              <ServiceTransactionItem
                key={index}
                icon={<WaterDropIcon />}
                serviceName={'Car Wash'}
                price={'P3000'}
                date={format(new Date('2024-12-23T08:00:00.000Z'), 'dd MMM yy, hh:mm a')}
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
    textAlignVertical: 'center',
  },
  textGray: {
    color: '#888888',
  },
  textBlack: {
    color: color.black,
  },
  textPrimary: {
    color: color.primary,
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
  emptyState: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default CustomerDetails;
