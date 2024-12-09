import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader, MaterialCommunityIcon } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import { Card, Text } from '@ui-kitten/components';
import { NavigationProp } from '../../types/navigation/types';

type Customer = {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  dateStarted: string;
};

const employees = [
  {
    id: '1',
    fullName: 'John Doe',
    phoneNumber: '09122011108',
    email: 'test@gmail.com',
    dateStarted: 'January 15, 2020',
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    phoneNumber: '09122011108',
    email: 'test@gmail.com',
    dateStarted: 'March 2, 2018',
  },
];

const Customers = () => {
  const navigation = useNavigation<NavigationProp>();

  const renderEmployeeItem = ({ item }: { item: Customer }) => {
    return (
      <Card
        style={styles.card}
        status="success"
        onPress={() => navigation.navigate('CustomerDetails', { id: item.id })}
      >
        <View style={styles.cardContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <MaterialCommunityIcon name="account-circle" size={32} color="#04528E" />
            <Text category="h5" style={styles.headerTitle}>
              {item.fullName}
            </Text>
          </View>

          {/* Employee Title */}
          <Text category="p1" appearance="hint" style={styles.description}>
            {item.phoneNumber}
          </Text>
          <Text category="p1" appearance="hint" style={styles.description}>
            {item.email}
          </Text>

          {/* <View style={[styles.statusContainer]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View> */}

          {/* Date Started */}
          <Text category="s2" style={styles.dateStarted}>
            Started: {item.dateStarted}
          </Text>

          {/* Footer Section */}
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
      <AppHeader title="Customers" onBack={() => navigation.goBack()} />
      <FlatList
        data={employees}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
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
  listContainer: {
    paddingHorizontal: 16,
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
});

export default Customers;
