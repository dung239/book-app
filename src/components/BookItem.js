import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, icons, SIZES} from '../../assets';
import {useNavigation} from '@react-navigation/native';

export default function BookItem({
  name,
  author,
  category,
  pages,
  amount,
  price,
  image,
  id,
}) {
  const [amount1, setAmount1] = useState('');
  const navigation = useNavigation();

  return (
    <View style={{marginVertical: SIZES.base, margin: 10, height: 150}}>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          //   borderWidth: 1,
          //   borderColor: COLORS.black,
        }}
        // onPress={handleOnPress}
      >
        <Image
          source={{
            uri: image,
          }}
          resizeMode="cover"
          style={{width: 100, height: 150, borderRadius: 10}}
        />
        <View style={{flex: 1, marginLeft: SIZES.radius}}>
          <View>
            <Text
              style={{
                paddingRight: SIZES.padding,
                ...FONTS.h3,
                color: COLORS.black,
              }}>
              {name}
            </Text>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.lightGray,
                marginTop: SIZES.base,
              }}>
              {author}
            </Text>
          </View>

          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.orange,
              marginVertical: SIZES.base,
            }}>
            {category}
          </Text>
          <View>
            <Text style={{...FONTS.body4, color: COLORS.black}}>
              {pages} trang
            </Text>
          </View>
        </View>
        <View>
          {/* <TouchableOpacity style={{flexDirection: 'row', marginBottom: 10}}
          onPress={updatehandle}>
            <Image source={icons.plus_icon}
            style={{width: 15, height: 15}}></Image>
            <Text>Nhập thêm</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate({
                name: 'Hóa đơn',
                params: {
                  bookid: id,
                  bookname: name,
                  price: price,
                  amount1: amount1,
                  amount: amount,
                },
              })
            }>
            <Text>Lập hóa đơn</Text>
          </TouchableOpacity>
          <Text style={{marginRight: 40, marginBottom: 10, marginTop: 40}}>
            Số lượng: {amount}
          </Text>
          <Text style={{marginRight: 40}}>Giá: {price} đ</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{marginTop: 3}}>Khách mua: </Text>
            <TextInput
              style={{padding: 0}}
              placeholder="...."
              value={amount1}
              onChangeText={text => setAmount1(text)}
              keyboardType={'numeric'}></TextInput>
          </View>
        </View>
      </View>
    </View>
  );
}
