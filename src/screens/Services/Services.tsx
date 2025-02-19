import React, { useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';

import FilterOption from './FilterOption';
import { SizeKey } from '../../types/constant/types';
import { Price, ScreenStatusProps, Service } from '../../types/services/types';
import { FilterIcon, StarIcon } from '@app/icons';
import { AppHeader, EmptyState, ErrorModal, LoadingAnimation } from '@app/components';
import { getServicesRequest } from '@app/services';
import GlobalContext from '@app/context';
import { color, font } from '@app/styles';
import { useMeasure } from '@app/hooks';
import { ERR_NETWORK, SIZE_DESCRIPTION } from '@app/constant';
import { formattedNumber } from '@app/helpers';

const renderSeparator = () => <View style={styles.separator} />;

const Services = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation();
  const touchableRef = useRef<View>(null);
  const { layout, measure } = useMeasure(touchableRef);
  const [isOptionVisible, setIsOptionVisible] = useState(false);
  const [screenStatus, setScreenStatus] = useState<ScreenStatusProps>({
    isLoading: false,
    hasError: false,
    type: 'error',
  });
  const [filter, setFilter] = useState({
    type: 'Car',
    size: 'Small',
  });
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  const showPopover = () => {
    measure();
    setIsOptionVisible(!isOptionVisible);
  };

  const fetchService = async () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: true });
    const response = await getServicesRequest(user.accessToken, '_id', 'asc');
    if (response.success && response.data) {
      setServices(response.data.services);
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
    fetchService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isOptionVisible && services.length > 0) {
      const sizeKey = Object.keys(SIZE_DESCRIPTION).find(
        (key) => SIZE_DESCRIPTION[key as SizeKey] === filter.size,
      );

      setFilteredServices(
        services.filter(
          (service) =>
            service.type === filter.type.toLowerCase() &&
            service.price_list.some((price) => price.size === sizeKey),
        ),
      );
    }
  }, [isOptionVisible, services, filter]);

  const onSelectedType = (type: string) => {
    setFilter({
      size: 'Small',
      type,
    });
  };

  const onSelectedSize = (size: string) => {
    setFilter({
      ...filter,
      size,
    });
  };

  const onCancel = () => {
    setScreenStatus({ ...screenStatus, hasError: false, isLoading: false });
    navigation.goBack();
  };

  const getServicePrice = (priceList: Price[]) => {
    const sizeKey = Object.keys(SIZE_DESCRIPTION).find(
      (key) => SIZE_DESCRIPTION[key as SizeKey] === filter.size,
    );

    const service = priceList.find((item) => item.size === sizeKey);

    if (service) {
      return formattedNumber(service?.price ?? 0);
    }

    return `${formattedNumber(priceList[0].price)} ${priceList[0].size}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <AppHeader title="Services" />
      <LoadingAnimation isLoading={screenStatus.isLoading} />
      <ErrorModal
        type={screenStatus.type}
        isVisible={screenStatus.hasError}
        onCancel={onCancel}
        onRetry={fetchService}
      />
      <View style={styles.heading}>
        <Text style={styles.label}>List of Services</Text>
        {filteredServices.length > 0 && (
          <TouchableOpacity ref={touchableRef} style={styles.filterContainer} onPress={showPopover}>
            <FilterIcon />
            <Text style={styles.label}>{`${filter.type}/${filter.size}`}</Text>
          </TouchableOpacity>
        )}
        {isOptionVisible && (
          <FilterOption
            top={layout?.height! + 5}
            selectedType={filter.type}
            selectedSize={filter.size}
            onSelectedType={onSelectedType}
            onSelectedSize={onSelectedSize}
          />
        )}
      </View>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.list}
        data={filteredServices}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <FastImage
              style={styles.image}
              source={{
                uri: item.image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.ratingsContainer}>
              <StarIcon width={20} height={16} />
              <Text style={styles.ratings}>{item.ratings}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>{getServicePrice(item.price_list)}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={<EmptyState />}
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
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 35,
    paddingHorizontal: 25,
  },
  label: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#696969',
  },
  filterContainer: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: color.background,
  },
  name: {
    ...font.regular,
    fontSize: 24,
    lineHeight: 24,
    color: '#000000',
  },
  separator: {
    marginTop: 24,
  },
  description: {
    ...font.regular,
    fontSize: 20,
    lineHeight: 20,
    flex: 1,
    color: '#888888',
  },
  price: {
    ...font.regular,
    fontSize: 20,
    lineHeight: 20,
    flex: 1,
    color: color.primary,
  },
  card: {
    backgroundColor: color.background,
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    height: 201,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  descriptionContainer: {
    padding: 16,
    gap: 10,
    marginVertical: 15,
  },
  ratingsContainer: {
    position: 'absolute',
    right: 13,
    top: 13,
    backgroundColor: '#F4F9FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
  },
  ratings: {
    ...font.regular,
    fontSize: 16,
    color: '#050303',
    letterSpacing: 1,
  },
});

export default Services;
