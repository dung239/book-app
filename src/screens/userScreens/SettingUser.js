import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../firebase/api';
import Login from '../Login';
import { useNavigation } from '@react-navigation/native';
import LineDivider from '../../components/LineDivider';

export default function SettingUser() {
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
            ...FONTS.h2,
            color: COLORS.black,
            alignItems: 'center',
            fontWeight: 'bold',
          }}>
          TÀI KHOẢN
        </Text>
      </View>
      <LineDivider />
      {/* <TouchableOpacity
        style={{
          paddingLeft: SIZES.padding,
          paddingBottom: SIZES.radius,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate("Thêm sách")}
      > */}
        {/* <Image
                    source={icons.bookmark_icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30
                    }}
                /> */}
        {/* <Text
          style={{
            ...FONTS.body2,
            color: COLORS.black,
            marginLeft: SIZES.radius,
          }}>
          Thêm sách 
        </Text>
      </TouchableOpacity>
      <LineDivider /> */}
      <TouchableOpacity
        style={{
          paddingLeft: SIZES.padding,
          paddingBottom: SIZES.radius,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate("Theo dõi đơn")}
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
            ...FONTS.body2,
            color: COLORS.black,
            marginLeft: SIZES.radius,
          }}>
          Theo dõi đơn hàng 
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
        onPress={() => navigation.navigate('Thông tin cá nhân')}>
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
            ...FONTS.body2,
            color: COLORS.black,
            marginLeft: SIZES.radius,
          }}>
          Thông tin cá nhân
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
                    source={icons.privacy_icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30
                    }}
                /> */}
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.black,
            marginLeft: SIZES.radius,
          }}>
          Thông tin cửa hàng
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
          // navigation.navigate('Login');
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
            ...FONTS.body2,
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
