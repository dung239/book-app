import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import db from './firebase';

// chức năng login 
export const login = async (email, password) => {
  try {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(currentUser => {
        const user = currentUser.user;
        console.log(user.uid);
      })
  } catch (e) {
    Alert.alert('Cảnh báo', 'Sai tài khoản hoặc mật khẩu.', [
      {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
    ]);
  }
};

export const register = async (email, password, name, phone) => {
  try {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection('User').add({
          email: email,
          name: name,
          phone: phone,
          idUser: auth().currentUser.uid,
          role: 'user',
        });
      });
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
