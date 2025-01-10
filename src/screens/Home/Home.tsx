import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import { format } from 'date-fns';

import { DASHBOARD_ITEMS, IMAGES } from '@app/constant';
import {
  ChevronRightIcon,
  CircleArrowRightIcon,
  DashboardUpdateIcon,
  HorizontalKebabIcon,
} from '@app/icons';
import { color, font } from '@app/styles';
import { EmptyState, ErrorModal, LoadingAnimation, RatingStars } from '@app/components';
import { getServicesRequest } from '@app/services';
import GlobalContext from '@app/context';
import { Service } from '../../types/services/types';
import FilterOption from './FilterOption';

const FILTER_VALUE = {
  top: {
    field: 'ratings',
    direction: 'desc',
  },
  low: {
    field: 'ratings',
    direction: 'asc',
  },
  most_recent: {
    field: 'last_review',
    direction: 'desc',
  },
};

const Home = () => {
  const { user } = useContext(GlobalContext);
  const navigation = useNavigation<any>();
  const [screenStatus, setScreenStatus] = useState({
    isLoading: false,
    hasError: false,
  });
  const [services, setServices] = useState<Service[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<keyof typeof FILTER_VALUE>('top');
  const [isFilterOptionVisible, setIsFilterOptionVisible] = useState(false);

  const fetchService = async (filter: keyof typeof FILTER_VALUE) => {
    setScreenStatus({ hasError: false, isLoading: true });
    const response = await getServicesRequest(
      user.token,
      FILTER_VALUE[filter].field,
      FILTER_VALUE[filter].direction as 'asc' | 'desc',
      5,
      0,
    );

    if (response.success && response.data) {
      const { data, errors } = response.data;

      if (errors.length > 0) {
        setScreenStatus({ isLoading: false, hasError: true });
      } else {
        setServices(data.services);
        setScreenStatus({ hasError: false, isLoading: false });
      }
    } else {
      setScreenStatus({ isLoading: false, hasError: true });
    }
  };

  useEffect(() => {
    fetchService(selectedFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (date: string | null) => {
    if (date) {
      return format(new Date(date), 'MMMM dd, yyyy');
    }

    return 'No available data';
  };

  const handlePressDashboardItem = (screen: string) => navigation.navigate(screen);

  const closeModal = () => setScreenStatus({ hasError: false, isLoading: false });

  const toggleFilter = () => setIsFilterOptionVisible(!isFilterOptionVisible);

  const onSelectedFilter = (filter: string) => {
    const selectedFilterValue = filter as keyof typeof FILTER_VALUE;
    toggleFilter();
    setSelectedFilter(selectedFilterValue);
    fetchService(selectedFilterValue);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={color.background} barStyle="dark-content" />
      <LoadingAnimation isLoading={screenStatus.isLoading} type="modal" />
      <ErrorModal
        isVisible={screenStatus.hasError}
        onCancel={closeModal}
        onRetry={() => fetchService(selectedFilter)}
      />
      <View style={styles.heading}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Hello Admin</Text>
          <Text style={styles.subHeader}>Keep an eye on your sales with care.</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image source={IMAGES.AVATAR} style={styles.avatar} resizeMode="contain" />
        </View>
      </View>
      <ScrollView style={styles.scrollView} bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.salesContainer}>
          <View style={styles.content}>
            <View style={styles.header}>
              <DashboardUpdateIcon />
              <Text style={styles.headerText}>Update</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.date}>December 12, 2024</Text>
              <Text style={styles.description}>
                {'Sales Revenue Increased by '}
                <Text style={styles.increase}>30%</Text>
                {' in 1 week'}
              </Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>View Statistics</Text>
              <ChevronRightIcon />
            </View>
          </View>
        </View>
        <View style={styles.dashboardContainer}>
          <View style={styles.dashboardRow}>
            {DASHBOARD_ITEMS.map(({ id, title, icon: Icon, screen }) => (
              <TouchableOpacity
                key={id}
                style={styles.dashboardItem}
                onPress={() => handlePressDashboardItem(screen)}
              >
                <Icon />
                <Text style={styles.title}>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.topServicesHeader}>
          <Text style={styles.label}>Top Services</Text>
          <>
            <TouchableOpacity onPress={toggleFilter}>
              <HorizontalKebabIcon />
            </TouchableOpacity>
            {isFilterOptionVisible && (
              <FilterOption
                top={19}
                selectedFilter={selectedFilter}
                onSelectedFilter={onSelectedFilter}
              />
            )}
          </>
        </View>

        {services.length > 0 ? (
          <>
            <View style={styles.serviceContainer}>
              {services.map((item) => (
                <View style={styles.row} key={item.id}>
                  <FastImage
                    style={styles.serviceImage}
                    source={{
                      uri: item.image,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <View style={styles.serviceContent}>
                    <Text style={styles.service}>{item.title}</Text>
                    <View style={styles.ratings}>
                      <RatingStars rating={item.ratings} />
                      <Text style={styles.count}>{`(${item.reviews_count})`}</Text>
                    </View>
                    <Text style={styles.serviceDate}>{formatDate(item.last_review)}</Text>
                  </View>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAll}>View All</Text>
              <CircleArrowRightIcon />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <EmptyState />
            <View style={styles.emptyStateSeparator} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF',
    paddingTop: 20,
    paddingBottom: 10,
  },
  avatar: {
    width: 49,
    height: 49,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  scrollView: {
    paddingHorizontal: 24,
  },
  greetingContainer: {
    gap: 5,
  },
  greeting: {
    ...font.regular,
    fontSize: 24,
    color: '#050303',
  },
  subHeader: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 20,
    color: '#696969',
  },
  avatarContainer: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboardContainer: {
    paddingHorizontal: 23,
    paddingVertical: 20,
    marginTop: 24,
    justifyContent: 'space-between',
    backgroundColor: '#F3F2EF',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  dashboardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dashboardItem: {
    gap: 5,
    width: '25%',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 16,
    color: '#1F93E1',
  },
  salesContainer: {
    height: 207,
    backgroundColor: color.primary,
    borderRadius: 24,
    padding: 19,
    marginTop: 24,
  },
  content: {
    gap: 30,
  },
  footer: {
    gap: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    ...font.regular,
    fontSize: 12,
    color: '#DBDADA',
  },
  body: {
    gap: 3,
  },
  date: {
    ...font.regular,
    fontSize: 12,
    color: '#C3C3C3',
  },
  description: {
    ...font.regular,
    lineHeight: 28,
    fontSize: 24,
    color: '#FAFAFA',
  },
  increase: {
    color: '#6FFF00',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerText: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 20,
    color: '#FAFAFA',
  },
  label: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#000000',
  },
  topServicesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  service: {
    ...font.regular,
    fontSize: 16,
    lineHeight: 16,
    color: '#000000',
  },
  serviceDate: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: '#777676',
  },
  count: {
    ...font.regular,
    fontSize: 12,
    lineHeight: 12,
    color: '#000000',
  },
  row: {
    flexDirection: 'row',
  },
  serviceContainer: {
    gap: 24,
  },
  serviceImage: { width: '45%', height: 100, borderRadius: 8 },
  serviceContent: {
    justifyContent: 'center',
    marginLeft: 20,
    gap: 8,
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  viewAll: {
    ...font.regular,
    fontSize: 16,
    color: color.primary,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 24,
  },
  emptyStateSeparator: {
    marginBottom: 30,
  },
});

export default Home;
