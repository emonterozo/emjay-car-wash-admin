import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';

import GlobalContext from '@app/context';
import { IMAGES } from '@app/constant';
import { EyeOpenIcon, EyeCloseIcon, LockIcon, UserIcon } from '@app/icons';
import { ErrorModal, LoadingAnimation, Toast } from '@app/components';
import { COLORS, globalStyles } from 'src/styles/globalstyles';

const Login = () => {
  const { user, setUser } = useContext(GlobalContext);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [screenStatus, setScreenStatus] = useState({
    isLoading: false,
    hasError: true,
  });
  const [input, setInput] = useState({
    username: '',
    password: '',
  });
  type ToastDetails = {
    visibility: boolean;
    duration: number;
    message: string;
    type: 'success' | 'error' | 'info';
  };
  const [toastDetails, setToastDetails] = useState<ToastDetails>({
    visibility: false,
    duration: 0,
    message: '',
    type: 'info',
  });

  const hasNoInput = () => input.username.length === 0 || input.password.length === 0;

  const onChange = (key: string, text: string) => setInput({ ...input, [key]: text });

  const toggleSecureEntry = () => setIsPasswordSecure(!isPasswordSecure);

  const login = () => {
    const { hasError, isLoading } = screenStatus;

    if (hasError) {
      // Handle error case
      setScreenStatus({ hasError: true, isLoading: true });
      setTimeout(() => {
        //set loading visibility to false
        setScreenStatus({ hasError: true, isLoading: false });
        handleToast('error');
        // console.log('Error: cannot proceed with login');
      }, 3000); // Simulate toast display duration
    } else if (!isLoading) {
      // Handle success case
      setScreenStatus({ hasError: false, isLoading: true }); // Start loading
      setTimeout(() => {
        setScreenStatus({ hasError: false, isLoading: false }); // Stop loading
        handleToast('success');

        // Delay the setUser until the toast has finished displaying
        setTimeout(() => {
          // console.log('Success: login complete');
          setUser({
            ...user,
            id: 'user1',
          });
        }, 3000);
      }, 3000); // Simulate loading duration
    }
  };

  const handleToast = (type: 'success' | 'error' | 'info') => {
    const message =
      type === 'success'
        ? 'You have Successfully logged in. Redirecting you to your dashboard now'
        : type === 'error'
        ? 'Oops! Seems like you input wrong details. Please try again.'
        : 'Please input your Username and Password above to Sign In';

    setToastDetails({
      visibility: true,
      duration: 3000,
      message,
      type,
    });

    setTimeout(() => {
      setToastDetails((prev) => ({ ...prev, visibility: false }));
    }, 3000);
  };

  const getButtonStyle = (pressed: boolean) => {
    if (screenStatus.isLoading || hasNoInput()) {
      return {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.primary,
      };
    }

    return {
      backgroundColor: pressed ? COLORS.pressed : COLORS.primary,
    };
  };

  const getButtonTextStyle = () => {
    if (screenStatus.isLoading || hasNoInput()) {
      return globalStyles.buttonTextColorDisabled;
    }
    return globalStyles.buttonTextColor;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal isVisible={false} onCancel={() => {}} onRetry={() => {}} />
      <Toast
        isVisible={toastDetails.visibility}
        message={toastDetails.message}
        duration={toastDetails.duration}
        type={toastDetails.type}
        onClose={() => {}}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.avoidingView}
      >
        <ScrollView bounces={false} contentContainerStyle={styles.scrollView}>
          <Image source={IMAGES.EM_JAY} style={styles.image} resizeMode="contain" />
          <Text style={styles.header}>Welcome Back</Text>
          <Text style={styles.subHeader}>Sign In to Continue</Text>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <UserIcon />
              <TextInput
                placeholder="Username"
                placeholderTextColor="#5C5C5C"
                style={styles.input}
                onChangeText={(text) => onChange('username', text)}
                maxLength={20}
              />
            </View>
            <View style={styles.inputContainer}>
              <LockIcon />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#5C5C5C"
                style={styles.input}
                secureTextEntry={isPasswordSecure}
                onChangeText={(text) => onChange('password', text)}
                maxLength={64}
              />
              <Pressable onPress={toggleSecureEntry}>
                {isPasswordSecure ? <EyeCloseIcon /> : <EyeOpenIcon />}
              </Pressable>
            </View>
          </View>
          <Pressable
            disabled={screenStatus.isLoading || hasNoInput()}
            style={({ pressed }) => [
              globalStyles.buttonLarge,
              { marginTop: 128 },
              getButtonStyle(pressed),
            ]}
            onPress={() => login()}
          >
            <Text style={[globalStyles.buttonText, getButtonTextStyle()]}>Sign In</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  avoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  image: {
    width: 245,
    height: 147,
    alignSelf: 'center',
    marginTop: 127,
  },
  header: {
    fontSize: 40,
    fontFamily: 'AeonikTRIAL-Bold',
    fontWeight: 'bold',
    color: '#050303',
  },
  subHeader: {
    fontSize: 16,
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    textAlign: 'center',
    color: '#5C5C5C',
    marginTop: 13,
    lineHeight: 16,
  },
  form: {
    gap: 26,
    marginTop: 68,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#8A8989',
    paddingHorizontal: 20,
    paddingVertical: 9,
    width: Dimensions.get('window').width - 48,
    borderRadius: 49,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    marginHorizontal: 33,
    color: '#5C5C5C',
  },
});

export default Login;
