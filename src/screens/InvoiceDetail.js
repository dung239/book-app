import {View, Text} from 'react-native';
import React from 'react';
import {FONTS} from '../../assets';
import {SafeAreaView, TabRouter} from 'react-navigation';
import {Image} from 'react-native';
import db from '../firebase/firebase';
import {useState} from 'react';
import {useEffect} from 'react';
import { ScrollView } from 'react-native';

export default function InvoiceDetail({navigation, route}) {
  const [customer, setCustomer] = useState([]);

  const getCustomer = async () => {
    await db
      .collection('User')
      .where('idUser', '==', route.params.customer)
      .get()
      .then(querySnapshot => {
        const listCustomer = [];
        querySnapshot.forEach(documentSnapshot => {
          listCustomer.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setCustomer(listCustomer);
      });
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <SafeAreaView>
      <View style={{margin: 20}}>
        <View>
          {customer.map(item => {
            return (
              <View key={item.key}>
                <Text style={{...FONTS.body2}}>Khách hàng: {item.name}</Text>
                <Text style={{...FONTS.body2}}>
                  Số điện thoại: {item.phone}
                </Text>
              </View>
            );
          })}
        </View>
        <View>
          <Text style={{...FONTS.body2}}>Thời gian: {route.params.time}</Text>
        </View>
        <View>
          <Text style={{...FONTS.body2}}>Danh sách sản phẩm </Text>
        </View>
        <ScrollView style={{height: '76%'}}>

        {route.params.invoice.map(item => {
          return (
            // <View style={{flexDirection: 'row'}} key={item.index}>
            //   <View style={{width: '80%'}}>
            //     <Text style={{...FONTS.body2}}>{item.name}</Text>
            //   </View>
            //   <View style={{width: '20%'}}>
            //     <Text style={{...FONTS.body2}}>{item.amount}</Text>
            //   </View>
            // </View>
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
        <View style={{alignSelf: 'flex-end'}}>
          <Text style={{...FONTS.body2}}>
            Tổng cộng:{' '}
            {route.params.total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            đ
          </Text>
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
