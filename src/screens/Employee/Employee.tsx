import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, StatusBar, Image, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { NavigationProp } from '../../types/navigation/types';
import { Employees, ScreenStatusProps } from 'src/types/services/types';
import {
  ActivityIndicator,
  AppHeader,
  EmptyState,
  ErrorModal,
  FloatingActionButton,
  LoadingAnimation,
} from '@app/components';
import { color, font } from '@app/styles';
import { ERR_NETWORK, IMAGES, LIMIT } from '@app/constant';
import { getEmployeesRequest } from '@app/services';
import GlobalContext from '@app/context';

const renderSeparator = () => <View style={styles.separator} />;

const Employee = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useContext(GlobalContext);
  const [totalCount, setTotalCount] = useState(0);
  const [employees, setEmployees] = useState<Employees[]>([]);
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [isFetching, setIsFetching] = useState(false);
  const isFocused = useIsFocused();

  const handleCardPress = (id: string) => {
    navigation.navigate('EmployeeDetails', { id });
  };

  const handleAddEmployee = () => {
    navigation.navigate('EmployeeForm', { type: 'Add' });
  };

  const fetchEmployees = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getEmployeesRequest(user.accessToken, '_id', 'asc', LIMIT, 0);

    if (response.success && response.data) {
      setEmployees(response.data.employees);
      setTotalCount(response.data.totalCount);
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
    if (isFocused) {
      fetchEmployees();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  const onEndReached = async () => {
    if (isFetching || employees.length >= totalCount) {
      return;
    }

    setIsFetching(true);
    const response = await getEmployeesRequest(
      user.accessToken,
      '_id',
      'asc',
      LIMIT,
      employees.length,
    );

    if (response.success && response.data) {
      setEmployees((prev) => [...prev, ...response.data?.employees!]);
      setTotalCount(response.data.totalCount);
    }
    setIsFetching(false);
  };

  const getTextStatusStyle = (status: string) =>
    status === 'TERMINATED' ? styles.textStatusRed : styles.textStatusGreen;

  const renderEmployeeList = ({
    first_name,
    last_name,
    gender,
    employee_title,
    employee_status,
    _id,
  }: Employees) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(_id)}>
      <Image
        source={gender === 'MALE' ? IMAGES.AVATAR_BOY : IMAGES.AVATAR_GIRL}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.textName}>
          {first_name} {last_name}
        </Text>
        <View style={styles.textInfoContainer}>
          <Text style={styles.textTitle}>{employee_title}</Text>
          <Text style={[styles.textStatus, styles.textStatusGray]}>
            Status: <Text style={getTextStatusStyle(employee_status)}>{employee_status}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Employees" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchEmployees}
      />
      <View style={styles.heading}>
        <Text style={styles.employeeList}>Employee List</Text>
      </View>

      <FlatList
        data={employees}
        renderItem={({ item }) => renderEmployeeList(item)}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={<EmptyState />}
        onEndReached={onEndReached}
        ListFooterComponent={<ActivityIndicator isLoading={isFetching} />}
      />
      <FloatingActionButton onPress={handleAddEmployee} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF',
  },
  separator: {
    marginTop: 24,
  },
  heading: {
    alignItems: 'flex-start',
    marginTop: 16,
    marginBottom: 35,
    paddingHorizontal: 25,
  },
  employeeList: {
    ...font.regular,
    fontSize: 16,
    color: '#696969',
    lineHeight: 16,
    marginBottom: 16,
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: color.background,
  },
  card: {
    backgroundColor: '#F3F2EF',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  image: {
    height: 90,
    width: 90,
    backgroundColor: '#46A6FF',
    borderRadius: 90,
  },
  textContainer: {
    flex: 1,
  },
  textName: {
    ...font.regular,
    fontSize: 24,
    color: '#000000',
    lineHeight: 24,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  textTitle: {
    ...font.regular,
    fontSize: 16,
    color: '#777676',
    lineHeight: 16,
  },
  textStatus: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
  },
  textStatusGray: {
    color: '#7F7A7A',
  },
  textStatusGreen: {
    color: '#4BB543',
  },
  textStatusRed: {
    color: '#FF7070',
  },
  textInfoContainer: {
    gap: 4,
  },
});

export default Employee;
