import { View, Text, Settings, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS, icons } from '../../assets'
import SettingNavigator from './SettingNavigator'
import StatisticalNavigator from './StatisticalNavigator'
import HomeNavigator from './HomeNavigator'
import Category from '../screens/userScreens/Category'
import CategoryAdmin from '../screens/adminScreens/CategoryAdmin'

export default function MainAdminNavigator() {
    const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
        initialRouteName="Home"
            screenOptions={({ route }) => ({
                showLabel: false,
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.blue : COLORS.gray;
                    switch (route.name) {
                        case "Trang chủ":
                            return (
                                <Image source={icons.home_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                        case "Danh mục":
                            return (
                                <Image source={icons.category_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25

                                    }}
                                />
                            )
                        case "Thống kê":
                            return (
                                <Image source={icons.statistical_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                        case "Cài đặt":
                            return (
                                <Image source={icons.setting_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25

                                    }}
                                />
                            )
                    }
                }
            })}
        >
            <Tab.Screen
                name="Trang chủ"
                component={HomeNavigator}

            />
            <Tab.Screen
                name="Danh mục"
                component={CategoryAdmin}
            />
            <Tab.Screen
                name="Thống kê"
                component={StatisticalNavigator}
            />
            <Tab.Screen
                name="Cài đặt"
                component={SettingNavigator}
            />
    </Tab.Navigator>
  )
}