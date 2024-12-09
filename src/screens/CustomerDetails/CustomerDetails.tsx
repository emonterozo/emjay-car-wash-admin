import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { AppHeader } from '@app/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CustomerDetailsRouteProp } from '../../types/navigation/types';

const CustomerDetails = () => {
  const navigation = useNavigation();
  const route = useRoute<CustomerDetailsRouteProp>().params;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Customer Details" onBack={() => navigation.goBack()} />
      <Text>{`${route.id} test ${route.id}`}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
});

export default CustomerDetails;
