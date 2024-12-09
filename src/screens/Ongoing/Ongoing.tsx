import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader, MaterialCommunityIcon } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Text } from '@ui-kitten/components';

const transactions = [
  {
    id: '1',
    customerName: 'John Doe',
    vehicleType: 'car',
    plateNumber: 'ABC123',
    contactNumber: '123-456-7890',
    dateTime: '2024-12-09 14:30',
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    vehicleType: 'truck',
    plateNumber: 'XYZ456',
    contactNumber: '987-654-3210',
    dateTime: '2024-12-09 15:00',
  },
  // More transaction objects...
];
const Ongoing = () => {
  const navigation = useNavigation();

  const renderEmployeeItem = ({ item }) => {
    return (
      <Card style={styles.card} status="primary">
        <View style={styles.cardContent}>
          {/* Customer Name and Vehicle Type */}
          <View style={styles.header}>
            <Text category="h5" style={styles.customerName}>
              {item.customerName}
            </Text>
            <MaterialCommunityIcon
              name={item.vehicleType === 'car' ? 'car-hatchback' : 'motorbike'}
              size={30}
              color="#04528E"
            />
          </View>

          {/* Plate Number and Contact Number */}
          <Text category="s1" style={styles.detailText}>
            Plate Number: {item.plateNumber}
          </Text>
          <Text category="s1" style={styles.detailText}>
            Contact: {item.contactNumber}
          </Text>

          {/* Date and Time */}
          <Text category="s1" style={styles.detailText}>
            Date & Time: {item.dateTime}
          </Text>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <Button size="small" style={styles.button} onPress={() => {}}>
              Add Transactions
            </Button>
            <Button size="small" style={styles.button} status="danger" onPress={() => {}}>
              Close
            </Button>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Ongoing" onBack={() => navigation.goBack()} />
      <FlatList
        data={transactions}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
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
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 5,
    padding: 16,
  },
  cardContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  customerName: {
    fontWeight: 'bold',
    color: '#04528E',
  },
  detailText: {
    color: '#555',
    marginBottom: 6,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 16,
  },
  button: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Ongoing;
