import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import { AppHeader } from '@app/components';
import { font } from '@app/styles';
import { IMAGES } from '@app/constant';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Customers = () => {
  // Mock customer data
  const customers = useMemo(
    () => [
      { id: '1', name: 'David Brown', contact: '09123456789', registrationDate: 'Jan. 1, 2025' },
      { id: '2', name: 'John Smith', contact: '09223344556', registrationDate: 'Feb. 15, 2025' },
      { id: '3', name: 'Sarah Lee', contact: '09334455667', registrationDate: 'Mar. 10, 2025' },
    ],
    [],
  );

  const navigation = useNavigation();
  const [count, setCount] = useState(customers.length);

  useEffect(() => {
    setCount(customers.length);
  }, [customers]);

  const renderSeparator = () => <View style={styles.separator} />;
  const handleCardPress = (customerId) => {
    navigation.navigate('CustomerDetails', { id: customerId });
  };
  const renderCustomer = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleCardPress(item.id)}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View>
              <Image source={IMAGES.EM_JAY} style={styles.image} resizeMode="center" />
            </View>
            <View>
              <Text style={styles.textName}>{item.name}</Text>
              <Text style={styles.textContact}>{item.contact}</Text>
              <Text style={styles.textRegistration}>{item.registrationDate}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Customers" />
      <View style={styles.heading}>
        <Text style={styles.textCustomerList}>Customer List</Text>
        <View style={styles.textRegisteredCustomerContainer}>
          <Text style={styles.textRegisteredCustomer}>
            {`Total number of Registered Customers are ${count}`}
          </Text>
        </View>
      </View>

      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={true}
        data={customers}
        renderItem={renderCustomer}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
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
    alignItems: 'flex-start',
    marginTop: 16,
    marginBottom: 35,
    paddingHorizontal: 25,
  },
  separator: {
    marginTop: 24,
  },
  textRegisteredCustomerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textRegisteredCustomer: {
    ...font.regular,
    fontSize: 16,
    color: '#696969',
    lineHeight: 16,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: Dimensions.get('window').width - 49,
    backgroundColor: '#F3F2EF',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 5,
  },
  image: {
    height: 105,
    width: 105,
  },
  textCustomerList: {
    ...font.regular,
    fontSize: 16,
    color: '#696969',
    lineHeight: 16,
    marginBottom: 16,
  },
  textName: {
    ...font.bold,
    fontSize: 24,
    color: '#000000',
    lineHeight: 24,
    marginBottom: 8,
  },
  textContact: {
    ...font.regular,
    fontSize: 16,
    color: '#777676',
    lineHeight: 16,
    marginBottom: 4,
  },
  textRegistration: {
    ...font.light,
    fontSize: 16,
    color: '#7F7A7A',
    lineHeight: 16,
  },
});

export default Customers;
