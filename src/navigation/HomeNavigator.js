import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from '../screens/adminScreens/Home'
import BookDetail from '../screens/BookDetail'


const StackStatistical = createNativeStackNavigator()

export default function HomeNavigator() {
  return (
    <StackStatistical.Navigator
      initialRouteName="HomeNavigator"
      screenOptions={{headerShown: true}}
      >
      <StackStatistical.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <StackStatistical.Screen name="Thông tin sách" component={BookDetail} />
    </StackStatistical.Navigator>
  )
}