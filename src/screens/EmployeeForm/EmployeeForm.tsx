import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { color, font } from '@app/styles';
import { AppHeader, CalendarPickerTrigger, Dropdown, TextInput, Button } from '@app/components';
import { IMAGES } from '@app/constant';
import { Option } from '../../components/Dropdown/Dropdown';

const EmployeeForm = () => {
  const [selected, setSelected] = useState<Option | undefined>(undefined);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Add Employee" />
      <View style={styles.heading}>
        <Text style={styles.text}>Adding Form</Text>
      </View>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollViewContent}>
        <TextInput label="First Name" placeholder="Enter First Name" />
        <TextInput label="Last Name" placeholder="Enter Last Name" />
        <Dropdown
          label="Employee Gender"
          placeholder="Select Gender"
          selected={selected}
          options={[
            {
              id: '1',
              icon: <Image source={IMAGES.ACTIVE_STATUS} resizeMode="contain" />,
              label: 'Male',
            },
            {
              id: '2',
              icon: <Image source={IMAGES.TERMINATED_STATUS} resizeMode="contain" />,
              label: 'Female',
            },
          ]}
          onSelected={(selectedOption) => {
            setSelected(selectedOption);
          }}
          optionMinWidth={212}
        />
        <CalendarPickerTrigger
          label="Date of Birth"
          placeholder="Select Date of Birth"
          value={undefined}
        />
        <TextInput label="Contact Number" placeholder="Enter Contact Number" />
        <TextInput label="Employee Title" placeholder="Enter Employee Title" />
        <Dropdown
          label="Employee Status"
          placeholder="Select Status"
          selected={selected}
          options={[
            {
              id: '1',
              icon: <Image source={IMAGES.ACTIVE_STATUS} resizeMode="contain" />,
              label: 'Active',
            },
            {
              id: '2',
              icon: <Image source={IMAGES.TERMINATED_STATUS} resizeMode="contain" />,
              label: 'Terminated',
            },
          ]}
          onSelected={(selectedOption) => {
            setSelected(selectedOption);
          }}
          optionMinWidth={212}
        />
        <CalendarPickerTrigger
          label="Date Started"
          placeholder="Select Date Started"
          value={undefined}
        />
        <View style={styles.buttonContainer}>
          <Button title="Cancel" variant="secondary" buttonStyle={styles.button} />
          <Button
            title="Add"
            variant="primary"
            buttonStyle={styles.button}
            textStyle={styles.textStyle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF',
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
    paddingHorizontal: 23,
    paddingVertical: 18,
    borderRadius: 24,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'regular',
  },
});

export default EmployeeForm;
