import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Option } from '../../components/Dropdown/Dropdown';
import { AvailedServiceFormRouteProp, NavigationProp } from '../../types/navigation/types';
import {
  Employees,
  ScreenStatusProps,
  UpdateAvailedServicePayload,
} from '../../types/services/types';
import { ModalDropdownOption } from '../../components/ModalDropdown/ModalDropdown';
import { color, font } from '@app/styles';
import {
  AppHeader,
  ErrorModal,
  LoadingAnimation,
  TextInput,
  Dropdown,
  Button,
  Toast,
  ModalDropdownTrigger,
  ConfirmationModal,
} from '@app/components';
import { ERR_NETWORK, IMAGES, LIMIT } from '@app/constant';
import { useNativeBackHandler } from '@app/hooks';
import { getEmployeesRequest, updateAvailedServiceRequest } from '@app/services';
import GlobalContext from '@app/context';

const validationSchema = Yup.object({
  deduction: Yup.number()
    .typeError('Deduction must be a valid number')
    .integer('Deduction must be a whole number')
    .min(0, 'Deduction cannot be negative'),
  discount: Yup.number()
    .typeError('Discount must be a valid number')
    .integer('Discount must be a whole number')
    .min(0, 'Discount cannot be negative'),
});

type FormValues = {
  title: string;
  price: number;
  deduction: number;
  discount: number;
  companyEarnings: number;
  employees?: string[];
  employeeShare: number;
  serviceCharge: Option | undefined;
  status: Option | undefined;
  paymentStatus: Option | undefined;
  startDateTime: string | undefined;
  endDateTime: string | undefined;
};

type ToastMessage = {
  message: string;
  toastType: 'success' | 'error';
};

type Errors = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof FormValues]?: string;
};

const SERVICE_STATUS_OPTIONS = [
  {
    id: '1',
    icon: <Image source={IMAGES.PENDING} resizeMode="contain" />,
    label: 'PENDING',
  },
  {
    id: '2',
    icon: <Image source={IMAGES.ONGOING} resizeMode="contain" />,
    label: 'ONGOING',
  },
  {
    id: '3',
    icon: <Image source={IMAGES.ACTIVE_STATUS} resizeMode="contain" />,
    label: 'DONE',
  },
  {
    id: '4',
    icon: <Image source={IMAGES.CANCELLED} resizeMode="contain" />,
    label: 'CANCEL',
  },
];

const SERVICE_CHARGE_OPTIONS = [
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

const ICON_GENDER = [
  {
    id: '1',
    icon: Image.resolveAssetSource(IMAGES.AVATAR_BOY).uri,
    label: 'MALE',
  },
  {
    id: '2',
    icon: Image.resolveAssetSource(IMAGES.AVATAR_GIRL).uri,
    label: 'FEMALE',
  },
];

const PAYMENT_STATUS_OPTIONS = [
  {
    id: '1',
    icon: <Image source={IMAGES.PAID} resizeMode="contain" />,
    label: 'Paid',
  },
  {
    id: '2',
    icon: <Image source={IMAGES.NOT_YET_PAID} resizeMode="contain" />,
    label: 'Not Yet Paid',
  },
];

let formStatus: 'success' | 'error' = 'success';

const AvailedServiceForm = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const { service } = useRoute<AvailedServiceFormRouteProp>().params;
  const [employees, setEmployees] = useState<Employees[]>([]);
  const [employeeSelection, setEmployeeSelection] = useState<ModalDropdownOption[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [filteredServiceStatusOption, setFilteredServiceStatusOption] =
    useState(SERVICE_STATUS_OPTIONS);

  const initialFormValues: FormValues = {
    title: service.title,
    price: service.price,
    discount: service.discount,
    deduction: service.deduction,
    companyEarnings: service.companyEarnings,
    employees: service.assignedEmployees,
    employeeShare: service.employeeShare,
    serviceCharge:
      SERVICE_CHARGE_OPTIONS.find((option) =>
        service.serviceCharge ? option.label === 'Free' : option.label === 'Not Free',
      ) || undefined,
    status:
      SERVICE_STATUS_OPTIONS.find((option) => {
        const status =
          service.status.toLowerCase() === 'cancelled' ? 'cancel' : service.status.toLowerCase();
        switch (status) {
          case 'ongoing':
            return option.label === 'ONGOING';
          case 'pending':
            return option.label === 'PENDING';
          case 'done':
            return option.label === 'DONE';
          case 'cancel':
            return option.label === 'CANCEL';
          default:
            return false;
        }
      }) || undefined,
    paymentStatus:
      PAYMENT_STATUS_OPTIONS.find((option) =>
        service.paymentStatus ? option.label === 'Paid' : option.label === 'Not Yet Paid',
      ) || undefined,
    startDateTime: service.startDateTime || '',
    endDateTime: service.endDateTime || '',
  };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<Errors>({});

  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });

  const onToastClose = () => setIsToastVisible(false);
  const toggleConfirmModal = () => setIsModalVisible(!isModalVisible);

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

  const fetchEmployees = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getEmployeesRequest(user.accessToken, '_id', 'asc', LIMIT, 0);

    if (response.success && response.data) {
      setEmployees(response.data.employees);
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    } else {
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filteredEmployees = employees
      .filter((employee) => employee.employee_status === 'ACTIVE')
      .map((employee) => {
        return {
          id: employee._id,
          image: employee.gender === 'MALE' ? ICON_GENDER[0].icon : ICON_GENDER[1].icon,
          title: `${employee.first_name} ${employee.last_name}`,
          description: employee.employee_title,
          value: employee._id,
        };
      });

    setEmployeeSelection(filteredEmployees);
  }, [employees]);

  useEffect(() => {
    // Filter based on service status
    switch (service.status.toLowerCase()) {
      case 'ongoing':
        setFilteredServiceStatusOption(
          SERVICE_STATUS_OPTIONS.filter(
            (option) =>
              option.label === 'DONE' || option.label === 'ONGOING' || option.label === 'CANCEL',
          ),
        );
        break;
      case 'pending':
        setFilteredServiceStatusOption(
          SERVICE_STATUS_OPTIONS.filter(
            (option) =>
              option.label === 'CANCEL' || option.label === 'ONGOING' || option.label === 'PENDING',
          ),
        );
        break;
      case 'done':
        setFilteredServiceStatusOption(
          SERVICE_STATUS_OPTIONS.filter(
            (option) => option.label === 'DONE' || option.label === 'CANCEL',
          ),
        );
        break;
      case 'cancelled':
        setFilteredServiceStatusOption(
          SERVICE_STATUS_OPTIONS.filter(
            (option) =>
              option.label === 'ONGOING' || option.label === 'PENDING' || option.label === 'CANCEL',
          ),
        );
        break;
      default:
        setFilteredServiceStatusOption(SERVICE_STATUS_OPTIONS);
        break;
    }
  }, [service.status]);

  useEffect(() => {
    if (formValues.serviceCharge?.label === 'Free') {
      setFormValues((prev) => {
        const newPrice = Number(prev.price);
        return {
          ...prev,
          discount: newPrice,
          companyEarnings: 0,
        };
      });
    } else {
      setFormValues((prev) => ({
        ...prev,
        discount: prev.discount === prev.price ? 0 : prev.discount,
      }));
    }
  }, [formValues.serviceCharge, formValues.price]);

  useEffect(() => {
    if (formValues.serviceCharge?.label !== 'Free') {
      const value = formValues.price - formValues.deduction;
      const companyEarningsBeforeDiscount = value * 0.6;
      const companyEarnings = companyEarningsBeforeDiscount - formValues.discount;

      setFormValues((prev) => ({
        ...prev,
        companyEarnings: Math.max(Math.round(companyEarnings), 0),
        employeeShare: Math.round(value * 0.4),
      }));
    }
  }, [formValues.price, formValues.deduction, formValues.discount, formValues.serviceCharge]);

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

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
    let validValue =
      value === '' || !isNaN(parseFloat(value))
        ? value
        : formValues[key as keyof FormValues]?.toString() || '';

    let updatedValues = { ...formValues, [key]: validValue };

    if (key === 'deduction') {
      const price = parseFloat(formValues.price?.toString() || '0') || 0;
      const deduction = parseFloat(validValue || '0') || 0;
      const discount = parseFloat(formValues.discount?.toString() || '0') || 0;

      const computedCompanyEarnings = Math.round((price - deduction) * 0.6 - discount);
      const computedEmployeeShare = Math.round((price - deduction) * 0.4);

      updatedValues.companyEarnings = computedCompanyEarnings < 0 ? 0 : computedCompanyEarnings;
      updatedValues.employeeShare = computedEmployeeShare;
    }

    if (key === 'discount') {
      const discount = parseFloat(validValue || '0') || 0;
      let companyEarnings = parseFloat(formValues.companyEarnings?.toString() || '0') || 0;

      companyEarnings -= discount;
      companyEarnings = companyEarnings < 0 ? 0 : companyEarnings;

      updatedValues.companyEarnings = Math.round(companyEarnings);
    }

    setFormValues(updatedValues);
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

  const getToastMessage = (status: 'success' | 'error'): ToastMessage => {
    if (status === 'success') {
      return {
        message: 'Availed service details have been successfully updated!',
        toastType: 'success',
      };
    } else {
      return {
        message: 'Please complete the required fields before updating.',
        toastType: 'error',
      };
    }
  };

  const handleSubmit = () => {
    validationSchema
      .validate(formValues, { abortEarly: false })
      .then(async (_validData) => {
        setErrors({});
        await handleUpdateAvailedService();
      })
      .catch((err) => {
        const errorMessages: Errors = err.inner.reduce((acc: Errors, curr: ValidationError) => {
          acc[curr.path as keyof FormValues] = curr.message;
          return acc;
        }, {});
        setErrors(errorMessages);
        formStatus = 'error';
        const toastData: ToastMessage = getToastMessage(formStatus);
        setMessage(toastData.message);
        setToastType(toastData.toastType);
        setIsToastVisible(true);
      });
  };

  const handleUpdateAvailedService = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });

    const formattedServiceCharge = formValues.serviceCharge?.label === 'Free';
    const formattedPaymentStatus = formValues.paymentStatus?.label === 'Paid';
    const formattedStatus =
      formValues.status?.label === 'CANCEL' ? 'CANCELLED' : formValues.status?.label;

    const payload: UpdateAvailedServicePayload = {
      discount: Number(formValues.discount),
      deduction: Number(formValues.deduction),
      is_free: formattedServiceCharge,
      is_paid: formattedPaymentStatus,
      status: formattedStatus!,
    };

    if ((formValues.employees ?? []).length > 0) {
      payload.assigned_employees = formValues.employees;
    }

    const response = await updateAvailedServiceRequest(
      service.transactionId,
      service.transactionServiceId,
      user.accessToken,
      payload,
    );

    if (response.success && response.data) {
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
      const toastData: ToastMessage = getToastMessage('success');
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

  const onRetry = () => {
    if (employees.length > 0) {
      handleSubmit();
    } else {
      fetchEmployees();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Availed Services" onBack={handleCancel} />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={onRetry}
      />
      <Toast
        isVisible={isToastVisible}
        message={message}
        duration={3000}
        type={toastType}
        onClose={onToastClose}
      />
      <ConfirmationModal
        type={'UpdateAvailedService'}
        isVisible={isModalVisible}
        onNo={toggleConfirmModal}
        onYes={handleYes}
      />
      <View style={styles.heading}>
        <Text style={styles.text}> {'Availed Service Edit Form'}</Text>
      </View>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollViewContent}>
        <TextInput
          label="Service Name"
          placeholder="Service Name"
          value={formValues.title.toString()}
          readOnly={true}
        />
        <TextInput
          label="Price"
          placeholder="Price"
          value={formValues.price.toString()}
          readOnly={true}
        />
        <TextInput
          label="Discount"
          placeholder="Discount"
          error={errors.discount}
          value={formValues.discount.toString()}
          onChangeText={(value) => handleInputChange('discount', value)}
          onFocus={() => removeError('discount')}
          keyboardType="number-pad"
          readOnly={formValues.serviceCharge?.label === 'Free'}
        />

        <TextInput
          label="Deduction"
          placeholder="Deduction"
          error={errors.deduction}
          value={formValues.deduction.toString()}
          onChangeText={(value) => handleInputChange('deduction', value)}
          onFocus={() => removeError('deduction')}
          keyboardType="number-pad"
        />
        <TextInput
          label="Company Earnings"
          placeholder="Company Earnings"
          value={formValues.companyEarnings.toString()}
          readOnly={true}
        />
        <TextInput
          label="Employee Share"
          placeholder="Employee Share"
          value={formValues.employeeShare.toString()}
          readOnly={true}
        />
        <Dropdown
          label="Service Charge"
          placeholder="Service charge"
          selected={formValues.serviceCharge}
          options={SERVICE_CHARGE_OPTIONS}
          onSelected={(selectedOption) => handleDropdownChange('serviceCharge', selectedOption)}
          optionMinWidth={196}
        />
        <Dropdown
          label="Payment Status"
          placeholder="Payment status"
          selected={
            formValues.serviceCharge === SERVICE_CHARGE_OPTIONS[0]
              ? PAYMENT_STATUS_OPTIONS[0]
              : formValues.paymentStatus
          }
          options={PAYMENT_STATUS_OPTIONS}
          onSelected={(selectedOption) => handleDropdownChange('paymentStatus', selectedOption)}
          optionMinWidth={196}
          isDisabled={formValues.serviceCharge === SERVICE_CHARGE_OPTIONS[0]}
        />
        <Dropdown
          label="Service Status"
          placeholder="Select service status"
          selected={formValues.status}
          options={filteredServiceStatusOption}
          onSelected={(selectedOption) => handleDropdownChange('status', selectedOption)}
          optionMinWidth={196}
        />
        <ModalDropdownTrigger
          label="Assigned Employee"
          placeholder="Select Employee"
          selected={formValues?.employees || []}
          options={employeeSelection}
          onSelected={(selected) => {
            setFormValues({
              ...formValues,
              employees: Array.isArray(selected) ? selected : [selected],
            });
          }}
          multiSelect={true}
          title="Select Employee"
          imageColorBackground="#46A6FF"
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
            title={'Update'}
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
    backgroundColor: color.background,
  },
  scrollViewContent: {
    gap: 24,
    paddingBottom: 62,
    paddingHorizontal: 25,
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
    lineHeight: 16,
  },
});

export default AvailedServiceForm;
