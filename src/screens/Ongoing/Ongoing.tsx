import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Card,
  IndexPath,
  Layout,
  Modal,
  Select,
  SelectItem,
  Text,
  useTheme,
} from '@ui-kitten/components';
import axios from 'axios';

import {
  AppHeader,
  EmptyState,
  ErrorModal,
  LoadingAnimation,
  MaterialCommunityIcon,
} from '@app/components';
import { ERR_NETWORK, MOCK_EMPLOYEES, MOCK_SERVICES } from '@app/constant';
import { getOngoingServicesRequest } from '@app/services';
import { OngoingService } from '../../types/services/types';
import { NavigationProp } from '../../types/navigation/types';
import { ErrorModalProps } from '../../components/ErrorModal/ErrorModal';

type Price = {
  category: string;
  price: number;
};

type Service = {
  id: string;
  title: string;
  description: string;
  type: string;
  price_list: Price[];
};

const Ongoing = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [screenStatus, setScreenStatus] = useState({
    isLoading: false,
    error: '',
  });
  const [ongoing, setOngoing] = useState<OngoingService[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<IndexPath>(new IndexPath(0));
  const [selectedEmployees, setSelectedEmployees] = useState<IndexPath[]>([new IndexPath(0)]);
  const [selectedOngoing, setSelectedOngoing] = useState({
    id: '',
    size: '',
  });

  const fetchOngoing = () => {
    setScreenStatus({ error: '', isLoading: true });
    getOngoingServicesRequest()
      .then((response) => {
        setScreenStatus({ ...screenStatus, isLoading: false });
        setOngoing(response);
      })
      .catch((error) => {
        setScreenStatus({
          isLoading: false,
          error: error.code === ERR_NETWORK ? 'network' : 'server',
        });
      });
  };

  useEffect(() => {
    fetchOngoing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderOngoingItem = ({ item }: { item: OngoingService }) => {
    return (
      <Card
        style={styles.card}
        status="primary"
        onPress={() => navigation.navigate('PreTransaction', { id: item.id })}
      >
        <View style={styles.header}>
          <Text category="h5" style={styles.customerName}>
            {item.first_name.length > 0
              ? `${item.first_name} ${item.last_name}`
              : 'Walk-in Customer'}
          </Text>
          <MaterialCommunityIcon
            name={item.vehicle_type === 'car' ? 'car-hatchback' : 'motorbike'}
            size={30}
            color="#04528E"
          />
        </View>
        <Text category="s1" style={styles.detailText}>
          {`Model: ${item.model} (${item.vehicle_size})`}
        </Text>
        <Text category="s1" style={styles.detailText}>
          Plate Number: {item.plate_number}
        </Text>
        <Text category="s1" style={styles.detailText}>
          Check In: {item.check_in}
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            size="small"
            style={styles.button}
            onPress={() => handlePressAddService(item.id, item.vehicle_type, item.vehicle_size)}
          >
            Add Service
          </Button>
          <Button
            size="small"
            style={styles.button}
            status="danger"
            disabled={!item.is_completed}
            onPress={() => {}}
          >
            Close
          </Button>
        </View>
      </Card>
    );
  };

  const handlePressFab = () =>
    navigation.navigate('AddOngoing', {
      customerId: undefined,
      firstName: undefined,
      lastName: undefined,
      freeCarwashList: [],
    });

  const handlePressAddService = (id: string, vehicle_type: string, vehicle_size: string) => {
    setSelectedOngoing({ id: id, size: vehicle_size });
    const filteredServices = MOCK_SERVICES.filter((item) => item.type === vehicle_type);
    setServices(filteredServices);
    setIsFormVisible(true);
  };

  const displayEmployees = selectedEmployees.map((index) => {
    return MOCK_EMPLOYEES[index.row].full_name;
  });

  const handlePressSubmit = () => {
    setIsFormVisible(false);
    const service = services[selectedService.row].price_list.find(
      (item) => item.category === selectedOngoing.size,
    );
    const amount = service?.price ?? services[selectedService.row].price_list[0].price;

    const data = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      service: services[selectedService.row].title,
      amount: amount,
      company_earnings: amount * 0.6,
      employee_share: amount * 0.4,
      assigned_employee: displayEmployees,
    };

    const updatedOngoing = ongoing.find((item) => item.id === selectedOngoing.id);

    updatedOngoing?.pre_transaction.push(data);

    axios
      .put(`https://2328-136-158-61-91.ngrok-free.app/ongoing/${selectedOngoing.id}`, {
        ...updatedOngoing,
      })
      .then((_response) => {
        setServices([]);
        setSelectedOngoing({ id: '', size: '' });
        setSelectedService(new IndexPath(0));
        setSelectedEmployees([new IndexPath(0)]);
      })
      .catch((_error) => {});
  };

  const handlePressBack = () => {
    setScreenStatus({ ...screenStatus, error: '' });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Ongoing Services" onBack={handlePressBack} />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        isVisible={screenStatus.error !== ''}
        variant={screenStatus.error as ErrorModalProps['variant']}
        onRetry={fetchOngoing}
        onCancel={handlePressBack}
      />
      <FlatList
        data={ongoing}
        renderItem={renderOngoingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContainer, ongoing.length === 0 && styles.empty]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState />}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme['color-primary-500'] }]}
        onPress={handlePressFab}
      >
        <MaterialCommunityIcon name="plus" size={50} color="#ffffff" />
      </TouchableOpacity>
      <Modal
        visible={isFormVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setIsFormVisible(false)}
      >
        <Layout style={styles.modalContent}>
          <Text category="h6" style={styles.modalTitle}>
            Fill the Form
          </Text>
          <Select
            style={styles.select}
            label="Select Service"
            value={services.length > 0 ? services[selectedService.row].title : undefined}
            selectedIndex={selectedService}
            onSelect={(index) => setSelectedService(index as IndexPath)}
          >
            {services.map((item) => (
              <SelectItem key={item.id} title={item.title} />
            ))}
          </Select>
          <Select
            style={styles.select}
            multiSelect
            label="Select Employees"
            value={displayEmployees.join(', ')}
            selectedIndex={selectedEmployees}
            onSelect={(index) => setSelectedEmployees(index as IndexPath[])}
          >
            {MOCK_EMPLOYEES.map((item) => (
              <SelectItem key={item.id} title={item.full_name} />
            ))}
          </Select>
          <Button style={styles.submitButton} onPress={handlePressSubmit}>
            Submit
          </Button>
        </Layout>
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
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 5,
    padding: 16,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 10,
  },
  customerName: {
    flex: 1,
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
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  empty: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: Dimensions.get('screen').width - 25,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  select: {
    marginBottom: 15,
  },
  submitButton: {
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default Ongoing;
