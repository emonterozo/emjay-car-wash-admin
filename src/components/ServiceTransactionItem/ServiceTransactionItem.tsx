import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { color, font } from '@app/styles';
import { CircleCheckIcon } from '@app/icons';

type ServiceTransactionItemProps = {
  icon: React.ReactNode;
  serviceName: string;
  price: string;
  date: string;
};

const ServiceTransactionItem: React.FC<ServiceTransactionItemProps> = ({
  icon,
  serviceName,
  price,
  date,
}) => (
  <View style={styles.serviceIconContainer}>
    <View style={styles.serviceIconCardContainer}>{icon}</View>
    <View style={styles.serviceContainer}>
      <Text style={styles.textCarwash}>{serviceName}</Text>
      <View style={styles.servicesDetailsContainer}>
        <View style={styles.iconAndTextRow}>
          <CircleCheckIcon />
          <Text
            style={[
              styles.textServicePriceAndDate,
              styles.textServicePriceAndDateColorGreen,
              styles.marginLeft,
            ]}
          >
            {price}
          </Text>
        </View>
        <View style={styles.iconAndTextRow}>
          <View style={styles.circleSeparator} />
          <Text style={[styles.textServicePriceAndDate, styles.textServicePriceAndDateColorGray]}>
            {date}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  serviceIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 6,
  },
  serviceIconCardContainer: {
    width: 55,
    height: 49,
    backgroundColor: '#F4F9FD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceContainer: {
    gap: 8,
  },
  servicesDetailsContainer: {
    flexDirection: 'row',
  },
  iconAndTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCarwash: {
    ...font.regular,
    fontSize: 20,
    lineHeight: 20,
    color: color.black,
  },
  textServicePriceAndDate: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
  },
  textServicePriceAndDateColorGreen: {
    color: '#4BB543',
  },
  textServicePriceAndDateColorGray: {
    color: '#5C5C5C',
  },
  circleSeparator: {
    height: 3,
    width: 3,
    borderRadius: 1.5,
    backgroundColor: color.black,
    alignSelf: 'center',
    marginHorizontal: 9,
  },
  marginLeft: {
    marginLeft: 5,
  },
});
export default ServiceTransactionItem;
