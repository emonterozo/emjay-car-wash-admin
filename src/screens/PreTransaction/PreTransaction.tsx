import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import { AppHeader, EmptyState, LoadingAnimation } from '@app/components';
import { PreTransactionsRouteProp } from '../../types/navigation/types';
import { Button, Card, Text } from '@ui-kitten/components';

type PreTransaction = {
  id: string;
  service: string;
  amount: number;
  company_earnings: number;
  employee_share: number;
  assigned_employee: string[];
};

const PreTransaction = () => {
  const navigation = useNavigation();
  const { id } = useRoute<PreTransactionsRouteProp>().params;
  const [preTransactions, setPreTransactions] = useState<PreTransaction[]>([]);

  const fetchServicesAvailed = () => {
    axios
      .get(`https://2328-136-158-61-91.ngrok-free.app/ongoing/${id}`)
      .then((response) => {
        setPreTransactions(response.data.pre_transaction);
      })
      .catch((_error) => {});
  };

  useEffect(() => {
    fetchServicesAvailed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item }: { item: PreTransaction }) => (
    <Card style={styles.card}>
      <Text category="h6" style={styles.title}>
        {item.service}
      </Text>
      <Text category="s1">Amount: ₱{item.amount}</Text>
      <Text category="s2" appearance="hint">
        Company Earnings: ₱{item.company_earnings}
      </Text>
      <Text category="s2" appearance="hint">
        Employee Share: ₱{item.employee_share}
      </Text>
      <Text category="s1" style={styles.employee}>
        Assigned Employee: {item.assigned_employee.join(', ')}
      </Text>
      <Button>Complete</Button>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Services Availed" onBack={() => navigation.goBack()} />
      <LoadingAnimation isLoading={false} />
      <FlatList
        data={preTransactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContainer, preTransactions.length === 0 && styles.empty]}
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
  listContainer: {
    paddingBottom: 16,
  },
  empty: {
    flex: 1,
  },
  card: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
  },
  title: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  employee: {
    marginTop: 5,
    color: '#007aff',
  },
});

export default PreTransaction;
