import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../firebase/api';
import Login from './Login';
import { useNavigation } from '@react-navigation/native';

const LineDivider = () => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: SIZES.padding,
        paddingVertical: 8,
      }}>
      <View
        style={{
          flex: 1,
          borderBottomColor: COLORS.lightGray3,
          borderBottomWidth: 1,
        }}></View>
    </View>
  );
};
export default function Setting() {
  const navigation = useNavigation()
  return (
    <View style={{flex: 1, marginTop: 20}}>
      <View
        style={{
          padding: SIZES.padding2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            // ...FONTS.h2,
            color: COLORS.black,
            alignItems: 'center',
            fontWeight: 'bold',
          }}>
          CỬA HÀNG SÁCH
        </Text>
      </View>
      <LineDivider />
      <TouchableOpacity
        style={{
          paddingLeft: SIZES.padding,
          paddingBottom: SIZES.radius,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate("Thêm sách")}
      >
        {/* <Image
                    source={icons.bookmark_icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30
                    }}
                /> */}
        <Text
          style={{
            // ...FONTS.body2,
            color: COLORS.black,
            marginLeft: SIZES.radius,
          }}>
          Thêm sách 
        </Text>
      </TouchableOpacity>
      <LineDivider />
      <TouchableOpacity
        style={{
          paddingLeft: SIZES.padding,
          paddingBottom: SIZES.radius,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate("Thêm thể loại")}
      >
        {/* <Image
                    source={icons.bookmark_icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30
                    }}
                /> */}
        <Text
          style={{
            // ...FONTS.body2,
            color: COLORS.black,
            marginLeft: SIZES.radius,
          }}>
          Thêm thể loại 
        </Text>
      </TouchableOpacity>
      <LineDivider />

      <TouchableOpacity
        style={{
          paddingLeft: SIZES.padding,
          paddingBottom: SIZES.radius,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Thông tin cửa hàng')}>
        {/* <Image
                    source={require('../../../assets/icons/info_icon.png')}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30
                    }}
                /> */}
        <Text
          style={{
            // ...FONTS.body2,
            color: COLORS.black,
            marginLeft: SIZES.radius,
          }}>
          Thông tin về cửa hàng
        </Text>
      </TouchableOpacity>
      <LineDivider />
      <TouchableOpacity
        style={{
          paddingLeft: SIZES.padding,
          paddingBottom: SIZES.radius,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* <Image
                    source={icons.privacy_icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30
                    }}
                /> */}
        <Text
          style={{
            // ...FONTS.body2,
            color: COLORS.black,
            marginLeft: SIZES.radius,
          }}>
          Chính sách và bảo mật
        </Text>
      </TouchableOpacity>
      <LineDivider />
      <TouchableOpacity
        style={{
          paddingLeft: SIZES.padding,
          paddingBottom: SIZES.radius,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          logout();
          // navigation.goBack('Login');
        }}>
        {/* <Image
                    source={icons.logout_icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30
                    }}
                /> */}
        <Text
          style={{
            // ...FONTS.body2,
            color: COLORS.black,
            marginLeft: SIZES.radius,
          }}>
          Đăng xuất
        </Text>
      </TouchableOpacity>

      <LineDivider />
    </View>
  );
}
