import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AppHeader,
  EmptyState,
  ErrorModal,
  LoadingAnimation,
  MaterialCommunityIcon,
} from '@app/components';
import { useNavigation } from '@react-navigation/native';
import { Card, Text } from '@ui-kitten/components';

import { ERR_NETWORK } from '@app/constant';
import { getCustomersRequest } from '@app/services';
import { NavigationProp } from '../../types/navigation/types';
import { Customer } from '../../types/services/types';
import { ErrorModalProps } from '../../components/ErrorModal/ErrorModal';

const Customers = () => {
  const navigation = useNavigation<NavigationProp>();
  const [screenStatus, setScreenStatus] = useState({
    isLoading: false,
    error: '',
  });
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = () => {
    setScreenStatus({ error: '', isLoading: true });
    getCustomersRequest()
      .then((response) => {
        setScreenStatus({ ...screenStatus, isLoading: false });
        setCustomers(response);
      })
      .catch((error) => {
        setScreenStatus({
          isLoading: false,
          error: error.code === ERR_NETWORK ? 'network' : 'server',
        });
      });
  };

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePressBack = () => {
    setScreenStatus({ ...screenStatus, error: '' });
    navigation.goBack();
  };

  const renderCustomer = ({ item }: { item: Customer }) => {
    return (
      <Card
        style={styles.card}
        status="success"
        onPress={() => navigation.navigate('CustomerDetails', { id: item.id })}
      >
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <MaterialCommunityIcon name="account-circle" size={32} color="#04528E" />
            <Text category="h5" style={styles.headerTitle}>
              {`${item.first_name} ${item.last_name}`}
            </Text>
          </View>
          <Text category="p1" appearance="hint" style={styles.description}>
            {item.contact_number}
          </Text>
          <Text category="s2" style={styles.dateStarted}>
            Started: {item.date_added}
          </Text>
          <View style={styles.footer}>
            <Text category="s1" status="info" style={styles.footerText}>
              View Details
            </Text>
            <MaterialCommunityIcon name="chevron-double-right" size={24} color="#04528E" />
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Customers" onBack={handlePressBack} />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        isVisible={screenStatus.error !== ''}
        variant={screenStatus.error as ErrorModalProps['variant']}
        onRetry={fetchCustomers}
        onCancel={handlePressBack}
      />
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={renderCustomer}
        contentContainerStyle={[styles.list, customers.length === 0 && styles.empty]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 5,
  },
  cardContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#04528E',
    marginLeft: 8,
  },
  description: {
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  dateStarted: {
    color: '#555',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerText: {
    fontWeight: '600',
    color: '#04528E',
  },
  empty: {
    flex: 1,
  },
});

export default Customers;
