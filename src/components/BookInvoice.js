import { View, Text } from 'react-native'
import React from 'react'

export default function BookInvoice({name, amount}) {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
            <Text style={{width: '80%'}}>tên sách {name}</Text>
            <Text style={{width: '20%'}}>so lượng {amount}</Text>
          </View>
    </View>
  )
}