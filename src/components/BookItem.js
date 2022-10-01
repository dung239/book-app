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
  importprice,
  content,
  createAt
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate({
                name: 'Thông tin sách',
                params: {
                  bookid: id,
                  bookname: name,
                  price: price,
                  amount: amount,
                  image: image,
                  author: author,
                  page: pages,
                  category: category,
                  importprice: importprice,
                  content: content,
                  time: createAt
                },
              })
            }>
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
              {/* {category} */}
            </Text>
            <View>
              <Text style={{...FONTS.body4, color: COLORS.black}}>
                {pages} trang
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{marginRight: 40, marginBottom: 10}}>
            Số lượng: {amount}
          </Text>
          <Text style={{marginRight: 40, marginTop: 10}}>Giá: {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</Text>
        </View>
      </View>
    </View>
  );
}
