import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';

import Colors from '../utils/Colors'

const Header = () => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Oculta la pantalla de splash cuando las fuentes se cargan
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // No se muestra nada hasta que las fuentes estén listas
  }

  return (
    <View style={{height: 45, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30, fontWeight: 'bold', fontFamily: 'Poppins_700Bold'}}>Crear Nueva cuenta</Text>
    </View>
  )
}

export default Header