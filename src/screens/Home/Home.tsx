import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DASHBOARD_ITEMS } from '@app/constant';
import {
  AvatarIcon,
  ChevronRightIcon,
  CircleArrowRightIcon,
  DashboardUpdateIcon,
  HorizontalKebabIcon,
  MenuIcon,
  StarHalfFillIcon,
  StarIcon,
} from '@app/icons';
import { useNavigation } from '@react-navigation/native';

const IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/portfolio-d0d15.appspot.com/o/pexels-tima-miroshnichenko-6872601.jpg?alt=media&token=9688293b-ad76-4706-87a9-9446d42b576b';

const Home = () => {
  const navigation = useNavigation<any>();
  const handlePressDashboardItem = (screen: string) => navigation.navigate(screen);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.heading}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Hello Admin</Text>
          <Text style={styles.subHeader}>Keep an eye on your sales with care.</Text>
        </View>
        <View style={styles.avatarContainer}>
          <AvatarIcon />
          <MenuIcon />
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
          <TouchableOpacity>
            <HorizontalKebabIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.serviceContainer}>
          {[1, 2, 3, 4, 5].map((item) => (
            <View style={styles.row} key={item}>
              <Image src={IMAGE} style={styles.serviceImage} resizeMode="cover" />
              <View style={styles.serviceContent}>
                <Text style={styles.service}>Auto Detailing</Text>
                <View style={styles.ratings}>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarHalfFillIcon />
                  <StarIcon fill="#888888" />
                  <Text style={styles.count}>(100)</Text>
                </View>
                <Text style={styles.serviceDate}>July 5, 2024</Text>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAll}>View All</Text>
          <CircleArrowRightIcon />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF',
    paddingTop: 64,
    paddingBottom: 5,
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
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 24,
    color: '#050303',
  },
  subHeader: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
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
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 12,
    lineHeight: 16,
    color: '#1F93E1',
  },
  salesContainer: {
    height: 207,
    backgroundColor: '#016FB9',
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
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 12,
    color: '#DBDADA',
  },
  body: {
    gap: 3,
  },
  date: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 12,
    color: '#C3C3C3',
  },
  description: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
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
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#FAFAFA',
  },
  label: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 16,
    color: '#000000',
  },
  topServicesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  service: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 16,
    color: '#000000',
  },
  serviceDate: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 12,
    color: '#777676',
  },
  count: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 12,
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
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 16,
    color: '#016FB9',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 24,
  },
});

export default Home;
