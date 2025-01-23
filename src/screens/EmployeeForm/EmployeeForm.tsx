import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';

import type { Option } from '../../components/Dropdown/Dropdown';
import { color, font } from '@app/styles';
import {
  AppHeader,
  CalendarPickerTrigger,
  Dropdown,
  TextInput,
  Button,
  ConfirmationModal,
  Toast,
  LoadingAnimation,
  ErrorModal,
} from '@app/components';
import { ERR_NETWORK, IMAGES } from '@app/constant';
import { getCurrentDateAtMidnightUTC } from '@app/helpers';
import { useNativeBackHandler } from '@app/hooks';
import { EmployeeFormRouteProp, NavigationProp } from '../../types/navigation/types';
import { ScreenStatusProps } from 'src/types/services/types';
import { addEmployeeRequest, updateEmployeeRequest } from '@app/services';
import GlobalContext from '@app/context';

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

type ToastMessage = {
  message: string;
  toastType: 'success' | 'error';
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

const STATUS_OPTIONS = [
  {
    id: '1',
    icon: <Image source={IMAGES.ACTIVE_STATUS} resizeMode="contain" />,
    label: 'ACTIVE',
  },
  {
    id: '2',
    icon: <Image source={IMAGES.TERMINATED_STATUS} resizeMode="contain" />,
    label: 'TERMINATED',
  },
];

let formStatus: 'success' | 'error' = 'success';

const EmployeeForm = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const { type, employee } = useRoute<EmployeeFormRouteProp>().params;
  const initialFormValues: FormValues =
    type === 'Add'
      ? {
          firstName: '',
          lastName: '',
          birthDate: undefined,
          gender: undefined,
          contactNumber: undefined,
          employeeTitle: '',
          employeeStatus: undefined,
          dateStarted: undefined,
        }
      : {
          firstName: employee.firstName,
          lastName: employee.lastName,
          birthDate: employee.birthDate ? new Date(employee.birthDate) : undefined,
          gender: GENDER_OPTIONS.find((option) => option.label === employee.gender),
          contactNumber: employee.contactNumber,
          employeeTitle: employee.employeeTitle,
          employeeStatus: STATUS_OPTIONS.find((option) => option.label === employee.employeeStatus),
          dateStarted: employee.dateStarted ? new Date(employee.dateStarted) : undefined,
        };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<Errors>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });

  const onToastClose = () => setIsToastVisible(false);

  const isNotModified = (obj1: any, obj2: any): boolean => {
    if (Object.is(obj1, obj2)) {
      return true;
    }
    if (typeof obj1 !== typeof obj2) {
      return false;
    }
    if (typeof obj1 !== 'object' || obj1 === null || obj2 === null) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keys1.every((key) => isNotModified(obj1[key], obj2[key]));
  };

  useNativeBackHandler(() => {
    if (!isNotModified(formValues, initialFormValues)) {
      toggleConfirmModal();
      return true;
    } else {
      return false;
    }
  });

  const handleSubmit = () => {
    validationSchema
      .validate(formValues, { abortEarly: false })
      .then(async (_validData) => {
        setErrors({});

        if (type === 'Add') {
          await handleAddEmployee();
        } else {
          await handleUpdateEmployee();
        }
      })
      .catch((err) => {
        const errorMessages: Errors = err.inner.reduce((acc: Errors, curr: ValidationError) => {
          acc[curr.path as keyof FormValues] = curr.message;
          return acc;
        }, {});
        setErrors(errorMessages);
        formStatus = 'error';
        const toastData: ToastMessage = getToastMessage(type, formStatus);
        setMessage(toastData.message);
        setToastType(toastData.toastType);
        setIsToastVisible(true);
      });
  };

  const toggleConfirmModal = () => setIsModalVisible(!isModalVisible);

  const handleYes = () => {
    toggleConfirmModal();
    navigation.goBack();
  };

  const handleCancel = () => {
    if (!isNotModified(formValues, initialFormValues)) {
      toggleConfirmModal();
    } else {
      navigation.goBack();
    }
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

  const getToastMessage = (
    formType: 'Add' | 'Update',
    status: 'success' | 'error',
  ): ToastMessage => {
    if (formType === 'Add') {
      if (status === 'success') {
        return {
          message: 'Employee added successfully! You can add more if needed',
          toastType: 'success',
        };
      } else {
        return {
          message: 'Please complete the required fields before adding.',
          toastType: 'error',
        };
      }
    } else if (formType === 'Update') {
      if (status === 'success') {
        return {
          message: 'Employee details have been successfully updated!',
          toastType: 'success',
        };
      } else {
        return {
          message: 'Please complete the required fields before updating.',
          toastType: 'error',
        };
      }
    }
    return { message: 'Please complete the required fields before adding.', toastType: 'error' };
  };

  const handleAddEmployee = async () => {
    const {
      firstName,
      lastName,
      birthDate,
      gender,
      contactNumber,
      employeeTitle,
      employeeStatus,
      dateStarted,
    } = formValues;
    const genderValue = gender?.label;
    const employeeStatusValue = employeeStatus?.label;
    const formattedBirthDate = birthDate ? birthDate.toISOString().split('T')[0] : undefined;
    const formattedDateStarted = dateStarted ? dateStarted.toISOString().split('T')[0] : undefined;

    if (!genderValue || (genderValue !== 'MALE' && genderValue !== 'FEMALE')) {
      return;
    }

    if (!contactNumber) {
      return;
    }

    if (
      !employeeStatusValue ||
      (employeeStatusValue !== 'ACTIVE' && employeeStatusValue !== 'TERMINATED')
    ) {
      return;
    }

    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });

    const response = await addEmployeeRequest(
      user.accessToken,
      firstName,
      lastName,
      formattedBirthDate!,
      genderValue,
      contactNumber,
      employeeTitle,
      employeeStatusValue,
      formattedDateStarted!,
    );

    if (response.success && response.data) {
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
      const toastData: ToastMessage = getToastMessage(type, 'success');
      setMessage(toastData.message);
      setToastType(toastData.toastType);
      setIsToastVisible(true);
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    } else {
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  const handleUpdateEmployee = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const employeeIDValue = employee?.id;
    const contactNumberValue = formValues?.contactNumber;
    const employeeStatusValue = formValues?.employeeStatus?.label;

    if (
      !employeeStatusValue ||
      (employeeStatusValue !== 'ACTIVE' && employeeStatusValue !== 'TERMINATED')
    ) {
      return;
    }

    if (!employeeIDValue) {
      return;
    }

    if (!contactNumberValue) {
      return;
    }

    const response = await updateEmployeeRequest(
      employeeIDValue,
      user.accessToken,
      contactNumberValue,
      formValues.employeeTitle,
      employeeStatusValue,
    );

    if (response.success && response.data) {
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
      const toastData: ToastMessage = getToastMessage(type, 'success');
      setMessage(toastData.message);
      setToastType(toastData.toastType);
      setIsToastVisible(true);
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    } else {
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title={type === 'Update' ? 'Update Employee' : 'Add Employee'} />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <View style={styles.viewContainer}>
        <ErrorModal
          type={screenStatus.type}
          isVisible={screenStatus.hasError}
          onCancel={onCancel}
          onRetry={type === 'Add' ? handleAddEmployee : handleUpdateEmployee}
        />
        <ConfirmationModal
          type={type}
          isVisible={isModalVisible}
          onNo={toggleConfirmModal}
          onYes={handleYes}
        />
      </View>
      <Toast
        isVisible={isToastVisible}
        message={message}
        duration={3000}
        type={toastType}
        onClose={onToastClose}
      />
      <View style={styles.heading}>
        <Text style={styles.text}> {type === 'Update' ? 'Update Form' : 'Adding Form'}</Text>
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
          maxLength={64}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter Last Name"
          error={errors.lastName}
          value={formValues.lastName}
          onChangeText={(value) => handleInputChange('lastName', value)}
          onFocus={() => removeError('lastName')}
          readOnly={type === 'Update'}
          maxLength={64}
        />
        <CalendarPickerTrigger
          date={formValues.birthDate ?? date}
          label="Date of Birth"
          placeholder="Select Date of Birth"
          value={getDateValue('birthDate', formValues.birthDate)}
          error={errors.birthDate}
          onSelectedDate={(selectedDate) => handleCalendarChange('birthDate', selectedDate)}
          onPressOpen={() => removeError('birthDate')}
          isDisabled={type === 'Update'}
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
          isDisabled={type === 'Update'}
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
          maxLength={64}
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
          isDisabled={type === 'Update'}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            variant="secondary"
            buttonStyle={styles.button}
            textStyle={styles.textStyle}
            onPress={handleCancel}
          />
          <Button
            title={type === 'Add' ? 'Add' : 'Update'}
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
  viewContainer: {
    flex: 1,
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
