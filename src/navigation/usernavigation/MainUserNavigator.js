import {View, Text, Settings, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, icons} from '../../../assets';
import Cart from '../../screens/userScreens/Cart';
import Category from '../../screens/userScreens/Category';
import HomeUserNavigator from './HomeUserNavigator';
import SettingUserNavigation from './SettingUserNavigation';

export default function MainUserNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        showLabel: false,
        headerShown: false,
        tabBarIcon: ({focused}) => {
          const tintColor = focused ? COLORS.blue : COLORS.black;
          switch (route.name) {
            case 'Trang chủ':
              return (
                <Image
                  source={icons.home_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
            case 'Danh mục':
              return (
                <Image
                  source={icons.category_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
            case 'Giỏ hàng':
              return (
                <Image
                  source={icons.cart_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
            case 'Tài khoản':
              return (
                <Image
                  source={icons.user_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
          }
        },
      })}>
      <Tab.Screen name="Trang chủ" component={HomeUserNavigator} />
      <Tab.Screen name="Danh mục" component={Category} />
      <Tab.Screen name="Giỏ hàng" component={Cart} />
      <Tab.Screen name="Tài khoản" component={SettingUserNavigation} />
    </Tab.Navigator>
  );
}
