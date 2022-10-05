import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import LineDivider from '../components/LineDivider';
import {COLORS, FONTS, icons} from '../../assets';
import FormButton from '../components/FormButton';

export default function BookProfile({navigation, route}) {
  const [amount, setAmount] = useState('');

  return (
    <SafeAreaView>
      <Image
        source={{uri: route.params.image}}
        style={{
          width: 150,
          height: 225,
          borderRadius: 10,
          alignSelf: 'center',
          margin: 10,
        }}
        resizeMode="cover"></Image>
      <ScrollView style={{height: '55%'}}>
        <View style={{marginHorizontal: 20}}>
          <Text style={{...FONTS.body3}}>Tên: {route.params.bookname}</Text>
        </View>
        <LineDivider />
        <View style={{marginHorizontal: 20}}>
          <Text style={{...FONTS.body3}}>Tác giả: {route.params.author}</Text>
        </View>
        <LineDivider />
        <View style={{marginHorizontal: 20}}>
          <Text style={{...FONTS.body3}}>
            Số trang: {route.params.page} trang
          </Text>
        </View>
        <LineDivider />
        <View style={{marginHorizontal: 20}}>
          <Text style={{...FONTS.body3}}>
            Giá bán:{' '}
            {route.params.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            đ
          </Text>
        </View>
        <LineDivider />
        <View style={{marginHorizontal: 20}}>
          <Text style={{...FONTS.body3}}>
            Số lượng còn: {route.params.amount1}
          </Text>
        </View>
        <LineDivider />
        <View style={{marginHorizontal: 20}}>
          <Text style={{...FONTS.body3}}>Nội dung: {route.params.content}</Text>
        </View>
        
      </ScrollView>
      <View
        style={{
          marginHorizontal: 20,
          flexDirection: 'row',
          //   backgroundColor: COLORS.blue,
        }}>
        <Text style={{...FONTS.body3, flex: 1, paddingTop: 10}}>Số lượng</Text>
        <TextInput
          style={{
            height: 30,
            width: 40,
            ...FONTS.body3,
            padding: 5,
            marginTop: 5,
            marginRight: 10,
            borderWidth: 1,
            borderColor: COLORS.black1,
          }}
          keyboardType={'numeric'}
          value={amount}
          onChangeText={(text) => {
            if(Number(text) > Number(route.params.amount1)){
              setAmount(route.params.amount1)
            }else{
              setAmount(text)
            }
            }}
            ></TextInput>
        <FormButton
          labelText="Thêm giỏ hàng"
          handleOnPress={() =>{
            navigation.navigate({
              name: 'Giỏ hàng',
              params: {
                id: route.params.bookid,
                name: route.params.bookname,
                price: route.params.price,
                image: route.params.image,
                amount: amount,
                author: route.params.author,
                pages: route.params.page,
                content: route.params.content,
                category: route.params.category,
                amount1: route.params.amount1,
                iprice: route.params.iprice
              },
            })
            setAmount('')
          }}/>
      </View>
    </SafeAreaView>
  );
}
