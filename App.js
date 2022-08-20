import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import {ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import { StoreContext, useStore } from './src/store/useStore';
import InfoStore from './src/screens/InfoStore';
import AddBook from './src/screens/AddBook';
import Login from './src/screens/Login';

const App = () => {  
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState()
  
  function onAuthStateChanged(user)  {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.navigate('MainNavigator');
  //     }
  //   });
  //   return unsubscribe;
  // },[]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);


  if (loading) return <ActivityIndicator size="large" animating />;
  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
      {/* <Login></Login> */}
    </NavigationContainer>
    // <StoreContext.Provider value={user}>
    //   <AuthNavigator/>
    // </StoreContext.Provider>
  );
  // return(
  //   <AddBook/>
  //   // <InfoStore/>
  // )
};
export default App;
