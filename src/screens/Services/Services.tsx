import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Text, useTheme } from '@ui-kitten/components';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import {
  AppHeader,
  EmptyState,
  ErrorModal,
  LoadingAnimation,
  MaterialCommunityIcon,
} from '@app/components';
import { getServicesRequest } from '@app/services';
import { ERR_NETWORK } from '@app/constant';
import { Service, ServicePrice } from '../../types/services/types';
import { ErrorModalProps } from '../../components/ErrorModal/ErrorModal';

const Services = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [screenStatus, setScreenStatus] = useState({
    isLoading: false,
    error: '',
  });
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<ServicePrice[]>([]);

  const fetchServices = () => {
    setScreenStatus({ error: '', isLoading: true });
    getServicesRequest()
      .then((response) => {
        setScreenStatus({ ...screenStatus, isLoading: false });
        setServices(response);
      })
      .catch((error) => {
        setScreenStatus({
          isLoading: false,
          error: error.code === ERR_NETWORK ? 'network' : 'server',
        });
      });
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePressBack = () => {
    setScreenStatus({ ...screenStatus, error: '' });
    navigation.goBack();
  };

  const handlePressClose = () => setSelectedServices([]);

  const renderItem = ({ item }: { item: Service }) => (
    <Card
      style={styles.card}
      status="primary"
      onPress={() => setSelectedServices(item.price_list)}
      activeOpacity={0.6}
    >
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <MaterialCommunityIcon
            name={item.type === 'car' ? 'car-hatchback' : 'motorbike'}
            size={32}
            color={theme['color-info-500']}
          />
          <Text category="h5" status="info" style={styles.headerTitle}>
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
      <ErrorModal
        isVisible={screenStatus.error !== ''}
        variant={screenStatus.error as ErrorModalProps['variant']}
        onRetry={fetchServices}
        onCancel={handlePressBack}
      />
      <AppHeader title="Services" onBack={handlePressBack} />
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
          <Button style={styles.closeButton} status="info" onPress={handlePressClose}>
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
