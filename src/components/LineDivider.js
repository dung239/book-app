import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../assets'

export default function LineDivider() {
  return (
    <SafeAreaView>
      <View
      style={{
        width: '100%',
        paddingHorizontal: SIZES.padding,
        paddingVertical: 8,
      }}>
      <View
        style={{
          flex: 1,
          borderBottomColor: COLORS.lightGray3,
          borderBottomWidth: 1,
        }}></View>
    </View>
    </SafeAreaView>
  )
}