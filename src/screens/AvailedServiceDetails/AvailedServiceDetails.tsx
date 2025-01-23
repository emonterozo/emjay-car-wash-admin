import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';

import { ScreenStatusProps } from '../../types/services/types';
import { AppHeader, ErrorModal, LoadingAnimation } from '@app/components';
import { color, font } from '@app/styles';
import { EditIcon } from '@app/icons';
import { format } from 'date-fns';
import { formattedNumber } from '@app/helpers';
import { IMAGES } from '@app/constant';

type ServiceInformationProps = {
  price: number;
  deduction: number;
  company_earnings: number;
  employee_share: number;
  status: string;
  payment_status: string;
  start_date: Date;
  end_date: Date;
};

const serviceInformation: ServiceInformationProps = {
  price: 150,
  deduction: 0,
  company_earnings: 80,
  employee_share: 60,
  status: 'Ongoing',
  payment_status: 'Not Yet Paid',
  start_date: new Date('2024-12-23T08:00:00.000Z'),
  end_date: new Date('2024-12-23T08:00:00.000Z'),
};

const serviceDetails = serviceInformation
  ? [
      {
        label: 'Price',
        value: formattedNumber(serviceInformation.price),
      },
      {
        label: 'Deduction',
        value: formattedNumber(serviceInformation.deduction),
      },
      { label: 'Company Earnings', value: formattedNumber(serviceInformation.company_earnings) },
      {
        label: 'Employee Share',
        value: formattedNumber(serviceInformation.employee_share),
      },
      {
        label: 'Status',
        value: `${serviceInformation.status}`,
      },
      {
        label: 'Payment Status',
        value: `${serviceInformation.payment_status}`,
      },
      {
        label: 'Start Date & Time',
        value: format(new Date(serviceInformation.start_date), 'dd MMM, hh:mm a'),
      },
      {
        label: 'End Date & Time',
        value: format(new Date(serviceInformation.end_date), 'dd MMM, hh:mm a'),
      },
    ]
  : [
      {
        label: 'Price',
        value: 'No available record',
      },
      {
        label: 'Deduction',
        value: 'No available record',
      },
      { label: 'Company Earnings', value: 'No available record' },
      {
        label: 'Employee Share',
        value: 'No available record',
      },
      {
        label: 'Status',
        value: 'No available record',
      },
      {
        label: 'Payment Status',
        value: 'No available record',
      },
      {
        label: 'Start Date & Time',
        value: 'No available record',
      },
      {
        label: 'End Date & Time',
        value: 'No available record',
      },
    ];

const AvailedServiceDetails = () => {
  const navigation = useNavigation();
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Availed Services" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={() => {}}
      />
      <View style={styles.heading}>
        <Text style={styles.label}>Details of Availed Service</Text>
        <TouchableOpacity onPress={() => {}}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <ScrollView bounces={false} contentContainerStyle={styles.content}>
        <FastImage
          style={styles.serviceImage}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/portfolio-d0d15.appspot.com/o/EmJay%20Services%20Image%2Fbuff-wax.jpg?alt=media&token=32bded96-8bab-4a67-9949-4aa9c20914fe',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.service}>Seat Cover Removal</Text>
        <View style={styles.details}>
          {serviceDetails.map((item, index) => (
            <Text key={index} style={[styles.textDetails, styles.textGray]}>
              {item.label}:<Text style={styles.textBlack}> {item.value}</Text>
            </Text>
          ))}
        </View>
        <View style={[styles.horizontalSeparator, styles.horizontalSeparatorMarginBottom]} />
        <Text style={[styles.employee, styles.horizontalSeparatorMarginBottom]}>
          Assigned employees
        </Text>
        <View style={styles.list}>
          <View style={styles.row}>
            <Image source={IMAGES.AVATAR_BOY} style={styles.image} resizeMode="contain" />
            <Text style={styles.employee}>John Smith</Text>
          </View>
          <View style={styles.row}>
            <Image source={IMAGES.AVATAR_BOY} style={styles.image} resizeMode="contain" />
            <Text style={styles.employee}>John Smith</Text>
          </View>
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
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 25,
  },
  label: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#696969',
  },
  content: {
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: color.background,
  },
  serviceImage: {
    width: '100%',
    height: 225,
    borderRadius: 24,
  },
  service: {
    ...font.regular,
    fontSize: 24,
    lineHeight: 24,
    color: '#000000',
    marginVertical: 24,
  },
  details: {
    gap: 12,
  },
  textDetails: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
  },
  textGray: {
    color: '#888888',
  },
  textBlack: {
    color: color.black,
  },
  horizontalSeparator: {
    marginVertical: 25,
    height: 2,
    backgroundColor: '#B0B0B0',
    width: '100%',
    alignSelf: 'center',
  },
  horizontalSeparatorMarginBottom: {
    marginBottom: 24,
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
  list: {
    gap: 16,
  },
});

export default AvailedServiceDetails;
