import React, { useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';

import FilterOption from './FilterOption';
import { SizeKey } from '../../types/constant/types';
import { Price, ScreenStatusProps, Service } from '../../types/services/types';
import { FilterIcon, FreeIcon, StarIcon } from '@app/icons';
import { AppHeader, EmptyState, ErrorModal, LoadingAnimation } from '@app/components';
import { getServicesRequest } from '@app/services';
import GlobalContext from '@app/context';
import { color, font } from '@app/styles';
import { useMeasure } from '@app/hooks';
import { ERR_NETWORK, SIZE_DESCRIPTION, SIZES } from '@app/constant';
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

      const servicesWithoutSize: Service[] = [];

      services
        .filter((service) => service.type === filter.type.toLowerCase())
        .forEach((service) => {
          const noSize = service.price_list.find((item) => !SIZES.includes(item.size));
          if (noSize) {
            servicesWithoutSize.push(service);
          }
        });

      const filterServices = services.filter(
        (service) =>
          service.type === filter.type.toLowerCase() &&
          service.price_list.some((price) => price.size === sizeKey),
      );

      setFilteredServices([...filterServices, ...servicesWithoutSize]);
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

  const getServicePricePoints = (priceList: Price[], type: 'points' | 'earning_points') => {
    const sizeKey = Object.keys(SIZE_DESCRIPTION).find(
      (key) => SIZE_DESCRIPTION[key as SizeKey] === filter.size,
    );

    const service = priceList.find((item) => item.size === sizeKey);

    if (service) {
      return type === 'points' ? service?.points : service?.earning_points;
    }

    return type === 'points' ? priceList[0].points : priceList[0].earning_points;
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
            <View style={styles.top}>
              <FastImage
                style={styles.image}
                source={{
                  uri: item.image,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.details}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.content}>
                  <View style={styles.ratingsContainer}>
                    <StarIcon width={16} height={16} />
                    <Text style={styles.ratings}>{item.ratings}</Text>
                  </View>
                  <View style={styles.pointsContainer}>
                    <FreeIcon />
                    <Text style={styles.points}>
                      {getServicePricePoints(item.price_list, 'points') > 0
                        ? `${getServicePricePoints(item.price_list, 'points')} points`
                        : '10 wash'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.bottom}>
              <View style={styles.bottomContent}>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.priceValue}>{getServicePrice(item.price_list)}</Text>
              </View>
              <View style={styles.earningContainer}>
                <Text style={styles.earningPoints}>
                  {getServicePricePoints(item.price_list, 'earning_points') > 0
                    ? `Earn ${getServicePricePoints(item.price_list, 'earning_points')} Points!`
                    : 'Earn 1 Wash Count!'}
                </Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
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
    backgroundColor: color.background,
    paddingTop: 10,
    paddingBottom: 20,
  },
  separator: {
    marginTop: 24,
  },
  card: {
    backgroundColor: color.background,
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 24,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    ...font.regular,
    fontSize: 16,
    color: '#696969',
  },
  priceValue: {
    ...font.regular,
    fontSize: 16,
    color: '#050303',
    marginTop: 8,
  },
  earningContainer: {
    backgroundColor: '#1F93E1',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  earningPoints: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#F3F2EF',
  },
  top: {
    flexDirection: 'row',
    gap: 12,
  },
  name: {
    ...font.regular,
    fontSize: 20,
    color: '#000000',
  },
  description: {
    ...font.regular,
    fontSize: 16,
    color: '#888888',
  },
  ratingsContainer: {
    backgroundColor: '#F9ECD9',
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratings: {
    ...font.regular,
    fontSize: 16,
    color: '#050303',
  },
  pointsContainer: {
    backgroundColor: '#CAF9C7',
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  points: {
    ...font.regular,
    fontSize: 16,
    color: '#050303',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  details: {
    gap: 8,
    flex: 1,
  },
  image: {
    width: 108,
    borderRadius: 8,
  },
  bottomContent: {
    flex: 1,
  },
});

export default Services;
