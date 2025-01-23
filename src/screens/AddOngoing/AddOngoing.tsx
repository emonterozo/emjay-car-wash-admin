import React, { useState } from 'react';
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

import type { Option } from '../../components/Dropdown/Dropdown';
import { color, font } from '@app/styles';
import { AppHeader, Dropdown, TextInput, Button, SizeDisplay } from '@app/components';
import { IMAGES } from '@app/constant';
import { CarIcon, MotorcycleIcon } from '@app/icons';

type FormValues = {
  firstName: string;
  lastName: string;
  birthDate: Date | undefined;
  gender: Option | undefined;
  contactNumber: string | undefined;
  employeeTitle: string;
  employeeStatus: Option | undefined;
  dateStarted: Date | undefined;
};

type Errors = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof FormValues]?: string;
};

const GENDER_OPTIONS = [
  {
    id: '1',
    icon: <Image source={IMAGES.MALE} resizeMode="contain" />,
    label: 'MALE',
  },
  {
    id: '2',
    icon: <Image source={IMAGES.FEMALE} resizeMode="contain" />,
    label: 'FEMALE',
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

const FREE_WASH = [
  { type: 'car', size: 'sm' },
  { type: 'car', size: 'md' },
  { type: 'motorcycle', size: 'md' },
];

const AddOngoing = () => {
  const initialFormValues: FormValues = {
    firstName: '',
    lastName: '',
    birthDate: undefined,
    gender: undefined,
    contactNumber: undefined,
    employeeTitle: '',
    employeeStatus: undefined,
    dateStarted: undefined,
  };
  const [selectedVehicle, setSelectedVehicle] = useState('car');
  const [sizeCount, setSizeCount] = useState({
    car: [10, 0, 0, 0, 0],
    motorcycle: [10, 0, 0],
  });
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (key: string, value: string) => {
    setFormValues({ ...formValues, [key]: value });
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

  const handleSelectVehicle = (vehicle: string) => {
    setSelectedVehicle(vehicle);
    setSizeCount({
      car: [10, 0, 0, 0, 0],
      motorcycle: [10, 0, 0],
    });
  };

  const onSelectSize = (type: keyof typeof sizeCount, index: number) => {
    const newSizeCount = { ...sizeCount };
    newSizeCount[type] = newSizeCount[type].map(() => 0);
    newSizeCount[type][index] = 10;
    setSizeCount(newSizeCount);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Add Ongoing" />
      <View style={styles.heading}>
        <Text style={styles.text}>Free Carwash Details</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.washList}
        contentContainerStyle={styles.washContainer}
      >
        {FREE_WASH.map((item, index) => (
          <View key={index} style={styles.washCard}>
            <View style={styles.tag}>
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
                onPress={() => handleSelectVehicle(option.key)}
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
          label="Model"
          placeholder="Enter Model"
          error={errors.firstName}
          value={formValues.firstName}
          onChangeText={(value) => handleInputChange('firstName', value)}
          onFocus={() => removeError('firstName')}
          maxLength={64}
        />
        <TextInput
          label="Plate Number"
          placeholder="Enter Plate Number"
          error={errors.lastName}
          value={formValues.lastName}
          onChangeText={(value) => handleInputChange('lastName', value)}
          onFocus={() => removeError('lastName')}
          maxLength={64}
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
        <Dropdown
          label="Services"
          placeholder="Select Services"
          selected={formValues.gender}
          options={GENDER_OPTIONS}
          onSelected={(selectedOption) => handleDropdownChange('gender', selectedOption)}
          optionMinWidth={196}
          error={errors.gender}
          onToggleOpen={() => removeError('gender')}
        />
        <Button
          title="Submit"
          variant="primary"
          buttonStyle={styles.button}
          textStyle={styles.textStyle}
          onPress={() => {}}
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
    backgroundColor: color.primary, //FB8500
    borderRadius: 8,
    minWidth: 50,
  },
});
export default AddOngoing;
