import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {async} from '@firebase/util';
import db from '../../firebase/firebase';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import {FlatList} from 'react-native';
import {useEffect} from 'react';
import {COLORS} from '../../../assets';
import {useNavigation} from '@react-navigation/core';

export default function OrderTracking() {
  const [invoice, setInvoice] = useState([]);
  const navigation = useNavigation();

  const getInvoice = async () => {
    await db
      .collection('Invoice')
      .where('user', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        const listVoice = [];
        querySnapshot.forEach(documentSnapshot => {
          listVoice.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setInvoice(listVoice);
      });
  };

  useEffect(() => {
    getInvoice();
  }, []);

  return (
    <View>
      <FlatList
        data={invoice}
        style={{height: '98%'}}
        showsVerticalScrollIndicator={false}
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
                navigation.navigate('Thông tin đơn', {
                  status: item.status,
                  time: item.dateTime,
                  total: item.total,
                  invoice: item.invoice,
                  id: item.id,
                  key: item.key,
                  user: item.user,
                  update: item.updateAt
                })
              }>
              <View style={{margin: 10}} key={item.key}>
                <View>
                  <Text>Trạng thái: {item.status}</Text>
                </View>
                <View>
                  <Text>Thời gian: {item.dateTime}</Text>
                </View>
                <View>
                  <Text>Tổng tiền: {item.total.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
                </View>
                {/* <View>
                           {item.invoice.map(({items})=>{
                            return(
                            <View>{items.name}</View>
                           );})}
                          </View> */}
              </View>
            </TouchableOpacity>
          );
        }}></FlatList>
    </View>
  );
}
