import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AddOngoingRouteProp, NavigationProp } from '../../types/navigation/types';
import {
  CreateOngoingTransactionPayload,
  ScreenStatusProps,
  Service,
  ServiceChargeType,
} from '../../types/services/types';
import { ModalDropdownOption } from '../../components/ModalDropdown/ModalDropdown';
import type { Option } from '../../components/Dropdown/Dropdown';
import { color, font } from '@app/styles';
import {
  AppHeader,
  Dropdown,
  TextInput,
  Button,
  SizeDisplay,
  LoadingAnimation,
  ErrorModal,
  ModalDropdown,
  Toast,
} from '@app/components';
import { ERR_NETWORK, IMAGES } from '@app/constant';
import { CarIcon, MotorcycleIcon } from '@app/icons';
import { createOngoingTransactionRequest, getServicesRequest } from '@app/services';
import GlobalContext from '@app/context';
import { formattedNumber } from '@app/helpers';

type FormValues = {
  vehicleModel: string | undefined;
  plateNumber: string | undefined;
  service: string[];
  serviceCharge: Option | undefined;
  contactNumber: string | undefined;
};

type Errors = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof FormValues]?: string;
};

const SERVICE_CHARGE_OPTION = [
  {
    id: '1',
    icon: <Image source={IMAGES.FREE} resizeMode="contain" />,
    label: 'Free',
  },
  {
    id: '2',
    icon: <Image source={IMAGES.NOT_FREE} resizeMode="contain" />,
    label: 'Not Free',
  },
];

const OPTIONS = [
  {
    key: 'car',
    active: <CarIcon width={60} height={60} fill={color.primary} />,
    inactive: <CarIcon width={60} height={60} fill="#888888" />,
  },
  {
    key: 'motorcycle',
    active: <MotorcycleIcon width={60} height={60} fill={color.primary} />,
    inactive: <MotorcycleIcon width={60} height={60} fill="#888888" />,
  },
];

const size = {
  car: ['SM', 'MD', 'LG', 'XL', 'XXL'],
  motorcycle: ['SM', 'MD', 'LG'],
};

const validationSchema = Yup.object({
  vehicleModel: Yup.string().required('Vehicle model is required'),
  plateNumber: Yup.string().required('Plate number is required'),
  service: Yup.array().required('Service array is required').min(1, 'Service is required'),
  serviceCharge: Yup.object().required('Service charge is required'),
  contactNumber: Yup.string().matches(
    /^09[0-9]{9}$/,
    'Contact Number must be 11 digits long, starting with "09", and contain only numbers',
  ),
});

const AddOngoing = () => {
  const { customerId, freeWash, selectedServices, transactionId } =
    useRoute<AddOngoingRouteProp>().params;
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const initialFormValues: FormValues = {
    vehicleModel: undefined,
    plateNumber: undefined,
    service: [],
    serviceCharge: SERVICE_CHARGE_OPTION[1],
    contactNumber: undefined,
  };
  const [sizeCount, setSizeCount] = useState({
    car: [10, 0, 0, 0, 0],
    motorcycle: [10, 0, 0],
  });
  const [selectedVehicle, setSelectedVehicle] = useState<keyof typeof size>('car');
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<Errors>({});
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [services, setServices] = useState<Service[]>([]);
  const [serviceSelection, setServiceSelection] = useState<ModalDropdownOption[]>([]);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string }>({
    type: 'success',
    message: '',
  });

  const fetchServices = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getServicesRequest(user.accessToken, '_id', 'asc');

    if (response.success && response.data) {
      setServices(response.data.services);
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    } else {
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  const getSelectedVehicleSize = () => {
    const selectedSizeIndex = sizeCount[selectedVehicle].findIndex((item) => item === 10);
    const selectedSize = size[selectedVehicle][selectedSizeIndex].toLowerCase();

    return selectedSize;
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //selectedServices, should still return service with no specific size

    const filteredServices = services
      .filter((service) => service.type === selectedVehicle)
      .map((service) => {
        const price = service.price_list.find(
          (item) => item.size === getSelectedVehicleSize(),
        )?.price;

        return {
          id: service.id,
          image: service.image,
          title: service.title,
          description: formattedNumber(price ?? service.price_list[0].price),
          value: price,
        };
      });

    setServiceSelection(filteredServices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, selectedServices, selectedVehicle, sizeCount]);

  const handleInputChange = (key: keyof typeof initialFormValues, value: string) => {
    setFormValues({ ...formValues, [key]: key === 'plateNumber' ? value.toUpperCase() : value });
  };

  const handleDropdownChange = (key: string, value: Option) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const removeError = (key: keyof typeof formValues) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[key];
      return newErrors;
    });
  };

  const handleSelectVehicle = (vehicle: keyof typeof sizeCount) => {
    setSelectedVehicle(vehicle);
    setSizeCount({
      car: [10, 0, 0, 0, 0],
      motorcycle: [10, 0, 0],
    });
    setFormValues({ ...formValues, service: [] });
  };

  const onSelectSize = (type: keyof typeof sizeCount, index: number) => {
    const newSizeCount = { ...sizeCount };
    newSizeCount[type] = newSizeCount[type].map(() => 0);
    newSizeCount[type][index] = 10;
    setSizeCount(newSizeCount);
  };

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  const handleSubmit = () => {
    validationSchema
      .validate(formValues, { abortEarly: false })
      .then(async () => {
        setErrors({});
        const { vehicleModel, plateNumber, serviceCharge, service } = formValues;
        const selectedSize = getSelectedVehicleSize();
        const selectedServiceId = service[0];
        const price = serviceSelection.find((item) => item.id === selectedServiceId)?.value;

        if (transactionId === null) {
          const payload: CreateOngoingTransactionPayload = {
            vehicle_type: selectedVehicle,
            vehicle_size: selectedSize,
            model: vehicleModel!,
            plate_number: plateNumber!,
            service_id: selectedServiceId,
            price: price as number,
            service_charge: serviceCharge?.label.toLowerCase() as ServiceChargeType,
          };
          if (customerId !== null) {
            payload.customer_id = customerId;
          }

          setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
          const response = await createOngoingTransactionRequest(user.accessToken, payload);
          if (response.success && response.data) {
            setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
            setToast({
              message: 'Service have been added successfully!',
              type: 'success',
            });
            setIsToastVisible(true);
            setTimeout(() => {
              navigation.replace('Ongoing');
            }, 3000);
          } else {
            setScreenStatus({
              isLoading: false,
              type: response.error === ERR_NETWORK ? 'connection' : 'error',
              hasError: true,
            });
          }
        } else {
          // TODO: add availed service to existing transaction
        }
      })
      .catch((err) => {
        const errorMessages: Errors = err.inner.reduce((acc: Errors, curr: ValidationError) => {
          acc[curr.path as keyof FormValues] = curr.message;
          return acc;
        }, {});
        setErrors(errorMessages);
        setIsToastVisible(true);
        setToast({
          message: 'Please complete the required fields before adding.',
          type: 'error',
        });
      });
  };

  const onToastClose = () => setIsToastVisible(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Add Ongoing" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchServices}
      />
      <Toast
        isVisible={isToastVisible}
        message={toast.message}
        duration={3000}
        type={toast.type}
        onClose={onToastClose}
      />
      {freeWash.length > 0 && (
        <>
          <View style={styles.heading}>
            <Text style={styles.text}>Free Carwash Details</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.washList}
            contentContainerStyle={styles.washContainer}
          >
            {freeWash.map((item, index) => (
              <View key={index} style={styles.washCard}>
                <View style={[styles.tag, item.type === 'motorcycle' && styles.motorcycle]}>
                  <Text style={styles.size}>{item.size.toUpperCase()}</Text>
                </View>
                {item.type === 'car' ? (
                  <CarIcon width={60} height={60} fill={color.primary} />
                ) : (
                  <MotorcycleIcon width={60} height={60} fill={color.primary} />
                )}
              </View>
            ))}
          </ScrollView>
        </>
      )}
      <View style={styles.heading}>
        <Text style={styles.text}>Customer Vehicle Details</Text>
      </View>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollViewContent}>
        <View>
          <Text style={styles.label}>Select Vehicle Type</Text>
          <View style={styles.cardContainer}>
            {OPTIONS.map((option) => (
              <TouchableOpacity
                style={[
                  styles.card,
                  option.key === selectedVehicle && { shadowColor: color.primary },
                ]}
                key={option.key}
                onPress={() => handleSelectVehicle(option.key as keyof typeof size)}
              >
                {option.key === selectedVehicle ? option.active : option.inactive}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View>
          <Text style={styles.label}>Select Vehicle Size</Text>
          {selectedVehicle === 'car' && (
            <SizeDisplay
              sizes={size.car}
              values={sizeCount.car}
              isCountVisible={false}
              onPress={(index) => onSelectSize('car', index)}
            />
          )}
          {selectedVehicle === 'motorcycle' && (
            <SizeDisplay
              sizes={size.motorcycle}
              values={sizeCount.motorcycle}
              isCountVisible={false}
              onPress={(index) => onSelectSize('motorcycle', index)}
            />
          )}
        </View>
        <TextInput
          label="Vehicle Model"
          placeholder="Enter Vehicle Model"
          error={errors.vehicleModel}
          value={formValues.vehicleModel}
          onChangeText={(value) => handleInputChange('vehicleModel', value)}
          onFocus={() => removeError('vehicleModel')}
          maxLength={64}
        />
        <TextInput
          label="Plate Number"
          placeholder="Enter Plate Number"
          error={errors.plateNumber}
          value={formValues.plateNumber}
          onChangeText={(value) => handleInputChange('plateNumber', value)}
          onFocus={() => removeError('plateNumber')}
          maxLength={64}
        />
        <ModalDropdown
          label="Service"
          placeholder="Select Service"
          selected={formValues.service}
          options={serviceSelection}
          onSelected={(selected) => setFormValues({ ...formValues, service: selected })}
          error={errors.service}
          onToggleOpen={() => removeError('service')}
          title="Select Service"
        />
        <Dropdown
          label="Service Charge"
          placeholder="Select Services"
          selected={formValues.serviceCharge}
          options={SERVICE_CHARGE_OPTION}
          onSelected={(selectedOption) => handleDropdownChange('serviceCharge', selectedOption)}
          optionMinWidth={196}
          error={errors.serviceCharge}
          onToggleOpen={() => removeError('serviceCharge')}
        />
        <TextInput
          label="Contact Number"
          placeholder="Enter Contact Number"
          error={errors.contactNumber}
          value={formValues.contactNumber}
          onChangeText={(value) => handleInputChange('contactNumber', value)}
          keyboardType="numeric"
          onFocus={() => removeError('contactNumber')}
        />
        <Button
          title="Submit"
          variant="primary"
          buttonStyle={styles.button}
          textStyle={styles.textStyle}
          onPress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  heading: {
    alignItems: 'flex-start',
    marginVertical: 24,
    paddingHorizontal: 25,
  },
  text: {
    ...font.regular,
    fontSize: 16,
    color: '#696969',
    lineHeight: 16,
  },
  scrollViewContent: {
    gap: 24,
    paddingBottom: 62,
    paddingHorizontal: 25,
  },
  button: {
    paddingHorizontal: 23,
    paddingVertical: 18,
    borderRadius: 24,
  },
  textStyle: {
    ...font.regular,
    fontSize: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: '#F3F2EF',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    padding: 35,
    justifyContent: 'center',
    height: 100,
  },
  label: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
    color: color.black,
  },
  washContainer: {
    paddingHorizontal: 25,
    gap: 16,
    alignItems: 'center',
  },
  washList: {
    height: 200,
  },
  washCard: {
    backgroundColor: '#F3F2EF',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    padding: 35,
    justifyContent: 'center',
    height: 100,
  },
  size: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: color.background,
    alignSelf: 'center',
  },
  tag: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: color.primary,
    borderRadius: 8,
    minWidth: 50,
  },
  motorcycle: {
    backgroundColor: '#FB8500',
  },
});
export default AddOngoing;
