import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS} from '../../assets';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import auth from '@react-native-firebase/auth';
import db from '../firebase/firebase';

export default function InfoStore(props) {
  const [phone, setPhone] = useState('');
  const [namestore, setNamestore] = useState('');
  const [address, setAddress] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [info, setInfo] = useState([]);

  const handleSubmit = () => {
    const uid = auth().currentUser.uid;
    db.collection('User').doc(uid).update({
      idstore: uid,
      namestore: namestore,
      phone: phone,
      address: address,
    });
    setIsModalVisible(!isModalVisible);
  };

  const handleUpdate = () => {
    setIsModalVisible(!isModalVisible);
    console.log(info);
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

  useEffect(() => {
    getInfo();
  });

  return (
    <View style={{margin: 20, flex: 1, alignItems: 'center'}}>
      <View>
        <View>
          {info.map(item => {
            return (
              <View key={item.key}>
                <Text style={{margin: 20, ...FONTS.body2}}>Tên cửa hàng: {item.namestore}</Text>
                <Text style={{margin: 20, ...FONTS.body2}}>Địa chỉ: {item.address}</Text>
                <Text style={{margin: 20, ...FONTS.body2}}>Số điện thoại: {item.phone}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <View>
        <FormButton
          labelText="Cập nhật"
          handleOnPress={handleUpdate}
          style={{width: '50%'}}
        />
      </View>
      {/* <KeyboardAvoidingView
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
      }}> */}
      <View>
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}>
          <View
            style={{
              margin: 50,
              // marginBottom: 200,
              flex: 1,
              alignSelf: 'center',
              width: '80%',
              backgroundColor: COLORS.white,
              padding: 10,
              borderRadius: 20,
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <FormInput
              labelText="Phone"
              placeholderText="Enter your phone"
              onChangeText={value => setPhone(value)}
              value={phone}
              keyboardType={'numeric'}
            />

            <FormInput
              labelText="Store name"
              placeholderText="Enter your store name"
              onChangeText={value => setNamestore(value)}
              value={namestore}
            />

            <FormInput
              labelText="Address"
              placeholderText="Enter your store name"
              onChangeText={value => setAddress(value)}
              value={address}
            />

            <FormButton
              labelText="Submit"
              handleOnPress={handleSubmit}
              style={{width: '100%'}}
            />
          </View>
        </Modal>
      </View>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
}
