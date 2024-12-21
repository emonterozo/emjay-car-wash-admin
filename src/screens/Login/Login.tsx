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
// import { ErrorModal, Toast } from '@app/components';
// import { Spinner } from '@ui-kitten/components';

const Login = () => {
  const { user, setUser } = useContext(GlobalContext);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [screenStatus, setScreenStatus] = useState({
    isLoading: false,
    hasError: false,
  });
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const login = () => {
    setScreenStatus({ hasError: false, isLoading: true });

    setTimeout(() => {
      setUser({
        ...user,
        id: 'user1',
      });
    }, 5000);
  };

  const hasNoInput = () => input.username.length === 0 || input.password.length === 0;

  const onChange = (key: string, text: string) => setInput({ ...input, [key]: text });

  const toggleSecureEntry = () => setIsPasswordSecure(!isPasswordSecure);

  {
    /* For testing */
  }
  // const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  // const errorModal = () => {
  //   setIsErrorModalVisible(true)
  // };
  // const handleSignIn = () => {
  //   hasNoInput() ? console.log('Please input your Username and Password above to Sign In') : login();
  // };

  return (
    <SafeAreaView style={styles.container}>
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
          {/* Sign Button */}
          <Pressable
            disabled={screenStatus.isLoading || hasNoInput()}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'rgba(1, 111, 185, 0.7)' : '#016FB9',
              },
              styles.button,
            ]}
            onPress={login}
          >
            {/* For testing */}
            {/* <ErrorModal
              isVisible={isErrorModalVisible}
              onRetry={() => { console.log("retry") }}
              onCancel={() => { setIsErrorModalVisible(false) }}
            /> */}

            <Text style={styles.buttonText}>{screenStatus.isLoading ? undefined : 'Sign In'}</Text>
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
  button: {
    marginTop: 128,
    paddingHorizontal: 12,
    paddingVertical: 16,
    width: Dimensions.get('window').width - 48,
    borderRadius: 49,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    textAlign: 'center',
    color: '#ffffffff',
  },
});

export default Login;
