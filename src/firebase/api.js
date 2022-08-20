import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import db from './firebase';

export const login = async (email, password) => {
  try {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(currentUser => {
        const user = currentUser.user;
        console.log(user.uid);
      });
  } catch (e) {
    Alert.alert('Cảnh báo', 'Sai tài khoản hoặc mật khẩu.', [
      {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
    ]);
  }
};

export const register = async (email, password, name, phone, namestore) => {
  try {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection('User').add({
          email: email,
          name: name,
          phone: phone,
          namestore: namestore,
          idStore: auth().currentUser.uid
        });
      });
    Alert.alert('Đăng ký thành công', 'Vui lòng trở lại trang đăng nhập.', [
      {text: 'Đồng ý', onPress: () => navigation.navigate('Login')},
    ]);
    console.log('Đăng ký với', user.email);
  } catch (e) {
    Alert.alert('Đăng ký thất bại', '', [
      {text: 'Đồng ý', onPress: () => console.log('error')},
    ]);
    console.log(e);
  }
};

export const logout = async () => {
  try {
    await auth()
      .signOut()
      .then(() => console.log('sign out'));
  } catch (e) {
    console.error(e);
  }
};
