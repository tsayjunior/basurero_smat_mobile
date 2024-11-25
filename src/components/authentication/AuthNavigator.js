import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Init from '../../screens/init/Init'; // Pantalla inicial
import AppLogin from '../../components/authentication/AppLogin'; // Pantalla de login
import { getToken, storeToken } from '../../storage/dataStorage';
import { authenticate } from '../../redux/slices/authSlice';
import { setToken } from '../../redux/slices/tokenSlice';
import InitStack from './InitStack';
// import initStack from '../../components/authentication/initStack'; // Pantalla de login
// import { authenticate } from '../../redux/slices/authSlice';

const AuthNavigator = () => {
  const dispatch = useDispatch();
  const [token, setearToken] = useState(null)
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
useEffect(() => {
  const fetchToken = async () => {
    const storedToken = await getToken(); // Resolver la promesa
    setearToken(storedToken);
    console.log('Token en useEffect en AuthNavigator =>', storedToken);
    if(storedToken != null){
      dispatch(authenticate());
      dispatch(setToken(storedToken)); // Usa Redux para almacenar el token
    }
  };

  fetchToken();
  console.log(' authnavigator => está autenticado => ', isAuthenticated);
},)

  return (
    <View style={{ flex: 1 }}>
      {isAuthenticated? <InitStack /> : <AppLogin />}
    </View>
  );
};

export default AuthNavigator;
