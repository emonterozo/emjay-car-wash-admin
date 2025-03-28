import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import {
  OngoingTransaction,
  ScreenStatusProps,
  TransactionStatusType,
} from '../../types/services/types';
import { NavigationProp } from '../../types/navigation/types';
import {
  AppHeader,
  EmptyState,
  ErrorModal,
  FloatingActionButton,
  LoadingAnimation,
} from '@app/components';
import { color, font } from '@app/styles';
import { ERR_NETWORK, IMAGES } from '@app/constant';
import { CircleArrowRightIcon } from '@app/icons';
import { getOngoingTransactionsRequest } from '@app/services';
import GlobalContext from '@app/context';

const STATUSES = [
  {
    label: 'Ongoing',
    value: 'ONGOING',
    color: '#1F93E1',
  },
  {
    label: 'Complete',
    value: 'COMPLETED',
    color: '#4BB543',
  },
  {
    label: 'Cancel',
    value: 'CANCELLED',
    color: '#FF7070',
  },
];

const renderSeparator = () => <View style={styles.separator} />;

const Ongoing = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useContext(GlobalContext);
  const isFocused = useIsFocused();
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [selectedStatus, setSelectedStatus] = useState('ONGOING');
  const [transactions, setTransactions] = useState<OngoingTransaction[]>([]);

  const fetchTransactions = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getOngoingTransactionsRequest(
      user.accessToken,
      selectedStatus as TransactionStatusType,
      selectedStatus === 'ONGOING'
        ? undefined
        : {
            start: format(new Date(), 'yyyy-MM-dd'),
            end: format(new Date(), 'yyyy-MM-dd'),
          },
    );

    if (response.success && response.data) {
      setTransactions(response.data.transactions);
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
      fetchTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus, isFocused]);

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Services" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchTransactions}
      />
      <View style={styles.heading}>
        <Text style={styles.label}>{`Total of ${transactions.length} transactions`}</Text>
      </View>
      <View style={styles.statusContainer}>
        {STATUSES.map((status) => (
          <TouchableOpacity
            style={[
              styles.status,
              status.value === selectedStatus && { backgroundColor: status.color },
            ]}
            key={status.label}
            onPress={() => setSelectedStatus(status.value)}
          >
            <Text
              style={[styles.statusLabel, status.value === selectedStatus && styles.statusSelected]}
            >
              {status.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={IMAGES.EM_JAY} style={styles.image} resizeMode="contain" />
            <View style={[styles.tag, item.customer_id !== null && styles.registered]}>
              <Text style={styles.tagLabel}>
                {item.customer_id === null ? 'Unregistered' : 'Registered'}
              </Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.name}>{`${item.first_name} ${item.last_name}`}</Text>
              <Text style={styles.otherDetails}>{item.model}</Text>
              <Text style={styles.otherDetails}>{item.plate_number}</Text>
              <Text style={styles.otherDetails}>
                {format(new Date(item.check_in), 'MMM dd, hh:mm a')}
              </Text>
              <TouchableOpacity
                style={styles.viewDetailsContainer}
                onPress={() =>
                  navigation.navigate('AvailedServices', {
                    customerId: item.customer_id,
                    transactionId: item._id,
                    transactionStatus: item.status,
                    model: item.model,
                    plateNumber: item.plate_number,
                  })
                }
              >
                <Text style={styles.viewDetails}>View full details</Text>
                <CircleArrowRightIcon />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={<EmptyState />}
      />
      <FloatingActionButton
        onPress={() =>
          navigation.navigate('AddOngoing', {
            customerId: null,
            contactNumber: null,
            freeWash: [],
            transaction: undefined,
          })
        }
      />
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
  },
  status: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
  },
  statusLabel: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  details: {
    gap: 8,
    marginTop: 16,
    flex: 1,
  },
  image: {
    height: 105,
    width: 105,
    marginTop: 16,
  },
  name: {
    ...font.regular,
    fontSize: 20,
    lineHeight: 20,
    color: color.black,
  },
  otherDetails: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
    color: color.black,
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
    position: 'absolute',
    top: 8,
    right: 16,
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
  registered: {
    backgroundColor: '#4BB543',
  },
});

export default Ongoing;
