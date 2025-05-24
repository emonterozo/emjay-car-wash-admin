import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import { Option } from '../../components/Dropdown/Dropdown';
import { NavigationProp } from '../../types/navigation/types';
import { AddExpensePayload, ScreenStatusProps } from '../../types/services/types';
import { color, font } from '@app/styles';
import {
  AppHeader,
  ErrorModal,
  LoadingAnimation,
  TextInput,
  Button,
  Toast,
  ConfirmationModal,
  CalendarPickerTrigger,
  Dropdown,
} from '@app/components';
import { ERR_NETWORK } from '@app/constant';
import { useNativeBackHandler } from '@app/hooks';
import GlobalContext from '@app/context';
import { getCurrentDateAtMidnightUTC } from '@app/helpers';
import { addExpenseRequest } from '@app/services';
import {
  ConsumablesListIcon,
  ElectricityIcon,
  ManpowerIcon,
  OtherIcon,
  PercentageIcon,
  RentIcon,
  WaterIcon,
} from '@app/icons';

const validationSchema = Yup.object({
  category: Yup.object().required('Category is required'),

  description: Yup.string().required('Description is required'),

  amount: Yup.number()
    .typeError('Amount must be a valid number')
    .integer('Amount must be a whole number')
    .min(0, 'Amount cannot be negative')
    .test('no-negative-zero', 'Amount cannot be negative', (value) => value !== -0),

  date: Yup.date().required('Date is required'),
});

const date = getCurrentDateAtMidnightUTC();

type FormValues = {
  category: Option | undefined;
  description: string | undefined;
  amount: number;
  date: Date | undefined;
};

type ToastMessage = {
  message: string;
  toastType: 'success' | 'error';
};

type Errors = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof FormValues]?: string;
};

const CATEGORY_ICONS_COLORS = {
  manpower: '#4BB543',
  electricity: '#fd5815',
  rent: '#888888',
  consumables: '#FFB238',
  water: '#0288D1',
  promotions: '#d32f2f',
  others: '#FF7070',
};

const STYLES = StyleSheet.create({
  circle: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});

const CATEGORY_OPTIONS = [
  {
    id: '1',
    icon: (
      <View style={[STYLES.circle, { backgroundColor: CATEGORY_ICONS_COLORS.manpower }]}>
        <ManpowerIcon fill="#ffffff" width={20} height={20} />
      </View>
    ),
    label: 'MANPOWER',
  },
  {
    id: '2',
    icon: (
      <View style={[STYLES.circle, { backgroundColor: CATEGORY_ICONS_COLORS.electricity }]}>
        <ElectricityIcon fill="#ffffff" width={20} height={20} />
      </View>
    ),
    label: 'ELECTRICITY',
  },
  {
    id: '6',
    icon: (
      <View style={[STYLES.circle, { backgroundColor: CATEGORY_ICONS_COLORS.water }]}>
        <WaterIcon fill="#ffffff" width={20} height={20} />
      </View>
    ),
    label: 'WATER',
  },
  {
    id: '3',
    icon: (
      <View style={[STYLES.circle, { backgroundColor: CATEGORY_ICONS_COLORS.rent }]}>
        <RentIcon fill="#ffffff" width={20} height={20} />
      </View>
    ),
    label: 'RENT',
  },
  {
    id: '7',
    icon: (
      <View style={[STYLES.circle, { backgroundColor: CATEGORY_ICONS_COLORS.promotions }]}>
        <PercentageIcon fill="#ffffff" width={20} height={20} />
      </View>
    ),
    label: 'PROMOTIONS',
  },
  {
    id: '4',
    icon: (
      <View style={[STYLES.circle, { backgroundColor: CATEGORY_ICONS_COLORS.consumables }]}>
        <ConsumablesListIcon fill="#ffffff" width={20} height={20} />
      </View>
    ),
    label: 'CONSUMABLES',
  },
  {
    id: '5',
    icon: (
      <View style={[STYLES.circle, { backgroundColor: CATEGORY_ICONS_COLORS.others }]}>
        <OtherIcon fill="#ffffff" width={20} height={20} />
      </View>
    ),
    label: 'OTHERS',
  },
];

const ExpensesForm = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const initialFormValues: FormValues = {
    category: undefined,
    description: undefined,
    amount: 0,
    date: undefined,
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

  const getToastMessage = (status: 'success' | 'error'): ToastMessage => {
    if (status === 'success') {
      return {
        message: 'Expense have been successfully added!',
        toastType: 'success',
      };
    } else {
      return {
        message: 'Please complete the required fields before adding.',
        toastType: 'error',
      };
    }
  };

  const handleSubmit = () => {
    validationSchema
      .validate(formValues, { abortEarly: false })
      .then(async (_validData) => {
        setErrors({});
        await handleAddExpense();
      })
      .catch((err) => {
        const errorMessages: Errors = err.inner.reduce((acc: Errors, curr: ValidationError) => {
          acc[curr.path as keyof FormValues] = curr.message;
          return acc;
        }, {});
        setErrors(errorMessages);
        const toastData: ToastMessage = getToastMessage('error');
        setMessage(toastData.message);
        setToastType(toastData.toastType);
        setIsToastVisible(true);
      });
  };

  const handleAddExpense = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });

    const formattedCategory =
      formValues.category &&
      ['MANPOWER', 'ELECTRICITY', 'RENT', 'CONSUMABLES', 'OTHERS', 'WATER', 'PROMOTIONS'].includes(
        formValues.category.label,
      )
        ? formValues.category.label
        : 'OTHERS';

    const formattedDescription = formValues.description !== undefined ? formValues.description : '';

    const payload: AddExpensePayload = {
      category: formattedCategory,
      description: formattedDescription,
      amount: Number(formValues.amount),
      date: format(formValues.date!, 'yyyy-MM-dd'),
    };

    const response = await addExpenseRequest(user.accessToken, user.refreshToken, payload);

    if (response.success && response.data) {
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
      const toastData: ToastMessage = getToastMessage('success');
      setMessage(toastData.message);
      setToastType(toastData.toastType);
      setIsToastVisible(true);
      const clearFormValue = {
        category: undefined,
        description: undefined,
        amount: 0,
        date: undefined,
      };
      setFormValues(clearFormValue);
    } else {
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  const handleDropdownChange = (key: string, value: Option) => {
    setFormValues({ ...formValues, [key]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Expenses" onBack={handleCancel} />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={handleAddExpense}
      />
      <Toast
        isVisible={isToastVisible}
        message={message}
        duration={3000}
        type={toastType}
        onClose={onToastClose}
      />
      <ConfirmationModal
        type={'AddExpense'}
        isVisible={isModalVisible}
        onNo={toggleConfirmModal}
        onYes={handleYes}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.avoidingView}
      >
        <View style={styles.heading}>
          <Text style={styles.text}>Expenses Add Form</Text>
        </View>
        <ScrollView bounces={false} contentContainerStyle={styles.scrollViewContent}>
          <Dropdown
            label="Category"
            placeholder="Select Category"
            selected={formValues.category}
            options={CATEGORY_OPTIONS}
            onSelected={(selectedOption) => handleDropdownChange('category', selectedOption)}
            optionMinWidth={212}
            error={errors.category}
            onToggleOpen={() => removeError('category')}
          />
          <TextInput
            label="Description"
            placeholder="E.g This expense is for Salary"
            error={errors.description}
            value={formValues.description?.toString()}
            onChangeText={(value) => handleInputChange('description', value)}
            onFocus={() => removeError('description')}
          />
          <TextInput
            label="Amount"
            placeholder="E.g 3000"
            error={errors.amount}
            value={formValues.amount.toString()}
            onChangeText={(value) => handleInputChange('amount', value)}
            onFocus={() => removeError('amount')}
            keyboardType="number-pad"
          />
          <CalendarPickerTrigger
            date={formValues.date ?? date}
            label="Date"
            placeholder="Select Date"
            value={getDateValue('date', formValues.date)}
            error={errors.date}
            onSelectedDate={(selectedDate) => handleCalendarChange('date', selectedDate)}
            onPressOpen={() => removeError('date')}
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
              title="Submit"
              variant="primary"
              buttonStyle={styles.button}
              textStyle={styles.textStyle}
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  avoidingView: {
    flex: 1,
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
    padding: 12,
    borderRadius: 24,
  },
  textStyle: {
    ...font.regular,
    fontSize: 16,
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
});

export default ExpensesForm;
