import React, { useContext, useEffect, useState } from 'react';
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
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import { format } from 'date-fns';

import { AvailedServiceDetailRouteProp } from '../../types/navigation/types';
import { ScreenStatusProps, TransactionServiceDetailsResponse } from '../../types/services/types';
import { AppHeader, EmptyState, ErrorModal, LoadingAnimation } from '@app/components';
import { color, font } from '@app/styles';
import { EditIcon } from '@app/icons';
import { formattedNumber } from '@app/helpers';
import { ERR_NETWORK, IMAGES } from '@app/constant';
import GlobalContext from '@app/context';
import { getTransactionServiceDetailsRequest } from '@app/services';

const AvailedServiceDetails = () => {
  const { user } = useContext(GlobalContext);
  const { transactionId, transactionServiceId } = useRoute<AvailedServiceDetailRouteProp>().params;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [transactionService, setTransactionService] = useState<
    TransactionServiceDetailsResponse['transaction'] | undefined
  >(undefined);

  const serviceDetails = transactionService
    ? [
        {
          label: 'Price',
          value: formattedNumber(transactionService.price),
        },
        {
          label: 'Deduction',
          value: formattedNumber(transactionService.deduction),
        },
        { label: 'Company Earnings', value: formattedNumber(transactionService.company_earnings) },
        {
          label: 'Employee Share',
          value: formattedNumber(transactionService.employee_share),
        },
        {
          label: 'Status',
          value:
            transactionService.status.charAt(0).toUpperCase() +
            transactionService.status.slice(1).toLowerCase(),
        },
        {
          label: 'Payment Status',
          value: `${transactionService.is_paid ? 'Paid' : 'Not Yet Paid'}`,
        },
        {
          label: 'Start Date & Time',
          value:
            transactionService.start_date !== null
              ? format(new Date(transactionService.start_date!), 'dd MMM, hh:mm a')
              : 'No available record',
        },
        {
          label: 'End Date & Time',
          value:
            transactionService.end_date !== null
              ? format(new Date(transactionService.end_date!), 'dd MMM, hh:mm a')
              : 'No available record',
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

  const fetchTransactionServiceDetails = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getTransactionServiceDetailsRequest(
      user.accessToken,
      transactionId,
      transactionServiceId,
    );

    if (response.success && response.data) {
      setTransactionService(response.data.transaction);
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
    if (isFocused) {
      fetchTransactionServiceDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

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
        onRetry={fetchTransactionServiceDetails}
      />
      <View style={styles.heading}>
        <Text style={styles.label}>Details of Availed Service</Text>
        <TouchableOpacity onPress={() => {}}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <ScrollView bounces={false} contentContainerStyle={styles.content}>
        <View>
          <FastImage
            style={styles.serviceImage}
            source={{
              uri: transactionService?.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={[styles.tagContainer, transactionService?.is_free && styles.tagFree]}>
            <Text style={styles.tag}>{`${transactionService?.is_free ? 'Free' : 'Not Free'}`}</Text>
          </View>
        </View>
        <Text style={styles.service}>{transactionService?.title}</Text>
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
          {transactionService && transactionService?.assigned_employees.length > 0 ? (
            transactionService?.assigned_employees.map((item) => (
              <View key={item.id} style={styles.row}>
                <Image
                  source={item.gender === 'MALE' ? IMAGES.AVATAR_BOY : IMAGES.AVATAR_GIRL}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.employee}>{`${item.first_name} ${item.last_name}`}</Text>
              </View>
            ))
          ) : (
            <EmptyState />
          )}
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
  tagContainer: {
    position: 'absolute',
    right: 13,
    top: 13,
    backgroundColor: '#7F7A7A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  tag: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: '#F3F2EF',
  },
  tagFree: {
    backgroundColor: '#4BB543',
  },
});

export default AvailedServiceDetails;
