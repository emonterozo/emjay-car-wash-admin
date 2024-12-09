import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Icon, IconProps, Spinner } from '@ui-kitten/components';
import { Dimensions, Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import GlobalContext from '@app/context';
import { horizontalScale, verticalScale } from '@app/metrics';
import { IMAGES } from '@app/constant';

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

  const toggleSecureEntry = () => setIsPasswordSecure(!isPasswordSecure);

  const renderInputIcon = (icon: string) => <Icon name={icon} />;

  const renderIcon = (props: IconProps): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={isPasswordSecure ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const login = () => {
    setScreenStatus({ hasError: false, isLoading: true });

    setTimeout(() => {
      setUser({
        ...user,
        id: 'sample to',
      });
    }, 5000);
  };

  const hasNoInput = () => input.username.length === 0 || input.password.length === 0;

  const onChange = (key: string, text: string) => setInput({ ...input, [key]: text });

  return (
    <SafeAreaView style={styles.container}>
      <Image source={IMAGES.EM_JAY} style={styles.image} resizeMode="contain" />
      <View style={styles.formContainer}>
        <Input
          disabled={screenStatus.isLoading}
          maxLength={20}
          accessoryLeft={renderInputIcon('person-outline')}
          placeholder="Username"
          onChangeText={(text) => onChange('username', text)}
          style={styles.input}
          size="large"
        />
        <Input
          disabled={screenStatus.isLoading}
          maxLength={64}
          secureTextEntry={isPasswordSecure}
          accessoryLeft={renderInputIcon('lock-outline')}
          accessoryRight={renderIcon}
          placeholder="Password"
          onChangeText={(text) => onChange('password', text)}
          style={styles.input}
          size="large"
        />
        <Button
          size="large"
          disabled={screenStatus.isLoading || hasNoInput()}
          accessoryLeft={
            screenStatus.isLoading ? (
              <View>
                <Spinner />
              </View>
            ) : undefined
          }
          onPress={login}
          style={styles.button}
        >
          {screenStatus.isLoading ? undefined : 'Sign In'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f7f9fc',
    paddingHorizontal: 24,
  },
  image: {
    width: horizontalScale(Dimensions.get('window').width),
    height: verticalScale(200),
    marginBottom: verticalScale(30),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  formContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  input: {
    marginBottom: verticalScale(16),
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  button: {
    marginTop: verticalScale(16),
    borderRadius: 8,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(24),
  },
});

export default Login;
