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
import auth from '@react-native-firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [checkValidPassword, setCheckValidPassword] = useState(false);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [checkValidPhone, setCheckValidPhone] = useState(false);

  const handleOnSubmit = () => {
    setLoading(true);
    if (!email || !password || !name || !phone) {
      Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin.', [
        {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (
      checkValidEmail == true ||
      checkValidPassword == true ||
      checkValidPhone == true
    ) {
      Alert.alert('Cảnh báo', 'Vui lòng nhập đúng yêu cầu.', [
        {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      register(email, password, name, phone);
      // if (resgisterRes == 'true') {
      //   // () => {
      //   //   db.collection('User').doc(auth().currentUser.uid).add({
      //   //     email: email,
      //   //     name: name,
      //   //     phone: phone,
      //   //     namestore: namestore,
      //   //   });
      //   // };
      // Alert.alert('Đăng ký thành công', 'Vui lòng trở lại trang đăng nhập.', [
      //   {text: 'Đồng ý', onPress: () => navigation.navigate('Login')},
      // ]);
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

  const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const checkPasswordValidity = value => {
    let isValidLength = /^.{6,}$/;
    setPassword(value);
    if (isValidLength.test(value)) {
      setCheckValidPassword(false);
    } else {
      setCheckValidPassword(true);
    }
  };

  const checkPhoneValidity = value => {
    let isValidLength = /^.{10}$/;
    setPhone(value);
    if (isValidLength.test(value)) {
      setCheckValidPhone(false);
    } else {
      setCheckValidPhone(true);
    }
  };

  return (
    <SafeAreaView
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
        <Text></Text>

        <FormInput
          labelText="Số điện thoại"
          placeholderText="Nhập số điện thoại"
          onChangeText={value => checkPhoneValidity(value)}
          value={phone}
          keyboardType={'numeric'}
        />
        {checkValidPhone ? (
          <Text style={{alignSelf: 'flex-start', color: 'red'}}>
            Số điện thoại gồm 10 số
          </Text>
        ) : (
          <Text style={{alignSelf: 'flex-start', color: 'red'}}> </Text>
        )}

        {/* Email */}
        <FormInput
          labelText="Email"
          placeholderText="Nhập email"
          onChangeText={value => handleCheckEmail(value)}
          value={email}
          keyboardType={'email-address'}
        />
        {checkValidEmail ? (
          <Text style={{alignSelf: 'flex-start', color: 'red'}}>
            Định dạng sai
          </Text>
        ) : (
          <Text style={{alignSelf: 'flex-start', color: 'red'}}> </Text>
        )}

        {/* Password */}
        <FormInput
          labelText="Mật khẩu"
          placeholderText="Nhập mật khẩu"
          onChangeText={value => checkPasswordValidity(value)}
          value={password}
          secureTextEntry={true}
        />
        {checkValidPassword ? (
          <Text style={{alignSelf: 'flex-start', color: 'red'}}>
            Mật khẩu ít nhất 6 ký tự
          </Text>
        ) : (
          <Text style={{alignSelf: 'flex-start', color: 'red'}}> </Text>
        )}

        {/* Submit button */}
        <FormButton
          labelText="Đăng ký và đăng nhập"
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
    </SafeAreaView>
  );
};

export default Register;
