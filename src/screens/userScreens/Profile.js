import {View, Text} from 'react-native';
import React from 'react';
import {useState} from 'react';
import db from '../../firebase/firebase';
import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import FormButton from '../../components/FormButton';
import {Modal} from 'react-native';
import FormInput from '../../components/FormInput';
import {COLORS, FONTS} from '../../../assets';
import {Alert} from 'react-native';
import LineDivider from '../../components/LineDivider';

export default function Profile() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [info, setInfo] = useState([]);

  const handleSubmit = () => {
    const uid = auth().currentUser.uid;
    const a = info.map(item => {
      return item.key;
    });
    const doc = a[0];
    const b = info.map(item => {
      return item.email;
    });
    const mail = b[0];
    console.log(doc);
    db.collection('User')
      .doc(doc)
      .update({
        idUser: uid,
        name: name,
        phone: phone,
        address: address,
        role: 'user',
        email: mail,
      })
      .then(
        Alert.alert('Thông báo', 'Bạn đã thay đổi thông tin thành công', [
          {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
        ]),
      );
    setIsModalVisible(!isModalVisible);
  };

  const handleUpdate = () => {
    setIsModalVisible(!isModalVisible);
    console.log(info);
  };

  const getInfo = async () => {
    await db
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
  };

  useEffect(() => {
    getInfo();
  });

  return (
    <View style={{margin: 10, flex: 1}}>
      <View>
        <View>
          {info.map(item => {
            return (
              <View key={item.key}>
                <Text style={{margin: 20, ...FONTS.body2}}>
                  Tên người dùng: {item.name}
                </Text>
                <LineDivider/>
                {/* <Text style={{margin: 20, ...FONTS.body2}}>
                  Email: {item.email}
                </Text> */}
                <Text style={{margin: 20, ...FONTS.body2}}>
                  Địa chỉ: {item.address}
                </Text>
                <LineDivider/>
                <Text style={{margin: 20, ...FONTS.body2}}>
                  Số điện thoại: {item.phone}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      <View>
        <FormButton
          labelText="Thay đổi"
          handleOnPress={handleUpdate}
          style={{width: '50%', margin: 20}}
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
              width: '85%',
              backgroundColor: COLORS.white,
              padding: 10,
              borderRadius: 20,
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <FormInput
              labelText="Tên"
              placeholderText="Nhập tên"
              onChangeText={value => setName(value)}
              value={name}
            />
            <FormInput
              labelText="Số điện thoại"
              placeholderText="Nhập số diện thoại"
              onChangeText={value => setPhone(value)}
              value={phone}
              keyboardType={'numeric'}
            />

            <FormInput
              labelText="Địa chỉ"
              placeholderText="Nhập địa chỉ"
              onChangeText={value => setAddress(value)}
              value={address}
            />

            <FormButton
              labelText="Cập nhật"
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
