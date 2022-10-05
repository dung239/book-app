import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, icons} from '../../../assets';
import FormButton from '../../components/FormButton';
import auth from '@react-native-firebase/auth';
import db from '../../firebase/firebase';
import {Image} from 'react-native';
import LineDivider from '../../components/LineDivider';

export default function Cart({navigation, route}) {
  const [invoice, setInvoice] = useState([]);
  const [cost, setCost] = useState('');
  const [info, setInfo] = useState([])

  if (route.params == null) {
    useEffect(() => {
      setInvoice([]);
    }, [invoice==[]]);
  } else {
    useEffect(() => {
      invoice.push({
        id: route.params.id,
        name: route.params.name,
        price: route.params.price,
        amount: route.params.amount,
        image: route.params.image,
        author: route.params.author,
        pages: route.params.pages,
        content: route.params.content,
        category: route.params.category,
        amount1: route.params.amount1,
        importprice: route.params.iprice
      });
      setInvoice(invoice);
      console.log(invoice);
      getCost();
    }, [
      route.params.id,
      route.params.name,
      route.params.price,
      route.params.amount,
      route.params.image,
      route.params.author,
      route.params.pages,
      route.params.content,
      route.params.category,
      route.params.amount1,
      route.params.iprice
    ]);
  }

  useEffect(()=>{
      db
        .collection('User')
        .where('idUser', '==', auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          const infos = [];
          querySnapshot.forEach(documentSnapshot => {
            infos.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setInfo(infos);
        });
  }, [])

  const getCost = () => {
    let cost = 0;
    for (let index = 0; index < invoice.length; index++) {
      let price = invoice[index].price;
      let amount1 = invoice[index].amount;
      cost = cost + price * amount1;
    }
    setCost(cost);
  };

  // đặt hàng
  const handlePay = () => {
    const uid = auth().currentUser.uid;
    db.collection('Invoice').add({
      invoice: invoice,
      dateTime: dateTime,
      date: date,
      time: time,
      total: cost,
      id: db.collection('Invoice').doc().id,
      user: uid,
      status: 'Đặt hàng',
    });
    console.log(route.params);
    console.log(invoice);
    setInvoice([]);
    setCost(0);
  };

  const today = new Date();
  const date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = time + '  ' + date;

  if (invoice.length == 0) {
    return (
      <View style={{margin: 40}}>
        <Image
          source={icons.cart1_icon}
          style={{height: 200, width: 200, alignSelf: 'center'}}></Image>
        <Text style={{...FONTS.body1, marginBottom: 20}}>
          Chưa có sản phẩm nào
        </Text>
        <FormButton
          labelText="Mua hàng"
          handleOnPress={() => navigation.navigate('Danh mục')}></FormButton>
      </View>
    );
  } else {
    return (
      <View>
        <ScrollView style={{margin: 10, height: '85%'}}>
          {invoice.map(item => {
            return (
              <View
                key={item.id}
                style={{
                  margin: 10,
                  height: 100,
                  borderColor: COLORS.black1,
                  borderWidth: 1,
                  padding: 5,
                  borderRadius: 5,
                }}>
                <View style={{flex: 2, flexDirection: 'row'}}>
                  <Image
                    source={{uri: item.image}}
                    resizeMode="contain"
                    style={{height: 90, width: 90}}
                  />
                  <View style={{flex: 1}}>
                    <Text style={{...FONTS.body3}}>{item.name}</Text>
                    <View>
                      <Text style={{...FONTS.body3, padding: 3}}>
                        {item.amount}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{...FONTS.body3, width: '30%', alignSelf: 'center'}}>
                    {item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    đ
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View>
          {info.map((item)=>{
            return(
              <View style={{marginHorizontal: 20}}>

                <Text style={{...FONTS.body2}}>Địa chỉ: {item.address}</Text>
              </View>
            )
          })}
        </View>
        <View style={{marginHorizontal: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{...FONTS.body2, flex: 1, paddingTop: 5}}>
              Tổng cộng:{' '}
            </Text>
            <Text style={{...FONTS.body2, marginHorizontal: 10, padding: 5}}>
              {cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
            </Text>
            <FormButton
              labelText="Đặt hàng"
              handleOnPress={handlePay}
              style={{padding: 20}}
            />
          </View>
        </View>
      </View>
    );
  }
}
