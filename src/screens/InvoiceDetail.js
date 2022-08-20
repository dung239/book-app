import {View, Text} from 'react-native';
import React from 'react';
import {FONTS} from '../../assets';
import {SafeAreaView, TabRouter} from 'react-navigation';

export default function InvoiceDetail({navigation, route}) {
  return (
    <SafeAreaView>
      <View style={{margin: 20}}>
        <View>
          <Text style={{...FONTS.body2}}>
            Khách hàng: {route.params.customer}
          </Text>
        </View>
        <View>
          <Text style={{...FONTS.body2}}>
            Số điện thoại: {route.params.phone}
          </Text>
        </View>
        <View>
          <Text style={{...FONTS.body2}}>Thời gian: {route.params.time}</Text>
        </View>
        <View>
          <Text style={{...FONTS.body2}}>Danh sách sản phẩm </Text>
        </View>
        {route.params.invoice.map(item => {
          return (
            <View style={{flexDirection: 'row'}} key={item.index}>
              <View style={{width: '80%'}}>
                <Text style={{...FONTS.body2}}>{item.name}</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={{...FONTS.body2}}>{item.amount1}</Text>
              </View>
            </View>
          );
        })}
        <View style={{marginLeft: '40%'}}>
          <Text style={{...FONTS.body2}}>Tổng cộng: {route.params.total}đ</Text>
        </View>
        {/* <View style={{flexDirection: 'row'}}>
        <View style={{width: '70%', ...FONTS.body3}}>
          <Text>ád</Text>
        </View>
        <View style={{width: '30%', ...FONTS.body3}}>
          <Text>ád</Text>
        </View>
      </View> */}
      </View>
    </SafeAreaView>
  );
}
