import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NavigationProp } from '../../types/navigation/types';
import { AppHeader, EmptyState, FloatingActionButton } from '@app/components';
import { color, font } from '@app/styles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { IMAGES } from '@app/constant';

const renderSeparator = () => <View style={styles.separator} />;

type EmployeeInfoProps = {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  title: string;
  status: string;
};
const EMPLOYEE_DATA: EmployeeInfoProps[] = [
  {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    gender: 'MALE',
    title: 'Car Wash Attendant',
    status: 'Active',
  },
  {
    id: '2',
    first_name: 'Jenny',
    last_name: 'Ma',
    gender: 'FEMALE',
    title: 'Car Wash Attendant',
    status: 'Terminated',
  },
  {
    id: '3',
    first_name: 'Jessa',
    last_name: 'No',
    gender: 'FEMALE',
    title: 'Car Wash Attendant',
    status: 'Active',
  },
  {
    id: '4',
    first_name: 'Johnny',
    last_name: 'Bravo',
    gender: 'MALE',
    title: 'Car Wash Attendant',
    status: 'Terminated',
  },
  {
    id: '5',
    first_name: 'Johnloyd',
    last_name: 'Cruz',
    gender: 'MALE',
    title: 'Car Wash Attendant',
    status: 'Active',
  },
  {
    id: '6',
    first_name: 'Joan',
    last_name: 'Ho',
    gender: 'FEMALE',
    title: 'Car Wash Attendant',
    status: 'Terminated',
  },
];

const Employee = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleCardPress = (id: string) => {
    navigation.navigate('EmployeeDetails', { id });
  };

  const handleAddEmployee = () => {
    navigation.navigate('EmployeeForm', { type: 'Add' });
  };

  const getTextStatusStyle = (status: string) =>
    status === 'Terminated' ? styles.textStatusRed : styles.textStatusGreen;

  const renderEmployeeList = ({
    id,
    first_name,
    last_name,
    title,
    status,
    gender,
  }: EmployeeInfoProps) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(id)}>
      <Image
        source={gender === 'MALE' ? IMAGES.AVATAR_BOY : IMAGES.AVATAR_GIRL}
        style={styles.image}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.textName}>
          {first_name} {last_name}
        </Text>
        <View style={styles.textInfoContainer}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={[styles.textStatus, styles.textStatusGray]}>
            Status: <Text style={getTextStatusStyle(status)}>{status}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Employees" />
      <View style={styles.heading}>
        <Text style={styles.employeeList}>Employee List</Text>
      </View>

      <FlatList
        data={EMPLOYEE_DATA}
        renderItem={({ item }) => renderEmployeeList(item)}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={<EmptyState />}
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
    alignItems: 'center',
    gap: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  image: {
    height: 90,
    width: 90,
  },
  textName: {
    ...font.regular,
    fontSize: 24,
    color: '#000000',
    lineHeight: 24,
    marginBottom: 8,
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
