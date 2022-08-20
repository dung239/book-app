import { View, Text, Settings, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Invoice from '../screens/Invoice'
import Home from '../screens/Home'
import Search from '../screens/Statistical'
import Setting from '../screens/Setting'
import { COLORS, icons } from '../../assets'
import SettingNavigator from './SettingNavigator'
import Statistical from '../screens/Statistical'
import StatisticalNavigator from './StatisticalNavigator'

export default function MainNavigator() {
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
                        case "Hóa đơn":
                            return (
                                <Image source={icons.invoice_icon}
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
                component={Home}

            />
            <Tab.Screen
                name="Hóa đơn"
                component={Invoice}
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