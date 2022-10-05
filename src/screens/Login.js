import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS} from '../../assets/theme';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import db from '../firebase/firebase';
import {useStore} from '../store/useStore';
import {useNavigation} from '@react-navigation/native';
import MainAdminNavigator from '../navigation/MainAdminNavigator';
import auth from '@react-native-firebase/auth';
import {login, StoreContext} from '../firebase/api';
import { images } from '../../assets';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();



  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.navigate('MainAdminNavigator');
  //     }
  //   });
  //   return unsubscribe;
  // },[]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin.', [
        {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
     await login(email, password);
      setLoading(false);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Image source={images.booklogin} style={{alignSelf: 'center', width: 180, height: 180}}></Image>
        <Text
          style={{
            fontSize: 24,
            color: COLORS.black,
            fontWeight: 'bold',
            marginVertical: 32,
            alignSelf: 'center'
          }}>
          Đăng nhập
        </Text>

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
          labelText="Đăng nhập"
          handleOnPress={handleSubmit}
          style={{width: '100%'}}
        />

        {/* Footer */}
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Text>Bạn chưa có tài khoản?</Text>
          <Text
            style={{marginLeft: 4, color: COLORS.primary}}
            onPress={() => navigation.navigate('Register')}>
            Tạo tài khoản
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
   
  );
}
