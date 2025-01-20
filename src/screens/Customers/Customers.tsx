import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import { NavigationProp } from '../../types/navigation/types';
import { Customer, ScreenStatusProps } from '../../types/services/types';
import {
  AppHeader,
  EmptyState,
  ErrorModal,
  LoadingAnimation,
  ActivityIndicator,
} from '@app/components';
import { color, font } from '@app/styles';
import { ERR_NETWORK, IMAGES } from '@app/constant';
import { getCustomersRequest } from '@app/services';
import GlobalContext from '@app/context';

const renderSeparator = () => <View style={styles.separator} />;

const LIMIT = 50;

const Customers = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useContext(GlobalContext);
  const [totalCount, setTotalCount] = useState(0);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [isFetching, setIsFetching] = useState(false);

  const handleCardPress = (id: string) => {
    navigation.navigate('CustomerDetails', { id });
  };

  const fetchCustomers = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getCustomersRequest(user.accessToken, '_id', 'asc', LIMIT, 0);

    if (response.success && response.data) {
      setCustomers(response.data.customers);
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
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  const onEndReached = async () => {
    if (customers.length < totalCount) {
      setIsFetching(true);
      const response = await getCustomersRequest(
        user.accessToken,
        '_id',
        'asc',
        LIMIT,
        customers.length,
      );

      if (response.success && response.data) {
        setCustomers((prev) => [...prev, ...response.data?.customers!]);
        setTotalCount(response.data.totalCount);
      }
      setIsFetching(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Customers" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchCustomers}
      />
      <View style={styles.heading}>
        <Text style={styles.textCustomerList}>Customer List</Text>
        {customers.length > 0 && (
          <Text style={styles.textRegisteredCustomer}>{`Registered Customer: ${totalCount}`}</Text>
        )}
      </View>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.list}
        data={customers}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item.id)}>
            <Image
              source={item.gender === 'MALE' ? IMAGES.AVATAR_BOY : IMAGES.AVATAR_GIRL}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.details}>
              <Text style={styles.textName}>{`${item.first_name} ${item.last_name}`}</Text>
              <View style={styles.textInfoContainer}>
                <Text style={styles.textInfo}>{item.contact_number}</Text>
                <Text style={styles.textInfo}>
                  {format(new Date(item.registered_on), 'MMMM dd, yyyy')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={<EmptyState />}
        onEndReached={onEndReached}
        ListFooterComponent={<ActivityIndicator isLoading={isFetching} />}
      />
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
  separator: {
    marginTop: 24,
  },
  textRegisteredCustomer: {
    ...font.regular,
    fontSize: 16,
    color: '#696969',
    lineHeight: 16,
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
  textCustomerList: {
    ...font.regular,
    fontSize: 16,
    color: '#696969',
    lineHeight: 16,
    marginBottom: 16,
  },
  details: {
    flex: 1,
    gap: 8,
  },
  textName: {
    ...font.regular,
    fontSize: 24,
    color: '#000000',
    lineHeight: 24,
    marginBottom: 8,
  },
  textInfo: {
    ...font.regular,
    fontSize: 16,
    color: '#7F7A7A',
    lineHeight: 16,
  },
  textInfoContainer: {
    gap: 4,
  },
});

export default Customers;
