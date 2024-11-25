import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/login/Login';
import RegisterUser from '../../screens/register/RegisterUser';
import Init from '../../screens/init/Init';
import ButtonTab from './ButtonTab';

const Stack = createNativeStackNavigator();
const myConfig = {
  // title: 'Feed',
  headerShown: false, //hago que el encabezado no se muestre
  headerTitleAlign: 'center',//especifica la alineacion del titulo del encabezado
  presentation: 'modal',//especifica que se presentara como modal
  animationEnabled: true,
  gestureEnabled: true, //El valor predeterminado es verdadero en iOS, falso en Android.
  animationTypeForReplace: 'push', //El tipo de animación que se usará cuando esta pantalla reemplace a otra pantalla
  keyboardHandlingEnabled: true, //el teclado NO se descartará automáticamente al navegar a una nueva pantalla desde esta pantalla. El valor predeterminado es verdadero.
  //custom header
  /*  header: ({ navigation, route, options, back }) => (
    <CustomHeader title={route.name} />
  ), */
  // cardStyle: { backgroundColor: 'red' },
};
const InitStack = () => {
  useEffect(() => {
    // setearToken(getToken());
    // if(token != null){
    //   authenticate();
    //   console.log(' InitStack token existe => ', token);
    // }
  },)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root"  screenOptions={myConfig}>
        <Stack.Screen name="Root" component={ButtonTab} />
        <Stack.Screen name="Init" component={Init} options={{headerShown: false }} />
        {/* <Stack.Screen name="RegisterUser" component={RegisterUser} options={{headerShown: false }}  /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default InitStack;
