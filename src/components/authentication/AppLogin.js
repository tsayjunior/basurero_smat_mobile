import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/login/Login';
import RegisterUser from '../../screens/register/RegisterUser';

const Stack = createNativeStackNavigator();

const AppLogin = () => {
  useEffect(() => {
    // setearToken(getToken());
    // if(token != null){
    //   authenticate();
    //   console.log(' AppLogin token existe => ', token);
    // }
  },)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} options={{headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppLogin;
