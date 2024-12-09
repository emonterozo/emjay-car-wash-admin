import React from 'react';
import { Card, Text } from '@ui-kitten/components';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { AppHeader, MaterialCommunityIcon } from '@app/components';

const services = [
  {
    id: '1',
    title: 'Complete Wash',
    customerName: 'John Doe',
    employeeName: 'One two 5',
    date: 'November 10, 2023',
    paymentAmount: '1,000.00',
    icon: 'car-hatchback',
    credited: false,
  },
  {
    id: '2',
    title: 'Interior Cleaning',
    customerName: 'John Doe',
    employeeName: 'One two 5',
    date: 'November 10, 2023',
    paymentAmount: '1,000.00',
    icon: 'motorbike',
    credited: true,
  },
  {
    id: '3',
    title: 'Wax & Polish',
    customerName: 'John Doe',
    employeeName: 'One two 5',
    date: 'November 10, 2023',
    paymentAmount: '1,000.00',
    icon: 'car-hatchback',
    credited: false,
  },
  {
    id: '4',
    title: 'Motor Buffing',
    customerName: 'John Doe',
    employeeName: 'One two 5',
    date: 'November 10, 2023',
    paymentAmount: '1,000.00',
    icon: 'motorbike',
    credited: true,
  },
];

const Transaction = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <Card style={styles.card} status={item.credited ? 'success' : 'warning'}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <MaterialCommunityIcon name={item.icon} size={32} color="#04528E" />
          <Text category="h5" style={styles.headerTitle}>
            {item.title}
          </Text>
        </View>
        {/* Customer Name */}
        <Text category="p1" style={styles.infoText}>
          Customer: {item.customerName}
        </Text>

        {/* Employee Name */}
        <Text category="p1" style={styles.infoText}>
          Employee: {item.employeeName}
        </Text>

        {/* Date */}
        <Text category="p1" style={styles.infoText}>
          Date: {item.date}
        </Text>

        {/* Payment Amount */}
        <Text category="p1" style={styles.paymentAmount}>
          Amount: P{item.paymentAmount}
        </Text>

        <Text category="p1" style={styles.paymentAmount}>
          Employee Share: P{item.paymentAmount}
        </Text>

        <View style={styles.footer}>
          <Text category="s1" status={item.credited ? 'success' : 'info'} style={styles.footerText}>
            {item.credited ? 'Employee Paid' : 'Pay Employee'}
          </Text>
          <MaterialCommunityIcon
            name="chevron-double-right"
            size={24}
            color={item.credited ? '#017C47' : '#04528E'}
          />
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Transactions" onBack={() => navigation.goBack()} />
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f7f9fc',
    elevation: 2,
  },
  cardContent: {
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#04528E',
  },
  infoText: {
    lineHeight: 20,
    color: '#333',
  },
  paymentAmount: {
    fontWeight: 'bold',
    color: '#1E201E', // You can change the color based on your preference
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  footerText: {
    fontWeight: '600',
  },
});

export default Transaction;
