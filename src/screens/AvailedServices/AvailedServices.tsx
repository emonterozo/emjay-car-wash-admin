import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';

import { AvailedServicesRouteProp, NavigationProp } from '../../types/navigation/types';
import { ScreenStatusProps, TransactionServicesResponse } from '../../types/services/types';
import {
  AppHeader,
  ConfirmationModal,
  EmptyState,
  ErrorModal,
  FloatingActionButton,
  LoadingAnimation,
} from '@app/components';
import { color, font } from '@app/styles';
import { CircleArrowRightIcon } from '@app/icons';
import { formattedNumber } from '@app/helpers';
import {
  getCustomerFreeWashServiceRequest,
  getTransactionServicesRequest,
  updateTransactionRequest,
} from '@app/services';
import GlobalContext from '@app/context';
import { ERR_NETWORK, IMAGES } from '@app/constant';

const STATUSES = [
  {
    label: 'Pending',
    value: 'PENDING',
    color: '#888888',
  },
  {
    label: 'Ongoing',
    value: 'ONGOING',
    color: '#1F93E1',
  },
  {
    label: 'Done',
    value: 'DONE',
    color: '#4BB543',
  },
  {
    label: 'Cancel',
    value: 'CANCELLED',
    color: '#FF7070',
  },
];

const renderSeparator = () => <View style={styles.separator} />;

const AvailedServices = () => {
  const { user } = useContext(GlobalContext);
  const { customerId, transactionId } = useRoute<AvailedServicesRouteProp>().params;
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp>();
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [transactionService, setTransactionService] = useState<
    TransactionServicesResponse['transaction'] | undefined
  >(undefined);
  const [freeWash, setFreeWash] = useState<{ type: string; size: string }[]>([]);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const fetchEmployeeFreeWash = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    if (customerId !== null) {
      const response = await getCustomerFreeWashServiceRequest(user.accessToken, customerId);

      if (response.success && response.data) {
        const transformedFreeWash = response.data.customer.free_wash.map(
          (item: { vehicle_type: string; size: string }) => ({
            type: item.vehicle_type,
            size: item.size,
          }),
        );
        setFreeWash(transformedFreeWash);
        fetchTransactionServices();
      } else {
        setScreenStatus({
          isLoading: false,
          type: response.error === ERR_NETWORK ? 'connection' : 'error',
          hasError: true,
        });
      }
    } else {
      fetchTransactionServices();
    }
  };

  const fetchTransactionServices = async () => {
    const response = await getTransactionServicesRequest(user.accessToken, transactionId);

    if (response.success && response.data) {
      setTransactionService(response.data.transaction);
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    } else {
      //TODO: handle this scenario if updating failed
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchEmployeeFreeWash();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId, customerId, isFocused]);

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  const getAvailedServices = () => {
    const selectedStatusValue = STATUSES.find((item) => item.label === selectedStatus)?.value;
    return transactionService?.availed_services.filter(
      (item) => item.status === selectedStatusValue,
    );
  };

  const getAvailedServicesId = () => {
    const data = transactionService?.availed_services.map((item) => item.service_id);

    return data!;
  };

  const navigateToAddOngoing = () => {
    if (!transactionService) {
      return;
    }

    navigation.navigate('AddOngoing', {
      customerId: null,
      contactNumber: transactionService.contact_number,
      freeWash: freeWash,
      transaction: {
        id: transactionService.id,
        vehicle_size: transactionService.vehicle_size,
        vehicle_type: transactionService.vehicle_type,
        model: transactionService.model,
        plate_number: transactionService.plate_number,
        availedServices: getAvailedServicesId(),
      },
    });
  };

  const cancelTransaction = async () => {
    setIsConfirmationVisible(false);
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });

    const response = await updateTransactionRequest(user.accessToken, transactionId, 'CANCELLED');

    if (response.success && response.data) {
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
      navigation.goBack();
    } else {
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
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
        onRetry={fetchEmployeeFreeWash}
      />
      <ConfirmationModal
        type="CancelTransaction"
        isVisible={isConfirmationVisible}
        onNo={() => setIsConfirmationVisible(false)}
        onYes={cancelTransaction}
        textCancel="Cancel"
        textProceed="Confirm"
      />
      <View style={styles.heading}>
        <Text style={styles.label}>List of Availed Services</Text>
      </View>
      <View style={styles.statusContainer}>
        {STATUSES.map((status) => (
          <TouchableOpacity
            style={[
              styles.status,
              status.label === selectedStatus && { backgroundColor: status.color },
            ]}
            key={status.label}
            onPress={() => setSelectedStatus(status.label)}
          >
            <Text
              style={[styles.statusLabel, status.label === selectedStatus && styles.statusSelected]}
            >
              {status.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={getAvailedServices()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <FastImage
              style={styles.serviceImage}
              source={{
                uri: item.image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.details}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>
                <Text style={styles.priceLabel}>Amount: </Text>
                {formattedNumber(item.price)}
              </Text>
              <View style={[styles.tag, item.is_free && styles.tagFree]}>
                <Text style={styles.tagLabel}>{item.is_free ? 'Free' : 'Not Free'}</Text>
              </View>
              <TouchableOpacity
                style={styles.viewDetailsContainer}
                onPress={() =>
                  navigation.navigate('AvailedServiceDetails', {
                    transactionId: transactionId,
                    transactionServiceId: item.transaction_service_id,
                  })
                }
              >
                <Text style={styles.viewDetails}>View full details</Text>
                <CircleArrowRightIcon />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.transaction_service_id.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={<EmptyState />}
      />
      {transactionService && (
        <FloatingActionButton
          additionalButtons={(() => {
            switch (selectedStatus) {
              case 'Pending':
                return [
                  {
                    icon: IMAGES.WALLET_ERROR,
                    label: 'Cancel the Transaction',
                    onPress: () => {
                      setIsConfirmationVisible(true);
                    },
                  },
                  {
                    icon: IMAGES.WALLET_ERROR,
                    label: 'Add service',
                    onPress: navigateToAddOngoing,
                  },
                ];
              case 'Done':
                return [
                  {
                    icon: IMAGES.WALLET_CHECKED,
                    label: 'Complete the Transaction',
                    onPress: () => {
                      setIsConfirmationVisible(true);
                    },
                  },
                  {
                    icon: IMAGES.WALLET_ERROR,
                    label: 'Add service',
                    onPress: navigateToAddOngoing,
                  },
                ];
              case 'Cancel':
                return [
                  {
                    icon: IMAGES.WALLET_ERROR,
                    label: 'Cancel the Transaction',
                    onPress: () => {
                      setIsConfirmationVisible(true);
                    },
                  },
                  {
                    icon: IMAGES.WALLET_ERROR,
                    label: 'Add service',
                    onPress: navigateToAddOngoing,
                  },
                ];
              default:
                return [];
            }
          })()}
        />
      )}
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
    marginVertical: 16,
    paddingHorizontal: 25,
  },
  label: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#696969',
  },
  statusContainer: {
    paddingHorizontal: 25,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 4,
  },
  status: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
  },
  statusLabel: {
    ...font.light,
    fontSize: 15,
    lineHeight: 15,
    color: '#696969',
    textAlign: 'center',
  },
  statusSelected: {
    color: '#FAFAFA',
  },
  card: {
    backgroundColor: '#F3F2EF',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    paddingVertical: 8,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  details: {
    gap: 8,
    flex: 1,
  },
  serviceImage: {
    width: '45%',
    height: '100%',
    borderRadius: 24,
  },
  name: {
    ...font.regular,
    fontSize: 20,
    lineHeight: 20,
    color: color.black,
  },
  price: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
    color: color.primary,
  },
  priceLabel: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
    color: '#777676',
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: color.background,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#7F7A7A',
    borderRadius: 8,
    width: 85,
  },
  tagFree: {
    backgroundColor: '#4BB543',
  },
  tagLabel: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: color.background,
    textAlign: 'center',
  },
  viewDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewDetails: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: '#016FB9',
  },
  separator: {
    marginTop: 24,
  },
});

export default AvailedServices;
