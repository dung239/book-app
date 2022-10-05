import {View, Text} from 'react-native';
import React, { useContext } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screens/Register';
import Login from '../screens/Login';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';


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
  // const store = useStore();
  // const {user} = store;
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
        
      </Stack.Navigator>

  );
};
export default AuthNavigator;
