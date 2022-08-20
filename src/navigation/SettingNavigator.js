import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AddBook from '../screens/AddBook';
import Setting from '../screens/Setting';
import InfoStore from '../screens/InfoStore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InvoiceDetail from '../screens/InvoiceDetail';
import AddCategory from '../screens/AddCategory';


const StackSetting = createNativeStackNavigator();

const SettingNavigator = () => {
  return (
    <StackSetting.Navigator
      initialRouteName="SettingNavigator"
      screenOptions={{headerShown: true}}
      >
      <StackSetting.Screen name="Setting" component={Setting} options={{headerShown: false}}/>
      <StackSetting.Screen name="Thông tin cửa hàng" component={InfoStore} />
      <StackSetting.Screen name="Thêm sách" component={AddBook} />
      <StackSetting.Screen name="Thêm thể loại" component={AddCategory} />
    </StackSetting.Navigator>
  );
};
export default SettingNavigator;
