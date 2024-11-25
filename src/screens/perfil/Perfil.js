import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import commonStyles from '../../styles/commonStyles'
import Header from '../../components/Header'
import { Avatar, SpeedDial  } from '@rneui/themed'
import { deleteToken } from '../../storage/dataStorage'
import { useDispatch } from 'react-redux'
import { tokenNull } from '../../redux/slices/tokenSlice'
import { logout } from '../../redux/slices/authSlice'


const Perfil = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const logout_ = ()=>{
    console.log(' ingresa a cerrar sesion');

    log_out();
  }

  const log_out = () => {
    
    deleteToken();
    dispatch(tokenNull());
    dispatch(logout());
  }
  return (
    <View style={commonStyles.container}>
      <Header title="Mis Datos"></Header>
      <View style={{margin: 10, alignItems: 'center', justifyContent: 'center'}}>
        <Avatar
          activeOpacity={0.7}
          avatarStyle={{ resizeMode: 'cover' }}
          containerStyle={styles.avatarContainer}
          onLongPress={() => Alert.alert('onLongPress')}
          rounded
          // onPress={() => alert("onPress")}
          size="xlarge"
          source={{ uri: 'https://avatar.iran.liara.run/public/boy' }}
        />
      </View>
      <View style={{backgroundColor: 'red', flex: 1}}>

      
      </View >
      
        
      <View style={{backgroundColor: 'blue', flex: 1}}>
        
      </View>
      
      <SpeedDial
          isOpen={open}
          icon={{ name: 'settings', color: '#fff' }}
          openIcon={{ name: 'close', color: '#fff' }}
          onOpen={() => setOpen(!open)}
          onClose={() => setOpen(!open)}
          containerStyle={styles.speedDial}
  
        >
          {/* <SpeedDial.Action
            icon={{ name: 'add', color: '#fff' }}
            title="Add"
            onPress={() => console.log('Add Something')}
            titleStyle={styles.titleStyle}
            containerStyle={styles.speedDialContainer} // Estilo adicional
          /> */}
          <SpeedDial.Action
            icon={{ name: 'delete', color: '#fff' }}
            title="Salir"
            onPress={logout_}
            titleStyle={styles.titleStyle}
            containerStyle={styles.speedDialContainer} // Estilo adicional
          />
        </SpeedDial>
    </View>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#fff',
  // },
  avatarContainer: {
    backgroundColor: 'transparent',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  speedDial: {
    position: 'absolute', // Coloca el SpeedDial flotante
    bottom: 70, // Separación del borde inferior
    right: 10, // Separación del borde derecho
  },
  speedDialAction: {
    marginVertical: 5, // Espacio entre acciones
  },
  speedDialContainer: {

    // position: 'absolute', // Permite que el SpeedDial esté flotante
    bottom: 120, // Separación del borde inferior
    right: 10, // Separación del borde derecho
    // bottom: 20, // Ajusta la posición al borde inferior
    // right: 20, // Ajusta la posición al borde derecho
  },
  titleStyle: {
    fontSize: 16,         // Tamaño del texto
    color: 'red',         // Color del texto
    fontWeight: 'bold',   // Peso del texto
    position: 'absolute', // Permite que el SpeedDial esté flotante
    bottom: 115, // Separación del borde inferior
    right: 50, // Separación del borde derecho
  }
});
export default Perfil
