import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Avatar } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import { DASHBOARD_ITEMS } from '../../utils/constant/constant';
import { MaterialCommunityIcon } from '@app/components';

const Dashboard = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.heading}>
        <Avatar size="giant" source={require('../../../assets/images/human.png')} />
        <Text category="h5" status="info" style={styles.greeting}>
          Good Day Admin!
        </Text>
      </View>
      <View style={styles.listContainer}>
        {DASHBOARD_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcon name={item.icon} size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    padding: 16,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  greeting: {
    fontWeight: 'bold',
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#04528E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
    fontWeight: '600',
  },
});

export default Dashboard;
