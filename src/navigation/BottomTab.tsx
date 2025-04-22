import React, { useState } from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Home, Message, Scan, Transaction, Settings } from '@app/screens';
import { color, font } from '@app/styles';
import { HomeIcon, MessageIcon, ScanIcon, SettingIcon, TransactionsIcon } from '@app/icons';

const Tab = createBottomTabNavigator();

const TAB_ITEMS = [
  {
    title: 'HOME',
    icon_active: <HomeIcon width={30} height={30} fill={color.primary} />,
    icon_inactive: <HomeIcon width={30} height={30} />,
  },
  {
    title: 'MESSAGES',
    icon_active: <MessageIcon width={30} height={30} fill={color.primary} />,
    icon_inactive: <MessageIcon width={30} height={30} />,
  },
  {
    title: 'SCAN',
    icon_active: null,
    icon_inactive: null,
  },
  {
    title: 'RECORDS',
    icon_active: <TransactionsIcon width={30} height={30} fill={color.primary} />,
    icon_inactive: <TransactionsIcon width={30} height={30} />,
  },
  {
    title: 'SETTINGS',
    icon_active: <SettingIcon width={30} height={30} fill={color.primary} />,
    icon_inactive: <SettingIcon width={30} height={30} />,
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
                setScanPosition(e.nativeEvent.layout.x - 12);
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
        <View style={styles.scan}>
          <ScanIcon width={30} height={30} />
        </View>
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
    paddingVertical: 5,
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
  scan: {
    backgroundColor: '#F3F2EF',
    borderColor: color.primary,
    padding: 10,
    borderWidth: 2,
    borderRadius: 30,
  },
});
