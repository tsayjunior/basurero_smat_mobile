import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Init from '../../screens/init/Init'; // Pantalla inicial
import AppLogin from '../../components/authentication/AppLogin'; // Pantalla de login

const AuthNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
useEffect(() => {
  console.log(' authnavigator => está autenticado => ', isAuthenticated);
},)

  return (
    <View style={{ flex: 1 }}>
      {isAuthenticated? <Init /> : <AppLogin />}
    </View>
  );
};

export default AuthNavigator;
