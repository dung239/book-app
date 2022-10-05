import {View, Text, Image, SafeAreaView, Alert, Modal} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS} from '../../assets';
import LineDivider from '../components/LineDivider';
import FormButton from '../components/FormButton';
import db from '../firebase/firebase';
import FormInput from '../components/FormInput';
import auth from '@react-native-firebase/auth'

export default function BookDetail({navigation, route}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAmount, setNewAmount] = useState('');
  const [newPrice, setNewPrice] = useState('');

  //Sửa thông tin sách
  const handleUpdate = () => {
    db.collection('Book')
    .doc(route.params.bookid)
    .update({
      author: route.params.author,
      bookname: route.params.bookname,
      categoryId: route.params.category,
      pages: route.params.page,
      price: newPrice,
      importprice: route.params.importprice,
      amount: newAmount,
      image: route.params.image,
      createAt: route.params.time,
      content: route.params.content
    }).then(Alert.alert('Thông báo', 'Cập nhật thông tin thành công'))
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView>
      <View style={{margin: 20}}>
        <Image
          source={{uri: route.params.image}}
          style={{
            width: 150,
            height: 225,
            borderRadius: 10,
            alignSelf: 'center',
          }}
          resizeMode="cover"></Image>
      </View>
      <View style={{marginHorizontal: 20}}>
        <Text style={{...FONTS.body2}}>Tên sách: {route.params.bookname}</Text>
      </View>
      <LineDivider />
      <View style={{marginHorizontal: 20}}>
        <Text style={{...FONTS.body2}}>Tác giả: {route.params.author}</Text>
      </View>
      {/* <LineDivider />
      <View style={{marginHorizontal: 20}}>
        <Text style={{...FONTS.body2}}>Thể loại: {route.params.category}</Text>
      </View> */}
      <LineDivider />
      <View style={{marginHorizontal: 20}}>
        <Text style={{...FONTS.body2}}>
          Số trang: {route.params.page} trang
        </Text>
      </View>
      <LineDivider />
      <View style={{marginHorizontal: 20}}>
        <Text style={{...FONTS.body2}}>Giá bán: {route.params.price.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
      </View>
      <LineDivider />
      <View style={{marginHorizontal: 20}}>
        <Text style={{...FONTS.body2}}>Số lượng: {route.params.amount}</Text>
      </View>
      <LineDivider />
      
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            marginTop: 50,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // width: '80%',
            backgroundColor: COLORS.white,
            padding: 10,
            borderRadius: 20,
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
          <FormInput
            labelText="Giá bán"
            placeholderText="Nhập giá bán"
            onChangeText={value => setNewPrice(value)}
            value={newPrice}
            keyboardType={'numeric'}
          />
          <FormInput
            labelText="Số lượng"
            placeholderText="Nhập số lượng"
            onChangeText={value => setNewAmount(value)}
            value={newAmount}
            keyboardType={'numeric'}
          />
          <FormButton
            labelText="Cập nhật"
            handleOnPress={handleUpdate}
            style={{width: '100%'}}
          />
        </View>
      </Modal>
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <FormButton
          labelText="Sửa thông tin"
          style={{
            width: '40%',
            marginRight: '10%',
            marginLeft: '5%',
          }}
          handleOnPress={() => {
            setIsModalVisible(true);
            setNewAmount(route.params.amount)
            setNewPrice(route.params.price)
            // db.collection('Book').doc(route.params.bookid).update({...})
          }}></FormButton>
        <FormButton
          labelText="Xóa sách"
          style={{width: '40%'}}
          handleOnPress={() => {
            db.collection('Book')
              .doc(route.params.bookid)
              .delete()
              .then(Alert.alert('Thông báo', 'Xóa sách thành công'));
          }}></FormButton>
      </View>
    </SafeAreaView>
  );
}
