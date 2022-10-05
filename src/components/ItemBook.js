import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../assets';
import {useNavigation} from '@react-navigation/core';

export default function ItemBook({
  image,
  price,
  name,
  id,
  author,
  pages,
  category,
  content,
  amount,
  iprice
}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '45%',
        borderColor: COLORS.black,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: COLORS.black1,
        margin: '2%',
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate({
            name: 'Thông tin sách',
            params: {
              bookid: id,
              bookname: name,
              price: price,
              image: image,
              author: author,
              page: pages,
              content: content,
              category: category,
              amount1: amount,
              iprice: iprice
            },
          })
        }>
        <Image
          source={{
            uri: image,
          }}
          resizeMode="cover"
          style={{
            width: 100,
            height: 150,
            // borderRadius: 10,
            alignSelf: 'center',
          }}
        />
        <View>
          <Text
            style={{
              paddingRight: SIZES.padding,
              ...FONTS.h3,
              color: COLORS.white,
              paddingHorizontal: 5,
            }}>
            {name}
          </Text>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.white,
              marginTop: SIZES.base,
              paddingHorizontal: 5,
            }}>
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
