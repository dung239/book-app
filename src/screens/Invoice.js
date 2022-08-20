import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList,
  ListView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import db from '../firebase/firebase';
import auth from '@react-native-firebase/auth';
import {COLORS, FONTS} from '../../assets';
import FormButton from '../components/FormButton';
import {Value} from 'react-native-reanimated';
import { ListViewBase } from 'react-native';

export default function Invoice({navigation, route}) {
  const [info, setInfo] = useState([]);
  const [nameCustomer, setNameCustomer] = useState('');
  const [phoneCustomer, setPhoneCustomer] = useState('');
  const [invoice, setInvoice] = useState([]);
  const [cost, setCost] = useState('');

  if (route.params == undefined) {
    useEffect(() => {
      getInfo();
    }, []);
  } else {
    useEffect(() => {
      invoice.push( {
        id: route.params.bookid,
        name: route.params.bookname,
        price: route.params.price,
        amount1: route.params.amount1,
        amount2: route.params.amount,
      });
      setInvoice(invoice);
      getCost();
    }, [
      route.params.bookid,
      route.params.bookname,
      route.params.price,
      route.params.amount1,
    ]);
  }

  const getCost = () => {
    let cost = 0;
    for (let index = 0; index < invoice.length; index++) {
      let price = invoice[index].price;
      let amount1 = invoice[index].amount1;
      cost = cost + price * amount1;
    }
    setCost(cost);
  };

  const handlePay = () => {
    const uid = auth().currentUser.uid;
     db.collection('Invoice').add({
      idStore: uid,
      invoice: invoice,
      time: dateTime,
      total: cost,
      id: db.collection('Invoice').doc().id,
      customer: nameCustomer,
      phone: phoneCustomer
    });
    invoice.forEach(() => {
      const id = invoice.id
      const newAmount =route.params.amount - route.params.amount1
      db.collection('Book').doc(db.collection('Book').doc().id)
        .update({amount: newAmount})
    });
    
    console.log(info);
    console.log(route.params);
    console.log(invoice);
    setInvoice([]);
    setCost(0);
    setNameCustomer('')
    setPhoneCustomer('')
  };

  const getInfo = async () => {
    await db
      .collection('User')
      .doc(auth().currentUser.uid)
      .get()
      .then(documentSnapshot => {
        const infos = [];
        infos.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
        setInfo(infos);
      });
  };

  // useEffect(() => {
  //   getInfo();
  // }, []);

  const today = new Date();
  const date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = time + ' ' + date;
  return (
    <View>
      <View style={{margin: 10}}>
        {info.map(item => {
          return (
            <View key={item.key}>
              <Text
                style={{
                  alignContent: 'center',
                  alignSelf: 'center',
                  ...FONTS.h2,
                }}>
                {item.namestore}
              </Text>
              <Text
                style={{
                  alignContent: 'center',
                  alignSelf: 'center',
                  ...FONTS.h2,
                }}>
                {item.address}
              </Text>
              <Text
                style={{
                  alignContent: 'center',
                  alignSelf: 'center',
                  ...FONTS.h2,
                }}>
                {item.phone}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={{flexDirection: 'row', marginLeft: 5}}>
        <Text style={{paddingLeft: 5, paddingTop: 5}}>Khách hàng: </Text>
        <TextInput
          placeholder="......................................"
          style={{
            // borderColor: COLORS.black,
            // borderWidth: 1,
            padding: 0,
            borderRadius: 10,
            width: '40%',
            paddingLeft: 2,
          }}
          value={nameCustomer}
          onChangeText={text => setNameCustomer(text)}></TextInput>
        <Text style={{paddingLeft: 3, paddingTop: 5}}>Số đt: </Text>
        <TextInput
          placeholder="......................."
          style={{
            // borderColor: COLORS.black,
            // borderWidth: 1,
            padding: 0,
            borderRadius: 10,
            width: '25%',
            padding: 2,
          }}
          value={phoneCustomer}
          onChangeText={text => setPhoneCustomer(text)}></TextInput>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 10}}>
        <Text>Thời gian</Text>
        <Text>{dateTime}</Text>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
        <Text style={{...FONTS.body3, width: '50%'}}>Mặt hàng</Text>
        <Text style={{...FONTS.body3, width: '25%'}}>Số lượng</Text>
        <Text style={{...FONTS.body3, width: '30%'}}>Đơn giá</Text>
      </View>
      <ScrollView style={{margin: 10, height: '55%'}}>
        {invoice.map(item => {
          return (
            <View key={item.id}>
              <View style={{flexDirection: 'row'}} >
                <Text style={{...FONTS.body3, width: '50%'}}>{item.name}</Text>
                <Text style={{...FONTS.body2, width: '25%', padding: 3}}>
                  {item.amount1}
                </Text>
                <Text style={{...FONTS.body2, width: '30%'}}>
                  {item.price}đ
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...FONTS.body2, marginLeft: '40%'}}>Tổng cộng:</Text>
          <Text style={{...FONTS.body2, marginHorizontal: '10%'}}>{cost}đ</Text>
        </View>
        {/* <View style={{flexDirection: 'row'}}>
          <Text style={{...FONTS.body2, marginLeft: '30%'}}>Tổng cộng:</Text>
          <Text style={{...FONTS.body2, marginHorizontal: '20%'}}>ád</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...FONTS.body2, marginLeft: '30%'}}>Tổng cộng:</Text>
          <Text style={{...FONTS.body2, marginHorizontal: '20%'}}>ád</Text>
        </View> */}
      </View>
      <View>
        {/* <TouchableOpacity
        
        onPress={handlePay}
        style={{backgroundColor: COLORS.blue, padding: 10}}
        >
          <Text style={{color: COLORS.white}}>Thanh toán</Text>
        </TouchableOpacity> */}
        <FormButton
          labelText="Thanh toán"
          handleOnPress={handlePay}
          style={{}}
        />
      </View>
    </View>
  );
}
