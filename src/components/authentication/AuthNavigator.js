import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Init from '../../screens/init/Init'; // Pantalla inicial
import Login from '../../screens/login/login'; // Pantalla de login

const AuthNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
useEffect(() => {
  console.log(' authnavigator => está autenticado => ', isAuthenticated);
},)

  return (
    <View style={{ flex: 1 }}>
      {isAuthenticated? <Init /> : <Login />}
    </View>
  );
};

export default AuthNavigator;
