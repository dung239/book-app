import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../assets/theme';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import firestore from '@react-native-firebase/firestore';
import db from '../firebase/firebase';
import {useNavigation} from '@react-navigation/native';
import {register} from '../firebase/api';
import Login from './Login';
import auth from '@react-native-firebase/auth'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [namestore, setNamestore] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleOnSubmit = async () => {
    setLoading(true);
    if (!email || !password || !name || !phone || !namestore) {
      Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin.', [
        {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      await register(email, password, name, phone, namestore);
      // if (resgisterRes == 'true') {
      //   // () => {
      //   //   db.collection('User').doc(auth().currentUser.uid).add({
      //   //     email: email,
      //   //     name: name,
      //   //     phone: phone,
      //   //     namestore: namestore,
      //   //   });
      //   // };
      //   Alert.alert('Đăng ký thành công', 'Vui lòng trở lại trang đăng nhập.', [
      //     {text: 'Đồng ý', onPress: () => navigation.navigate('Login')},
      //   ]);
      // } else {
      //   Alert.alert('Đăng ký thất bại', 'Email đã tồn tại.', [
      //     {text: 'Đồng ý', onPress: () => console.log('error')},
      //   ]);
      // }
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
      }}>
      <ScrollView>
        {/* Header */}
        <Text
          style={{
            fontSize: 24,
            color: COLORS.black,
            fontWeight: 'bold',
            marginVertical: 16,
          }}>
          Đăng ký
        </Text>

        <FormInput
          labelText="Tên"
          placeholderText="Nhập tên"
          onChangeText={value => setName(value)}
          value={name}
        />

        <FormInput
          labelText="Số điện thoại"
          placeholderText="Nhập số điện thoại"
          onChangeText={value => setPhone(value)}
          value={phone}
          keyboardType={'numeric'}
        />

        <FormInput
          labelText="Tên cửa hàng"
          placeholderText="NHập tên cửa hàng"
          onChangeText={value => setNamestore(value)}
          value={namestore}
        />

        {/* Email */}
        <FormInput
          labelText="Email"
          placeholderText="Nhập email"
          onChangeText={value => setEmail(value)}
          value={email}
          keyboardType={'email-address'}
        />

        {/* Password */}
        <FormInput
          labelText="Mật khẩu"
          placeholderText="Nhập mật khẩu"
          onChangeText={value => setPassword(value)}
          value={password}
          secureTextEntry={true}
        />

        {/* Submit button */}
        <FormButton
          labelText="Đăng ký"
          handleOnPress={handleOnSubmit}
          style={{width: '100%'}}
        />

        {/* Footer */}
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Text>Bạn đã có tài khoản?</Text>
          <Text
            style={{marginLeft: 4, color: COLORS.primary}}
            onPress={() => navigation.navigate('Login')}>
            Đăng nhập
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
