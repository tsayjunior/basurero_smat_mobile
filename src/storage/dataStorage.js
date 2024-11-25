// import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

const USUARIO_KEY = '@usuario:key'

 const storeToken = async (token) => {
    try {
        console.log('-----------------------------------', token);
      await AsyncStorage.setItem('@token', token);
      console.log('Token almacenado');
    } catch (error) {
      console.error('Error almacenando el token:', error);
    }
  };
  
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (token !== null) {
        console.log('Token recuperado:', token);
        return token; // Retorna el token si existe
      } else {
        console.log('No hay token almacenado');
        return null;
      }
    } catch (error) {
      console.error('Error recuperando el token:', error);
      return null;
    }
  };

  const deleteToken = async () => {
    try {
      // Eliminar el token de AsyncStorage
      await AsyncStorage.removeItem('@token');
      console.log('Token eliminado');
  
      // Aquí puedes realizar una acción adicional, como redirigir a la pantalla de inicio de sesión
      // Por ejemplo, si usas React Navigation:
      // navigation.replace('Login'); 
  
    } catch (error) {
      console.error('Error al eliminar el token:', error);
    }
  };
  
  export { storeToken, getToken, deleteToken };