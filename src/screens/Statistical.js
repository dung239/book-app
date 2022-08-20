import {View, Text, ScrollView, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {async} from '@firebase/util';
import db from '../firebase/firebase';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native';
import {COLORS} from '../../assets';
import {FlatList} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {useNavigation} from '@react-navigation/native';

export default function Statistical({navigation}) {
  const [myInvoice, setMyInvoice] = useState([]);
  const [myInvoiceBook, setInvoiceBook] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInvoice = async () => {
    await db
      .collection('Invoice')
      .where('idStore', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          myInvoice.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
      });
    setMyInvoice(myInvoice);
    setLoading(false)
  };

  useEffect(() => {
    getInvoice();
  }, []);

  return (
    <View>
      {/* <TouchableOpacity onPress={getInvoice}>
        <Text>Xem hóa đơn</Text>
      </TouchableOpacity> */}
      <FlatList
        data={myInvoice}
        // keyExtractor={item => {
        //   item.key;
        // }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              key={item.key}
              style={{
                borderWidth: 1,
                borderColor: COLORS.black,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 5,
                marginTop: 5,
                borderRadius: 10,
              }}
              onPress={() =>
                navigation.navigate('Invoice Detail', {
                  customer: item.customer,
                  phone: item.phone,
                  time: item.time,
                  total: item.total,
                  invoice: item.invoice
                })
              }>
              <View style={{margin: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <Text>Khách hàng: {item.customer}</Text>
                </View>
                <View>
                  <Text>Số điện thoại: {item.phone}</Text>
                </View>
                <View>
                  <Text>Thời gian: {item.time}</Text>
                </View>
                <View>
                  <Text>Tổng tiền: {item.total}đ</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}></FlatList>
      {/* <ScrollView style={{margin: 20}}>
        {myInvoice.map(item => {
          return (
            <TouchableOpacity
              key={item.key}
              style={{
                borderWidth: 1,
                borderColor: COLORS.black,
                margin: 5,
                borderRadius: 10,
              }}>
              <View style={{margin: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <Text>Khách hàng: {item.customer}</Text>
                </View>
                <View>
                  <Text>Số điện thoại: {item.phone}</Text>
                </View>
                <View>
                  <Text>Thời gian: {item.time}</Text>
                </View>
                <View>
                  <Text>Tổng tiền: {item.total}đ</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView> */}
    </View>
  );
}
