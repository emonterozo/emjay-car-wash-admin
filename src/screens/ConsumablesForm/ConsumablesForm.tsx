import React, { /*useContext,*/ useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import { useNavigation } from '@react-navigation/native';

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
} from '@app/components';
// import { ERR_NETWORK } from '@app/constant';
import { useNativeBackHandler } from '@app/hooks';
import { /*AddConsumablesRouteProp, */ NavigationProp } from 'src/types/navigation/types';
import { ScreenStatusProps } from 'src/types/services/types';
// import GlobalContext from '@app/context';
import { getCurrentDateAtMidnightUTC } from '@app/helpers';
import { format } from 'date-fns';
// import { addConsumablesRequest } from '@app/services';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  price: Yup.string().required('Price is required'),
  quantity: Yup.string().required('Quantity is required'),
  date: Yup.date().required('Date is required'),
});

const date = getCurrentDateAtMidnightUTC();

type FormValues = {
  name: string;
  price: number;
  quantity: number;
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

let formStatus: 'success' | 'error' = 'success';

const ConsumablesForm = () => {
  // const { user } = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp>();
  // const { id } = useRoute<AddConsumablesRouteProp>().params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const initialFormValues: FormValues = {
    name: '',
    price: 0,
    quantity: 0,
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
        message: 'Consumables have been successfully added!',
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
        // await handleAddConsumables();
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

  // const handleAddConsumables = async () => {
  //     setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });

  //     const payload = {
  //         name: formValues.name,
  //         price: formValues.price,
  //         quantity: formValues.quantity,
  //         date: formValues.date ? formValues.date.toISOString() : "",
  //     };

  //     const response = await addConsumablesRequest(
  //         user.accessToken,
  //         payload,
  //     );

  //     if (response.success && response.data) {
  //         setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
  //         formStatus = 'success';
  //         const toastData: ToastMessage = getToastMessage(formStatus);
  //         setMessage(toastData.message);
  //         setToastType(toastData.toastType);
  //         setIsToastVisible(true);
  //         const clearFormValue = {
  //             name: '',
  //             price: 0,
  //             quantity: 0,
  //             date: undefined,
  //         };
  //         setFormValues(clearFormValue);
  //     } else {
  //         setScreenStatus({
  //             isLoading: false,
  //             type: response.error === ERR_NETWORK ? 'connection' : 'error',
  //             hasError: true,
  //         });
  //     }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Consumables" onBack={handleCancel} />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={() => <></>}
      />
      <Toast
        isVisible={isToastVisible}
        message={message}
        duration={3000}
        type={toastType}
        onClose={onToastClose}
      />
      <ConfirmationModal
        type={'AddConsumables'}
        isVisible={isModalVisible}
        onNo={toggleConfirmModal}
        onYes={handleYes}
      />
      <View style={styles.heading}>
        <Text style={styles.text}> {'Consumables Add Form'}</Text>
      </View>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollViewContent}>
        <TextInput
          label="Name"
          placeholder="Name"
          error={errors.name}
          value={formValues.name.toString()}
          onChangeText={(value) => handleInputChange('name', value)}
          onFocus={() => removeError('name')}
        />
        <TextInput
          label="Price"
          placeholder="Price"
          error={errors.price}
          value={formValues.price.toString()}
          onChangeText={(value) => handleInputChange('price', value)}
          onFocus={() => removeError('price')}
          keyboardType="number-pad"
        />
        <TextInput
          label="Quantity"
          placeholder="Quantity"
          error={errors.quantity}
          value={formValues.quantity.toString()}
          onChangeText={(value) => handleInputChange('quantity', value)}
          onFocus={() => removeError('quantity')}
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
            title={'Add'}
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
  },
});

export default ConsumablesForm;
