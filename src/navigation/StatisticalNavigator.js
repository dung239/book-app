import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Statistical from '../screens/adminScreens/Statistical'
import InvoiceDetail from '../screens/InvoiceDetail'

const StackStatistical = createNativeStackNavigator()

export default function StatisticalNavigator() {
  return (
    <StackStatistical.Navigator
      initialRouteName="StatisticalNavigator"
      screenOptions={{headerShown: true}}
      >
      <StackStatistical.Screen name="Statistical" component={Statistical} options={{headerShown: false}}/>
      <StackStatistical.Screen name="Chi tiết hóa đơn" component={InvoiceDetail} />
    </StackStatistical.Navigator>
  )
}