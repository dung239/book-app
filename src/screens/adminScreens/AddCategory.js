import {View, Text, SafeAreaView, Alert} from 'react-native';
import React, {useState} from 'react';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import {async} from '@firebase/util';
import db from '../../firebase/firebase';
import auth, {firebase} from '@react-native-firebase/auth';
import {COLORS} from '../../../assets';

export default function AddCategory() {
  const [category, setCategory] = useState('');
  const [importMoney, setImportMoney] = useState('');

  //Thêm thể loại
  const handleSubmit = async () => {
    await db
      .collection('Category')
      .add({
        category: category,
        categoryId: db.collection('Category').doc().id,
      })
      .then(Alert.alert('Thông báo', 'Thể loại được thêm thành công'));
    setCategory(null);
  };

  const handleSave = async () => {
    const uid = auth().currentUser.uid;
    const today = new Date();
  const date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = time + ' ' + date;
    await db
      .collection('Statistical')
      .add({
        inputMoney: parseInt( importMoney, 10),
        idStore: uid,
        dateTime: dateTime,
        date: date,
        time: time,
        id: db.collection('Statistical').doc().id,
      })
      .then(Alert.alert('Thông báo', 'Lưu dữ liệu thành công'));
    setImportMoney(null);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
      }}>
      <View>
        <FormInput
          labelText="Thể loại"
          placeholderText="Thể loại sách"
          onChangeText={value => setCategory(value)}
          value={category}
        />

        <FormButton
          labelText="Thêm thể loại"
          handleOnPress={handleSubmit}
          style={{width: '100%'}}
        />
      </View>

      <View style={{marginTop: 20}}>
        <FormInput
          labelText="Tiền nhập"
          placeholderText="Tiền nhập sách"
          onChangeText={value => setImportMoney(value)}
          value={importMoney}
          keyboardType={'numeric'}
        />

        <FormButton
          labelText="Lưu dữ liệu"
          handleOnPress={handleSave}
          style={{width: '100%'}}
        />
      </View>
    </SafeAreaView>
  );
}
