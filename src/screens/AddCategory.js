import {View, Text, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { async } from '@firebase/util';
import db from '../firebase/firebase';
import auth from '@react-native-firebase/auth'
import { COLORS } from '../../assets';

export default function AddCategory() {
  const [category, setCategory] = useState('');

  const handleSubmit = async () => {
    await db.collection('Category').add({
        category: category,
        categoryId: db.collection('Category').doc().id,
        idStore: auth().currentUser.uid
    }).then(Alert.alert('Thông báo', 'Thể loại được thêm thành công'));
    setCategory(null)
  }

  return (
    <SafeAreaView style={{
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
    </SafeAreaView>
  );
}
