import { View, Text, StyleSheet, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import commonStyles from '../../styles/commonStyles'
import Header from '../../components/Header'
import { Avatar, SpeedDial, Card  } from '@rneui/themed'
import { deleteToken } from '../../storage/dataStorage'
import { useDispatch } from 'react-redux'
import { tokenNull } from '../../redux/slices/tokenSlice'
import { logout } from '../../redux/slices/authSlice'
import { ScrollView } from 'react-native'
import { URL_USER } from '../../utils/Config'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { clearUser, setUser, updatePoints, updateUser } from '../../redux/slices/userSlice'


const Perfil = () => {
  const [open, setOpen] = React.useState(false);
  const [refreshing, setRefreshing] = useState(false); // Estado para RefreshControl
  const [data_transaction, setData_transaction] = useState([])
  const [token, setearToken] = useState(useSelector((state) => state.token.token))
  const dispatch = useDispatch();
  const { user_id, points } = useSelector((state) => state.user);

  const logout_ = ()=>{
    console.log(' ingresa a cerrar sesion');

    log_out();
  }

  const onRefresh = () => {
    setRefreshing(true);
    // Simula una acción de actualización
    getUser();
    // setTimeout(() => {
    //   console.log('Datos actualizados');
    //   setRefreshing(false); // Finaliza la animación de actualización
    // }, 2000);
  };
  
  const getUser = () => {
    console.log('ingresa a getTransactions ', points, user_id);
    axios.get(URL_USER, {
      headers: {
          Authorization: `Bearer ${token}` // Pasar el token Bearer aquí
      }
    })
        .then(({data}) => {
              // dispatch(setUser({ user_id: data[0].id, points: data.total_points }));
            dispatch(updatePoints(data.total_points));
            dispatch(updateUser(data.id));
            setData_transaction(data);
            setRefreshing(false);
            console.log('get users', data, points);
        })
        .catch(error => {
            setRefreshing(false);
            console.log('error getUser', error.response.data);
            
        });
  }
  const log_out = () => {
    
    deleteToken();
    dispatch(tokenNull());
    dispatch(logout());
    dispatch(clearUser());
  }
  return (
    <View style={commonStyles.container}>
      <Header title="Mis Datos"></Header>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ margin: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Avatar
            activeOpacity={0.7}
            avatarStyle={{ resizeMode: 'cover' }}
            containerStyle={styles.avatarContainer}
            onLongPress={() => Alert.alert('onLongPress')}
            rounded
            size="xlarge"
            source={{ uri: data_transaction.image_perfil? 'http://177.222.109.127/'+ data_transaction.image_perfil : 'https://avatar.iran.liara.run/public/boy' }}
          />
          <Text style={styles.nameText}>{data_transaction.username}</Text>
          <Text style={styles.emailText}>{data_transaction.email}</Text>
        </View>

        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.cardTitle}>Puntaje Total</Card.Title>
          <Card.Divider />
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>{points}</Text>
          </View>
        </Card>
        {/* <View style={{ backgroundColor: 'red', flex: 1 }} />
        <View style={{ backgroundColor: 'blue', flex: 1 }} /> */}
      </ScrollView>
      
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
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  emailText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  cardContainer: {
    width: '90%',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  pointsContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  pointsText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
});
export default Perfil
