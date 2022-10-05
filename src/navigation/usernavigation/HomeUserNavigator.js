import { View, Text } from 'react-native'
import React from 'react'
import HomeUser from '../../screens/userScreens/HomeUser'
import BookProfile from '../../screens/BookProfile'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Category from '../../screens/userScreens/Category'
import Cart from '../../screens/userScreens/Cart'


const StackHome = createNativeStackNavigator()

export default function HomeUserNavigator() {
  return (
    <StackHome.Navigator
      initialRouteName="HomeNavigator"
      screenOptions={{headerShown: true}}
      >
      <StackHome.Screen name="Home" component={HomeUser} options={{headerShown: false}}/>
      <StackHome.Screen name="Thông tin sách" component={BookProfile} />
    </StackHome.Navigator>
  )
}