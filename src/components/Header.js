import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';

const Header = ({ title }) => {
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
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff', // Fondo blanco minimalista
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1, // Línea sutil en la parte inferior
    borderBottomColor: '#e0e0e0', // Color neutro para la línea
  },
  headerTitle: {
    fontSize: 20,
    color: '#333', // Texto gris oscuro
    fontFamily: 'Poppins_700Bold', // Fuente personalizada
    letterSpacing: 1, // Espaciado entre letras
  },
});

export default Header;
