import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import { format } from 'date-fns';
import { useRoute } from '@react-navigation/native';

import type { Option } from '../../components/Dropdown/Dropdown';
import { color, font } from '@app/styles';
import { AppHeader, CalendarPickerTrigger, Dropdown, TextInput, Button } from '@app/components';
import { IMAGES } from '@app/constant';
import { getCurrentDateAtMidnightUTC } from '@app/helpers';
import { useNativeBackHandler } from '@app/hooks';
import { EmployeeFormRouteProp } from '../../types/navigation/types';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  birthDate: Yup.date().required('Birth date is required'),
  gender: Yup.object().required('Gender is required'),
  contactNumber: Yup.string()
    .required('Contact Number is required')
    .matches(
      /^09[0-9]{9}$/,
      'Contact Number must be 11 digits long, starting with "09", and contain only numbers',
    ),
  employeeTitle: Yup.string().required('Employee Title is required'),
  employeeStatus: Yup.object().required('Employee Status is required'),
  dateStarted: Yup.date().required('Date Started is required'),
});

const date = getCurrentDateAtMidnightUTC();

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
    label: 'Male',
  },
  {
    id: '2',
    icon: <Image source={IMAGES.FEMALE} resizeMode="contain" />,
    label: 'Female',
  },
];

const STATUS_OPTIONS = [
  {
    id: '1',
    icon: <Image source={IMAGES.ACTIVE_STATUS} resizeMode="contain" />,
    label: 'Active',
  },
  {
    id: '2',
    icon: <Image source={IMAGES.TERMINATED_STATUS} resizeMode="contain" />,
    label: 'Terminated',
  },
];

const EmployeeForm = () => {
  const { type } = useRoute<EmployeeFormRouteProp>().params;
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    birthDate: undefined,
    gender: undefined,
    contactNumber: undefined,
    employeeTitle: '',
    employeeStatus: undefined,
    dateStarted: undefined,
  });
  const [errors, setErrors] = useState<Errors>({});

  useNativeBackHandler(() => {
    return true;
  });

  const handleSubmit = () => {
    validationSchema
      .validate(formValues, { abortEarly: false })
      .then((_validData) => {
        setErrors({});
        //console.log('Form is valid:', validData);
      })
      .catch((err) => {
        const errorMessages: Errors = err.inner.reduce((acc: Errors, curr: ValidationError) => {
          acc[curr.path as keyof FormValues] = curr.message;
          return acc;
        }, {});
        setErrors(errorMessages);
      });
  };

  const handleInputChange = (key: string, value: string) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleDropdownChange = (key: string, value: Option) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleCalendarChange = (key: string, value: Date) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const getDateValue = (key: keyof typeof formValues, value: Date | undefined) => {
    return formValues[key] === undefined ? undefined : format(new Date(value!), 'MMMM dd, yyyy');
  };

  const removeError = (key: keyof typeof formValues) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[key];
      return newErrors;
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Add Employee" />
      <View style={styles.heading}>
        <Text style={styles.text}>Adding Form</Text>
      </View>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollViewContent}>
        <TextInput
          label="First Name"
          placeholder="Enter First Name"
          error={errors.firstName}
          value={formValues.firstName}
          onChangeText={(value) => handleInputChange('firstName', value)}
          onFocus={() => removeError('firstName')}
          readOnly={type === 'Update'}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter Last Name"
          error={errors.lastName}
          value={formValues.lastName}
          onChangeText={(value) => handleInputChange('lastName', value)}
          onFocus={() => removeError('lastName')}
        />
        <CalendarPickerTrigger
          date={formValues.birthDate ?? date}
          label="Date of Birth"
          placeholder="Select Date of Birth"
          value={getDateValue('birthDate', formValues.birthDate)}
          error={errors.birthDate}
          onSelectedDate={(selectedDate) => handleCalendarChange('birthDate', selectedDate)}
          onPressOpen={() => removeError('birthDate')}
        />
        <Dropdown
          label="Gender"
          placeholder="Select Gender"
          selected={formValues.gender}
          options={GENDER_OPTIONS}
          onSelected={(selectedOption) => handleDropdownChange('gender', selectedOption)}
          optionMinWidth={196}
          error={errors.gender}
          onToggleOpen={() => removeError('gender')}
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
        <TextInput
          label="Employee Title"
          placeholder="Enter Employee Title"
          error={errors.employeeTitle}
          value={formValues.employeeTitle}
          onChangeText={(value) => handleInputChange('employeeTitle', value)}
          onFocus={() => removeError('employeeTitle')}
        />
        <Dropdown
          label="Employee Status"
          placeholder="Select Status"
          selected={formValues.employeeStatus}
          options={STATUS_OPTIONS}
          onSelected={(selectedOption) => handleDropdownChange('employeeStatus', selectedOption)}
          optionMinWidth={212}
          error={errors.employeeStatus}
          onToggleOpen={() => removeError('employeeStatus')}
        />
        <CalendarPickerTrigger
          date={formValues.dateStarted ?? date}
          label="Date Started"
          placeholder="Select Date Started"
          value={getDateValue('dateStarted', formValues.dateStarted)}
          error={errors.dateStarted}
          onSelectedDate={(selectedDate) => handleCalendarChange('dateStarted', selectedDate)}
          onPressOpen={() => removeError('dateStarted')}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            variant="secondary"
            buttonStyle={styles.button}
            textStyle={styles.textStyle}
            onPress={() => {}}
          />
          <Button
            title="Add"
            variant="primary"
            buttonStyle={styles.button}
            textStyle={styles.textStyle}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 19,
    marginTop: 16,
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
});
export default EmployeeForm;
