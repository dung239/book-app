import {View, Text} from 'react-native';
import React, { useContext } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Invoice from '../screens/Invoice';
import Search from '../screens/Statistical';
import Setting from '../screens/Setting';
import MainNavigator from './MainNavigator';
import AddBook from '../screens/AddBook';
import {useStore} from '../store/useStore';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import InfoStore from '../screens/InfoStore';
import InvoiceDetail from '../screens/InvoiceDetail';


const Stack = createNativeStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const AuthNavigator = () => {
  const store = useStore();
  const {user} = store;
  // const {user} = useStore()
  return (
    // <NavigationContainer
    //   theme={theme}
    //   tabBarOptions={{
    //     animationEnabled: true,
    //   }}>
      <Stack.Navigator
        screenOptions={{
          headerShow: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
        // initialRouteName={user ? 'MainNavigator' : 'Login'}
        >
        {/* <Stack.Screen name="MainNavigator" component={MainNavigator} options={{headerShown: false}}/> */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen name="Home" component={Home} /> */}
        {/* <Stack.Screen name="Invoice" component={Invoice} /> */}
        {/* <Stack.Screen name="Search" component={Search} /> */}
        {/* <Stack.Screen name="Setting" component={Setting} /> */}
        {/* <Stack.Screen name="Thông tin cửa hàng" component={InfoStore} options={{headerShown: true}}/> */}
        {/* <Stack.Screen name="Thêm sách" component={AddBook} options={{headerShown: true}}/> */}
        {/* <Stack.Screen name='Invoice Detail' component={InvoiceDetail}/> */}
      </Stack.Navigator>
    // </NavigationContainer>
  );
};
export default AuthNavigator;
