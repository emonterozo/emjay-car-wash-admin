import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DASHBOARD_ITEMS } from '@app/constant';
import { AvatarIcon, ChevronRightIcon, DashboardUpdateIcon, MenuIcon } from '@app/icons';
import { useNavigation } from '@react-navigation/native';

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF',
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});

export default Home;
