import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import MainAdminNavigator from './src/navigation/MainAdminNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {StoreContext, useStore} from './src/store/useStore';
import InfoStore from './src/screens/adminScreens/InfoStore';
import AddBook from './src/screens/adminScreens/AddBook';
import Login from './src/screens/Login';
import MainUserNavigator from './src/navigation/usernavigation/MainUserNavigator';
import db from './src/firebase/firebase';
import ItemBook from './src/components/ItemBook';
import firebase from '@react-native-firebase/auth';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['EventEmitter.removeListener']);
LogBox.ignoreLogs(['Require cycle:']);
LogBox.ignoreLogs(['Warning:']);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const onAuthStateChanged = async user => {
    setUser(user);
    console.log(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (!user) {
    return (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    );
  } else if (user.uid == 'NEcVfoPRqTcqwuQAtfloEKK3dnh1') {
    return (
      <NavigationContainer>
        <MainAdminNavigator />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <MainUserNavigator />
      </NavigationContainer>
    );
  }
};
export default App;

