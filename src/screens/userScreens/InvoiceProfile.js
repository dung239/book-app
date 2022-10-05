import {View, Text, Image, ScrollView, EventEmitter, Alert} from 'react-native';
import React from 'react';
import {SafeAreaView, TabRouter} from 'react-navigation';
import {FONTS} from '../../../assets';
import FormButton from '../../components/FormButton';
import db from '../../firebase/firebase';
import firestore from '@react-native-firebase/firestore';
import {TouchEventType} from 'react-native-gesture-handler/lib/typescript/TouchEventType';

export default function InvoiceProfile({navigation, route}) {
  const today = new Date();
  const date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = time + '  ' + date;

  // hủy hóa đơn
  const handleCancle = () => {
    db.collection('Invoice')
      .doc(route.params.key)
      .update({
        user: route.params.user,
        datetime: route.params.time,
        status: 'Đã hủy',
        total: route.params.total,
        invoice: route.params.invoice,
        id: route.params.id,
        updateAt: dateTime,
      })
      .then(
        Alert.alert('Thông báo', 'Hủy đơn hàng thành công', [
          {text: 'Đồng ý', onPress: () => navigation.navigate('Theo dõi đơn')},
        ]),
      );
  };

  // xác nhận hóa đơn
  const handleComplete = () => {
    db.collection('Invoice')
      .doc(route.params.key)
      .update({
        user: route.params.user,
        datetime: route.params.time,
        status: 'Đã nhận',
        total: route.params.total,
        invoice: route.params.invoice,
        id: route.params.id,
        updateAt: dateTime,
      })
      .then(
        Alert.alert('Thông báo', 'Bạn đã nhận được hàng', [
          {text: 'Đồng ý', onPress: () => navigation.navigate('Theo dõi đơn')},
        ]),
      );
    route.params.invoice.forEach(item => {
      db.collection('Book')
        .doc(item.id)
        .update({
          amount: Number(item.amount1) - Number(item.amount),
          author: item.author,
          bookname: item.name,
          pages: item.pages,
          price: item.price,
          image: item.image,
          categoryId: item.category,
          content: item.content,
          importprice: item.importprice,
        });
    });
  };

  if (route.params.status == 'Đặt hàng') {
    return (
      <SafeAreaView>
        <View style={{margin: 20}}>
          <View>
            <Text style={{...FONTS.body2}}>
              Tình trạng: {route.params.status}
            </Text>
          </View>
          <View>
            <Text style={{...FONTS.body2}}>
              Thời gian đặt: {route.params.time}
            </Text>
          </View>
          <View>
            <Text style={{...FONTS.body2}}>Danh sách sản phẩm </Text>
          </View>
          <ScrollView style={{height: '74%'}}>
            {route.params.invoice.map(item => {
              return (
                <View
                  style={{flexDirection: 'row', marginTop: 10}}
                  key={item.index}>
                  <Image
                    source={{uri: item.image}}
                    resizeMode="contain"
                    style={{height: 90, width: 60}}
                  />
                  <View style={{width: '80%'}}>
                    <Text style={{...FONTS.body2}}>{item.name}</Text>
                  </View>
                  <View style={{width: '20%'}}>
                    <Text style={{...FONTS.body2}}>{item.amount}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={{marginLeft: '40%'}}>
            <Text style={{...FONTS.body2}}>
              Tổng cộng:{' '}
              {route.params.total
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              đ
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <FormButton
              labelText="Hủy đơn"
              style={{padding: '15%', marginRight: '5%'}}
              handleOnPress={handleCancle}></FormButton>
            <FormButton
              labelText="Đã nhận"
              style={{padding: '15%'}}
              handleOnPress={handleComplete}></FormButton>
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
  } else {
    return (
      <SafeAreaView>
        <View style={{margin: 20}}>
          <View>
            <Text style={{...FONTS.body2}}>
              Tình trạng: {route.params.status}
            </Text>
          </View>
          <View>
            <Text style={{...FONTS.body2}}>
              Thời gian đặt: {route.params.time}
            </Text>
          </View>
          <View>
            <Text style={{...FONTS.body2}}>
              Thời gian xác nhận: {route.params.createAt}
            </Text>
          </View>
          <View>
            <Text style={{...FONTS.body2}}>Danh sách sản phẩm </Text>
          </View>
          <ScrollView style={{height: '76%'}}>
            {route.params.invoice.map(item => {
              return (
                <View
                  style={{flexDirection: 'row', marginTop: 10}}
                  key={item.index}>
                  <Image
                    source={{uri: item.image}}
                    resizeMode="contain"
                    style={{height: 90, width: 60}}
                  />
                  <View style={{width: '80%'}}>
                    <Text style={{...FONTS.body2}}>{item.name}</Text>
                  </View>
                  <View style={{width: '20%'}}>
                    <Text style={{...FONTS.body2}}>{item.amount}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={{marginLeft: '40%'}}>
            <Text style={{...FONTS.body2}}>
              Tổng cộng:{' '}
              {route.params.total
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              đ
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
