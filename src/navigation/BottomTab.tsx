import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Home, Message, Scan, Transaction, Settings } from '@app/screens';
import { IMAGES } from '@app/constant';

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
    title: '',
    icon: undefined,
  },
  {
    title: 'TRANSACTIONS',
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

        if (route.name === 'Scan') {
          return (
            <TouchableOpacity key={route.key} style={styles.scanButton} onPress={handlePress}>
              <Image source={IMAGES.SCAN} resizeMode="contain" />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity key={route.key} onPress={handlePress} style={styles.tabButton}>
            {isFocused ? TAB_ITEMS[index].icon_active : TAB_ITEMS[index].icon_inactive}
            <Text style={[styles.tabLabel, isFocused && styles.activeTabLabel]}>
              {TAB_ITEMS[index].title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      tabBar={CustomTabBar}
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
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderColor: '#B7B7B7',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    justifyContent: 'space-around',
    height: 92,
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
    top: -26,
    left: '50%',
    transform: [{ translateX: -20 }],
    zIndex: 1,
  },
  tabLabel: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
    fontSize: 12,
    color: '#888888',
  },
  activeTabLabel: {
    color: '#016FB9',
  },
});
