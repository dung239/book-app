import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingUser from '../../screens/userScreens/SettingUser';
import OrderTracking from '../../screens/userScreens/OrderTracking';
import Profile from '../../screens/userScreens/Profile';
import InvoiceProfile from '../../screens/userScreens/InvoiceProfile';
import StoreInfo from '../../screens/userScreens/StoreInfo';


const StackSetting = createNativeStackNavigator();

const SettingUserNavigation = () => {
  return (
    <StackSetting.Navigator
      initialRouteName="SettingNavigator"
      screenOptions={{headerShown: true}}
      >
      <StackSetting.Screen name="Setting" component={SettingUser} options={{headerShown: false}}/>
      <StackSetting.Screen name='Theo dõi đơn' component={OrderTracking} />
      <StackSetting.Screen name='Thông tin đơn' component={InvoiceProfile} />
      <StackSetting.Screen name='Thông tin cá nhân' component={Profile} />
      <StackSetting.Screen name='Thông tin cửa hàng' component={StoreInfo} />


    </StackSetting.Navigator>
  );
};
export default SettingUserNavigation;
