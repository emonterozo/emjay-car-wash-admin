import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Divider,
  Select,
  SelectItem,
  Input,
  Text,
  Button,
  useTheme,
  IndexPath,
} from '@ui-kitten/components';
import { format } from 'date-fns';

import { AppHeader, LoadingAnimation, MaterialCommunityIcon } from '@app/components';
import {
  CAR_SIZES,
  ERR_NETWORK,
  MOTORCYCLE_SIZES,
  SIZE_DESCRIPTION,
  VEHICLE_TYPES,
} from '@app/constant';
import { postOngoingServiceRequest } from '@app/services';
import { AddOngoingRouteProp, CarwashList, NavigationProp } from '../../types/navigation/types';

const AddOngoing = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AddOngoingRouteProp>().params;
  const [freeCarwashList, setFreeCarwashList] = useState<CarwashList[]>([]);
  const [selectedType, setSelectedType] = useState<IndexPath>(new IndexPath(0));
  const [selectedSize, setSelectedSize] = useState<IndexPath>(new IndexPath(0));
  const [description, setDescription] = useState('');
  const [plate, setPlate] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [screenStatus, setScreenStatus] = useState({
    isLoading: false,
    error: '',
  });

  useEffect(() => {
    if (route?.customerId && route?.freeCarwashList) {
      setFreeCarwashList(route.freeCarwashList);
    }
  }, [route]);

  const onVehicleTypeSelect = (index: IndexPath | IndexPath[]) => {
    setSelectedType(index as IndexPath);
    setSelectedSize(new IndexPath(0));
  };

  const getKeyByValue = (object: any, value: string) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const addOngoing = () => {
    setScreenStatus({ error: '', isLoading: true });
    const data = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      customer_id: route.customerId ?? '',
      first_name: route.firstName ?? '',
      last_name: route.lastName ?? '',
      vehicle_type: VEHICLE_TYPES[selectedType.row].toLowerCase(),
      vehicle_size: getKeyByValue(
        SIZE_DESCRIPTION,
        selectedType.row === 0 ? CAR_SIZES[selectedSize.row] : MOTORCYCLE_SIZES[selectedSize.row],
      ),
      model: description,
      plate_number: plate,
      contact_number: contactNumber,
      date: format(new Date(), 'MMMM dd, yyyy hh:mm a'),
      is_completed: false,
      pre_transaction: [],
    };
    postOngoingServiceRequest(data as any)
      .then(() => {
        setScreenStatus({ ...screenStatus, isLoading: false });
        navigation.replace('Ongoing');
      })
      .catch((error) => {
        setScreenStatus({
          isLoading: false,
          error: error.code === ERR_NETWORK ? 'network' : 'server',
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Add Ongoing Service" onBack={() => navigation.goBack()} />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      {route?.freeCarwashList && route.freeCarwashList.length > 0 && (
        <View style={styles.layout}>
          <Text category="h6">Free Carwash Details</Text>
          <Divider style={styles.divider} />
          <FlatList
            horizontal
            data={freeCarwashList}
            renderItem={({ item }) => (
              <View style={[styles.item, { backgroundColor: theme['color-primary-500'] }]}>
                <MaterialCommunityIcon name={item.icon} size={35} color="#ffffff" />
                <Text category="s2" style={styles.white}>
                  {item.description}
                </Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
          <Divider style={styles.divider} />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.content} bounces={false}>
        <Text category="h6">Customer Vehicle Details</Text>
        <Select
          label="Select Vehicle Type"
          value={VEHICLE_TYPES[selectedType.row]}
          selectedIndex={selectedType}
          onSelect={onVehicleTypeSelect}
        >
          {VEHICLE_TYPES.map((item) => (
            <SelectItem key={item} title={item} />
          ))}
        </Select>
        <Select
          label="Select Vehicle Size"
          value={
            selectedType.row === 0
              ? CAR_SIZES[selectedSize.row]
              : MOTORCYCLE_SIZES[selectedSize.row]
          }
          selectedIndex={selectedSize}
          onSelect={(index) => setSelectedSize(index as IndexPath)}
        >
          {(selectedType.row === 0 ? CAR_SIZES : MOTORCYCLE_SIZES).map((item) => (
            <SelectItem key={item} title={item} />
          ))}
        </Select>
        <Input
          label="Model"
          placeholder="Enter model"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Input
          label="Plate Number"
          placeholder="Enter plate number"
          value={plate}
          onChangeText={(text) => setPlate(text)}
        />
        <Input
          label="Contact Number"
          placeholder="Enter contact number"
          value={contactNumber}
          onChangeText={(text) => setContactNumber(text)}
        />
        <Button style={styles.button} onPress={addOngoing}>
          Submit
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  content: {
    paddingHorizontal: 20,
    gap: 15,
  },
  horizontalList: {
    gap: 7,
  },
  layout: {
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  divider: {
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 5,
    minWidth: 115,
  },
  white: {
    color: '#ffffff',
  },
});

export default AddOngoing;
