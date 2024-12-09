import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Text, useTheme } from '@ui-kitten/components';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { AppHeader, EmptyState, LoadingAnimation, MaterialCommunityIcon } from '@app/components';

const servicesData = [
  {
    id: '1',
    title: 'Complete Wash',
    description: 'A complete wash, tire black, hydro something. Lorem ipsum dolor sit amet.',
    icon: 'car-hatchback',
    price_list: [
      { category: 'sm', price: 250 },
      { category: 'md', price: 350 },
      { category: 'lg', price: 450 },
      { category: 'xl', price: 550 },
      { category: 'xxl', price: 650 },
    ],
  },
  {
    id: '2',
    title: 'Motor Buffing',
    description: 'Give your car a showroom shine with our waxing and polishing service.',
    icon: 'motorbike',
    price_list: [{ category: 'All Size', price: 250 }],
  },
  {
    id: '3',
    title: 'Interior Cleaning',
    description: 'Deep cleaning for the interior. Refresh your car’s interior with our service.',
    icon: 'motorbike',
    price_list: [
      { category: 'sm', price: 250 },
      { category: 'md', price: 350 },
      { category: 'lg', price: 450 },
      { category: 'xl', price: 550 },
      { category: 'xxl', price: 650 },
    ],
  },
  {
    id: '4',
    title: 'Wax & Polish',
    description: 'Give your car a showroom shine with our waxing and polishing service.',
    icon: 'car-hatchback',
    price_list: [
      { category: 'sm', price: 250 },
      { category: 'md', price: 350 },
      { category: 'lg', price: 450 },
      { category: 'xl', price: 550 },
      { category: 'xxl', price: 650 },
    ],
  },
  {
    id: '5',
    title: 'Motor Buffing',
    description: 'Give your car a showroom shine with our waxing and polishing service.',
    icon: 'motorbike',
    price_list: [
      { category: 'sm', price: 250 },
      { category: 'md', price: 350 },
      { category: 'lg', price: 450 },
    ],
  },
];

const getServicesRequest = () => {
  return axios
    .get('https://fake-json-api.mock.beeceptor.com/users')
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

const Services = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [screenStatus, setScreenStatus] = useState({
    isLoading: true,
    error: '',
  });
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const fetchServices = async () => {
    getServicesRequest()
      .then((_res) => {
        setScreenStatus({ ...screenStatus, isLoading: false });
        setServices(servicesData);
      })
      .catch((_err) => {
        setScreenStatus({ isLoading: false, error: 'network' });
      });
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item }) => (
    <Card
      style={styles.card}
      status="primary"
      onPress={() => setSelectedServices(item.price_list)}
      activeOpacity={0.6}
    >
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <MaterialCommunityIcon name={item.icon} size={32} color={theme['color-info-500']} />
          <Text category="h5" style={styles.headerTitle}>
            {item.title}
          </Text>
        </View>
        <Text category="p1" appearance="hint" style={styles.description}>
          {item.description}
        </Text>
        <View style={styles.footer}>
          <Text category="s1" status="info" style={styles.footerText}>
            View Details
          </Text>
          <MaterialCommunityIcon
            name="chevron-double-right"
            size={24}
            color={theme['color-info-500']}
          />
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <AppHeader title="Services" onBack={() => navigation.goBack()} />
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.list, services.length === 0 && styles.empty]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState />}
      />
      <Modal
        visible={selectedServices.length > 0}
        backdropStyle={styles.backdrop}
        style={styles.modal}
      >
        <Card disabled={true} style={styles.priceCard}>
          <Text category="h5" style={styles.title}>
            Price List
          </Text>
          <View style={styles.priceListContainer}>
            {selectedServices.map((item, index) => (
              <View key={index} style={styles.priceItem}>
                <Text category="s1" status="info">
                  {item.category.toUpperCase()}
                </Text>
                <Text category="s1" style={styles.priceText}>
                  P{item.price}
                </Text>
              </View>
            ))}
          </View>
          <Button style={styles.closeButton} status="info" onPress={() => setSelectedServices([])}>
            Close
          </Button>
        </Card>
      </Modal>
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
  description: {
    marginVertical: 8,
    lineHeight: 20,
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
  empty: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(33, 37, 41, 0.8)',
  },
  modal: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceCard: {
    width: '80%',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  priceListContainer: {
    marginBottom: 20,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  priceText: {
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    marginTop: 10,
  },
});

export default Services;
