import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';

import { ScreenStatusProps } from '../../types/services/types';
import { AppHeader, ErrorModal, FloatingActionButton, LoadingAnimation } from '@app/components';
import { color, font } from '@app/styles';
import { CircleArrowRightIcon } from '@app/icons';
import { formattedNumber } from '@app/helpers';
import { NavigationProp } from '../../types/navigation/types';

const STATUSES = [
  {
    label: 'Pending',
    color: '#888888',
  },
  {
    label: 'Ongoing',
    color: '#1F93E1',
  },
  {
    label: 'Done',
    color: '#4BB543',
  },
  {
    label: 'Cancel',
    color: '#FF7070',
  },
];

const AvailedServices = () => {
  const navigation = useNavigation<NavigationProp>();
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [selectedStatus, setSelectedStatus] = useState('Pending');

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Availed Services" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={() => {}}
      />
      <View style={styles.heading}>
        <Text style={styles.label}>List of Availed Services</Text>
      </View>
      <View style={styles.statusContainer}>
        {STATUSES.map((status) => (
          <TouchableOpacity
            style={[
              styles.status,
              status.label === selectedStatus && { backgroundColor: status.color },
            ]}
            key={status.label}
            onPress={() => setSelectedStatus(status.label)}
          >
            <Text
              style={[styles.statusLabel, status.label === selectedStatus && styles.statusSelected]}
            >
              {status.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.list}>
        <View style={styles.card}>
          <FastImage
            style={styles.serviceImage}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/portfolio-d0d15.appspot.com/o/EmJay%20Services%20Image%2Fbuff-wax.jpg?alt=media&token=32bded96-8bab-4a67-9949-4aa9c20914fe',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.details}>
            <Text style={styles.name}>Car Wash</Text>
            <Text style={styles.price}>
              <Text style={styles.priceLabel}>Amount: </Text>
              {formattedNumber(5000)}
            </Text>
            <View style={styles.tag}>
              <Text style={styles.tagLabel}>Not Free</Text>
            </View>
            <TouchableOpacity
              style={styles.viewDetailsContainer}
              onPress={() => navigation.navigate('AvailedServiceDetails')}
            >
              <Text style={styles.viewDetails}>View full details</Text>
              <CircleArrowRightIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FloatingActionButton
        onPress={() =>
          navigation.navigate('AddOngoing', {
            customerId: null,
            transactionId: null,
            selectedServices: [],
          })
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 25,
  },
  label: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#696969',
  },
  statusContainer: {
    paddingHorizontal: 25,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 4,
  },
  status: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
  },
  statusLabel: {
    ...font.light,
    fontSize: 15,
    lineHeight: 15,
    color: '#696969',
    textAlign: 'center',
  },
  statusSelected: {
    color: '#FAFAFA',
  },
  card: {
    backgroundColor: '#F3F2EF',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    paddingVertical: 8,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  details: {
    gap: 8,
    flex: 1,
  },
  serviceImage: {
    width: '45%',
    height: '100%',
    borderRadius: 24,
  },
  name: {
    ...font.regular,
    fontSize: 20,
    lineHeight: 20,
    color: color.black,
  },
  price: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
    color: color.primary,
  },
  priceLabel: {
    ...font.light,
    fontSize: 16,
    lineHeight: 16,
    color: '#777676',
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: color.background,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#7F7A7A',
    borderRadius: 8,
    width: 85,
  },
  tagLabel: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: color.background,
    textAlign: 'center',
  },
  viewDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewDetails: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: '#016FB9',
  },
});

export default AvailedServices;
