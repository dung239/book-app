import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS} from '../../../assets';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import auth from '@react-native-firebase/auth';
import db from '../../firebase/firebase';
import LineDivider from '../../components/LineDivider';

export default function InfoStore(props) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [info, setInfo] = useState([]);

  const handleSubmit = () => {
    const a = info.map(item => {
      return item.key;
    });
    const doc = a[0];
    const b = info.map(item => {
      return item.email;
    });
    const email = b[0];
    const uid = auth().currentUser.uid;

    db.collection('User').doc(doc).update({
      name: name,
      phone: phone,
      address: address,
      role: "admin",
      email: email,
      idUser: uid
    });
    setIsModalVisible(!isModalVisible);
  };

  const handleUpdate = () => {
    const a = info.map(item => {
      return item.name;
    });
    const name1 = a[0];
    const b = info.map(item => {
      return item.phone;
    });
    const phone1 = b[0];
    const c = info.map(item => {
      return item.address;
    });
    const address1 = c[0];
    setIsModalVisible(!isModalVisible);
    setAddress(address1);
    setPhone(phone1)
    setName(name1)
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
                  T??n c???a h??ng: {item.name}
                </Text>
                <LineDivider/>
                {/* <Text style={{margin: 20, ...FONTS.body2}}>
                  Email: {item.email}
                </Text> */}
                <Text style={{margin: 20, ...FONTS.body2}}>
                  ?????a ch???: {item.address}
                </Text>
                <LineDivider/>
                <Text style={{margin: 20, ...FONTS.body2}}>
                  S??? ??i???n tho???i: {item.phone}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      <View>
        <FormButton
          labelText="C???p nh???t"
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
              margin: 40,
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
              onChangeText={value => setName(value)}
              value={name}
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
