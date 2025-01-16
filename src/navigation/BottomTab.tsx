import React, { useState } from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Home, Message, Scan, Transaction, Settings } from '@app/screens';
import { IMAGES } from '@app/constant';
import { color, font } from '@app/styles';

const Tab = createBottomTabNavigator();

const TAB_ITEMS = [
  {
    title: 'HOME',
    icon_active: <Image source={IMAGES.HOME_ACTIVE} resizeMode="contain" />,
    icon_inactive: <Image source={IMAGES.HOME_INACTIVE} resizeMode="contain" />,
  },
  {
    title: 'MESSAGES',
    icon_active: <Image source={IMAGES.MESSAGES_ACTIVE} resizeMode="contain" />,
    icon_inactive: <Image source={IMAGES.MESSAGES_INACTIVE} resizeMode="contain" />,
  },
  {
    title: 'SCAN',
    icon_active: <Image source={IMAGES.SCAN} resizeMode="contain" />,
    icon_inactive: <Image source={IMAGES.SCAN} resizeMode="contain" />,
  },
  {
    title: 'RECORDS',
    icon_active: <Image source={IMAGES.TRANSACTIONS_ACTIVE} resizeMode="contain" />,
    icon_inactive: <Image source={IMAGES.TRANSACTIONS_INACTIVE} resizeMode="contain" />,
  },
  {
    title: 'SETTINGS',
    icon_active: <Image source={IMAGES.SETTINGS_ACTIVE} resizeMode="contain" />,
    icon_inactive: <Image source={IMAGES.SETTINGS_INACTIVE} resizeMode="contain" />,
  },
];

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const [scanPosition, setScanPosition] = useState(0);
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const handlePress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={handlePress}
            style={[styles.tabButton, route.name === 'Scan' && styles.hide]}
            onLayout={(e) => {
              if (route.name === 'Scan') {
                setScanPosition(e.nativeEvent.layout.x);
              }
            }}
            disabled={route.name === 'Scan'}
          >
            {isFocused ? TAB_ITEMS[index].icon_active : TAB_ITEMS[index].icon_inactive}
            <Text style={[styles.tabLabel, isFocused && styles.activeTabLabel]}>
              {TAB_ITEMS[index].title}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        onPress={() => navigation.navigate('Scan')}
        style={[styles.scanButton, { left: scanPosition }]}
      >
        <Image source={IMAGES.SCAN} resizeMode="contain" />
        <Text style={[styles.scanLabel]}>Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Message" component={Message} />
      <Tab.Screen name="Scan" component={Scan} />
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F2EF',
    marginBottom: 8,
    borderTopWidth: 1,
    borderColor: '#B7B7B7',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
  },
  tabButton: {
    alignItems: 'center',
    gap: 6,
  },
  scanButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    top: -26,
    zIndex: 1,
  },
  tabLabel: {
    ...font.regular,
    fontSize: 10,
    color: '#888888',
  },
  activeTabLabel: {
    color: color.primary,
  },
  scanLabel: {
    ...font.regular,
    fontSize: 14,
    color: color.primary,
  },
  hide: {
    opacity: 0,
  },
});
