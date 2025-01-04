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
  StatusBar,
} from 'react-native';

import GlobalContext from '@app/context';
import { IMAGES } from '@app/constant';
import { EyeOpenIcon, EyeCloseIcon, LockIcon, UserIcon } from '@app/icons';
import { ErrorModal, LoadingAnimation, Toast } from '@app/components';
import { color, font } from '@app/styles';
import { loginRequest } from '@app/services';

const Login = () => {
  const { setUser } = useContext(GlobalContext);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [screenStatus, setScreenStatus] = useState({
    isLoading: false,
    hasError: false,
  });
  const [input, setInput] = useState({
    username: '',
    password: '',
  });
  const [isToastVisible, setIsToastVisible] = useState(false);

  const login = async () => {
    setScreenStatus({ hasError: false, isLoading: true });
    const response = await loginRequest({ username: input.username, password: input.password });
    if (response.success && response.data) {
      setScreenStatus({ hasError: false, isLoading: false });
      const { data, errors } = response.data;

      if (errors.length > 0) {
        setIsToastVisible(true);
      } else {
        const { token, user } = data;
        setUser({
          id: user.id,
          username: user.username,
          type: user.type,
          token: token,
        });
      }
    } else {
      setScreenStatus({ isLoading: false, hasError: true });
    }
  };

  const onToastClose = () => setIsToastVisible(false);

  const toggleModal = () => setScreenStatus({ ...screenStatus, hasError: !screenStatus.hasError });

  const hasNoInput = () => input.username.length === 0 || input.password.length === 0;

  const onChange = (key: string, text: string) => setInput({ ...input, [key]: text });

  const toggleSecureEntry = () => setIsPasswordSecure(!isPasswordSecure);

  const getButtonStyle = (pressed: boolean) => {
    if (hasNoInput()) {
      return {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: color.primary,
      };
    }

    return { backgroundColor: pressed ? color.primary_pressed_state : color.primary };
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal isVisible={screenStatus.hasError} onCancel={toggleModal} onRetry={login} />
      <Toast
        isVisible={isToastVisible}
        message="Oops! Seems like you input wrong details. Please try again."
        duration={3000}
        type="error"
        onClose={onToastClose}
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
                value={input.username}
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
                value={input.password}
              />
              <Pressable onPress={toggleSecureEntry}>
                {isPasswordSecure ? <EyeCloseIcon /> : <EyeOpenIcon />}
              </Pressable>
            </View>
          </View>
          <Pressable
            disabled={hasNoInput()}
            style={({ pressed }) => [styles.button, getButtonStyle(pressed)]}
            onPress={login}
          >
            <Text style={[styles.buttonText, hasNoInput() && { color: color.primary }]}>
              Sign In
            </Text>
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
    ...font.bold,
    fontSize: 40,
    color: '#050303',
  },
  subHeader: {
    fontSize: 16,
    ...font.regular,
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
    ...font.regular,
    marginHorizontal: 33,
    color: '#5C5C5C',
  },
  button: {
    marginTop: 128,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 49,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width - 48,
  },
  buttonText: {
    ...font.regular,
    fontSize: 24,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});

export default Login;
