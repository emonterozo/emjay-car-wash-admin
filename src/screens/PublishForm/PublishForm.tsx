import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Option } from '../../components/Dropdown/Dropdown';
import { NavigationProp, PublishFormRouteProp } from '../../types/navigation/types';
import { ScreenStatusProps } from '../../types/services/types';
import { color, font } from '@app/styles';
import {
  AppHeader,
  ErrorModal,
  LoadingAnimation,
  TextInput,
  Button,
  Toast,
  ConfirmationModal,
  Dropdown,
} from '@app/components';
import { ERR_NETWORK, IMAGES } from '@app/constant';
import { useNativeBackHandler } from '@app/hooks';
import GlobalContext from '@app/context';
import { addPromoRequest, updatePromoRequest } from '@app/services';

const validationSchema = Yup.object({
  status: Yup.object().required('Status is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  percent: Yup.number()
    .typeError('Percent must be a valid number')
    .integer('Percent must be a whole number')
    .min(0, 'Percent cannot be negative')
    .max(100, 'Percent should not exceed 100')
    .test('no-negative-zero', 'Percent cannot be negative', (value) => value !== -0),
});

type FormValues = {
  status: Option | undefined;
  title: string | undefined;
  description: string | undefined;
  percent: number;
};

type ToastMessage = {
  message: string;
  toastType: 'success' | 'error';
};

type Errors = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof FormValues]?: string;
};

const STATUS_OPTIONS = [
  {
    id: '1',
    icon: <Image source={IMAGES.ACTIVE_STATUS} resizeMode="contain" />,
    label: 'ACTIVE',
  },
  {
    id: '2',
    icon: <Image source={IMAGES.TERMINATED_STATUS} resizeMode="contain" />,
    label: 'INACTIVE',
  },
];

const PublishForm = () => {
  const { user } = useContext(GlobalContext);
  const { type, promo } = useRoute<PublishFormRouteProp>().params;
  const navigation = useNavigation<NavigationProp>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const initialFormValues: FormValues = {
    status: promo?.isActive ? STATUS_OPTIONS[0] : STATUS_OPTIONS[1],
    title: promo?.title ?? undefined,
    description: promo?.description ?? undefined,
    percent: promo?.percent ?? 0,
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
          message: 'Promo added successfully',
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
          message: 'Promo details have been successfully updated!',
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

  const handleAddPromo = async () => {
    const { status, title, description, percent } = formValues;

    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });

    const response = await addPromoRequest(
      user.accessToken,
      user.refreshToken,
      status?.label === 'ACTIVE',
      title!,
      description!,
      +percent,
    );

    if (response.success && response.data) {
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
      const toastData: ToastMessage = getToastMessage(type, 'success');
      setMessage(toastData.message);
      setToastType(toastData.toastType);
      setIsToastVisible(true);
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } else {
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  const handleUpdatePromo = async () => {
    const { status, title, description, percent } = formValues;

    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });

    const response = await updatePromoRequest(
      promo?.id as string,
      user.accessToken,
      user.refreshToken,
      status?.label === 'ACTIVE',
      title!,
      description!,
      +percent,
    );

    if (response.success && response.data) {
      setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
      const toastData: ToastMessage = getToastMessage(type, 'success');
      setMessage(toastData.message);
      setToastType(toastData.toastType);
      setIsToastVisible(true);
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } else {
      setScreenStatus({
        isLoading: false,
        type: response.error === ERR_NETWORK ? 'connection' : 'error',
        hasError: true,
      });
    }
  };

  const handleSubmit = () => {
    validationSchema
      .validate(formValues, { abortEarly: false })
      .then(async () => {
        setErrors({});
        if (type === 'Add') {
          await handleAddPromo();
        } else {
          await handleUpdatePromo();
        }
      })
      .catch((err) => {
        const errorMessages: Errors = err.inner.reduce((acc: Errors, curr: ValidationError) => {
          acc[curr.path as keyof FormValues] = curr.message;
          return acc;
        }, {});
        setErrors(errorMessages);
        const toastData: ToastMessage = getToastMessage(type, 'error');
        setMessage(toastData.message);
        setToastType(toastData.toastType);
        setIsToastVisible(true);
      });
  };

  const handleDropdownChange = (key: string, value: Option) => {
    setFormValues({ ...formValues, [key]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Promo" onBack={handleCancel} />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={() => {}}
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
          <Text style={styles.text}>Promo Add Form</Text>
        </View>
        <ScrollView bounces={false} contentContainerStyle={styles.scrollViewContent}>
          <Dropdown
            label="Status"
            placeholder="Select Status"
            selected={formValues.status}
            options={STATUS_OPTIONS}
            onSelected={(selectedOption) => handleDropdownChange('status', selectedOption)}
            optionMinWidth={212}
            error={errors.status}
            onToggleOpen={() => removeError('status')}
          />
          <TextInput
            label="Title"
            placeholder="Title of promo"
            error={errors.title}
            value={formValues.title?.toString()}
            onChangeText={(value) => handleInputChange('title', value)}
            onFocus={() => removeError('title')}
          />
          <TextInput
            label="Description"
            placeholder="Description of promo"
            error={errors.description}
            value={formValues.description?.toString()}
            onChangeText={(value) => handleInputChange('description', value)}
            onFocus={() => removeError('description')}
          />
          <TextInput
            label="Percent"
            placeholder="E.g 10"
            error={errors.percent}
            value={formValues.percent.toString()}
            onChangeText={(value) => handleInputChange('percent', value)}
            onFocus={() => removeError('percent')}
            keyboardType="number-pad"
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

export default PublishForm;
