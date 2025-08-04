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
  StatusBar,
  Image,
} from 'react-native';
import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';

import { NavigationProp, CustomerDetailsRouteProp } from '../../types/navigation/types';
import {
  AppHeader,
  EmptyState,
  ErrorModal,
  FloatingActionButton,
  LoadingAnimation,
  ServiceTransactionItem,
  SizeDisplay,
} from '@app/components';
import { color, font } from '@app/styles';
import { CarIcon, ChatIcon, CoinsIcon, MotorcycleIcon, WaterDropIcon } from '@app/icons';
import { getCustomerInformationRequest } from '@app/services';
import GlobalContext from '@app/context';
import {
  CustomerInformation,
  GenderType,
  RecentTransaction,
  ScreenStatusProps,
} from '../../types/services/types';
import { formattedNumber } from '@app/helpers';
import { ERR_NETWORK, IMAGES, NO_DATA } from '@app/constant';

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
  car: ['SM', 'MD', 'LG', 'XL'],
  motorcycle: ['SM', 'MD', 'LG'],
};

const CustomerDetails = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const { id } = useRoute<CustomerDetailsRouteProp>().params;
  const [selectedVehicle, setSelectedVehicle] = useState('car');
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [customerInformation, setCustomerInformation] = useState<CustomerInformation | undefined>(
    undefined,
  );
  const [transactions, setTransactions] = useState<RecentTransaction[]>([]);
  const [servicesCount, setServicesCount] = useState({
    car: [0, 0, 0, 0, 0],
    motorcycle: [0, 0, 0],
  });
  const [points, setPoints] = useState(0);

  const customerDetails = customerInformation
    ? [
        {
          label: 'Full Name',
          value: `${customerInformation.first_name} ${customerInformation.last_name}`,
        },
        {
          label: 'Date of Birth',
          value: format(new Date(customerInformation.birth_date), 'MMMM dd, yyyy'),
        },
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
            : NO_DATA,
        },
        {
          label: 'Registration Date',
          value: format(new Date(customerInformation.registered_on), 'MMMM dd, yyyy'),
        },
      ]
    : [
        {
          label: 'Full Name',
          value: NO_DATA,
        },
        { label: 'Date of Birth', value: NO_DATA },
        { label: 'Contact number', value: NO_DATA },
        {
          label: 'Address',
          value: NO_DATA,
        },
        {
          label: 'Registration Date',
          value: NO_DATA,
        },
      ];

  const handleSelectVehicle = (vehicle: string) => {
    setSelectedVehicle(vehicle);
  };

  useEffect(() => {
    fetchCustomerDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomerDetails = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getCustomerInformationRequest(user.accessToken, user.refreshToken, id);

    if (response.success && response.data) {
      const { customer } = response.data;
      setCustomerInformation(customer);
      setTransactions(customer.transactions);
      setServicesCount({
        car: customer.car_wash_service_count.map((item) => item.count),
        motorcycle: customer.moto_wash_service_count.map((item) => item.count),
      });
      setPoints(customer.points);
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

  const handleContactNumber = (phoneNumber: string) => {
    const isContactNumberValid = phoneNumber !== NO_DATA;
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

  const handlePressMessage = () => {
    if (customerInformation)
      {navigation.navigate('Chat', {
        customerId: customerInformation._id,
        firstName: customerInformation.first_name,
        lastName: customerInformation.last_name,
        gender: customerInformation.gender as GenderType,
      });}
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Customer" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchCustomerDetails}
      />
      <Text style={[styles.heading, styles.textCustomerDetails]}>Customer Details</Text>
      <ScrollView bounces={false}>
        <View style={styles.avatarContainer}>
          <Image
            source={customerInformation?.gender === 'MALE' ? IMAGES.AVATAR_BOY : IMAGES.AVATAR_GIRL}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
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
        <View style={styles.points}>
          <CoinsIcon width={40} height={40} />
          <View>
            <Text style={styles.pointsValue}>{`${points.toLocaleString()} pts`}</Text>
            <Text style={styles.pointsLabel}>Current points earned</Text>
          </View>
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
          {selectedVehicle === 'car' && <SizeDisplay sizes={size.car} values={servicesCount.car} />}
          {selectedVehicle === 'motorcycle' && (
            <SizeDisplay sizes={size.motorcycle} values={servicesCount.motorcycle} />
          )}
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
                key={item.transaction_availed_service_id}
                icon={<WaterDropIcon />}
                serviceName={item.service_name}
                price={formattedNumber(item.price)}
                date={format(new Date(item.date), 'dd MMM yy, hh:mm a')}
              />
            ))
          )}
        </View>
      </ScrollView>
      <FloatingActionButton
        fabIcon={<ChatIcon width={25} height={25} fill="#ffffff" />}
        onPress={handlePressMessage}
      />
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
    marginBottom: 10,
    paddingHorizontal: 25,
  },
  emptyState: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    backgroundColor: '#1F93E1',
    borderRadius: 187,
    width: 187,
    height: 187,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 41,
    marginBottom: 41,
  },
  avatar: {
    position: 'absolute',
    top: 9,
    left: 0,
    width: '100%',
    height: '100%',
  },
  points: {
    backgroundColor: '#F3F2EF',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4.5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    gap: 24,
    width: Dimensions.get('window').width - 48,
    alignSelf: 'center',
  },
  pointsValue: {
    ...font.bold,
    fontSize: 20,
    lineHeight: 20,
    color: '#050303',
  },
  pointsLabel: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#696969',
  },
});

export default CustomerDetails;
