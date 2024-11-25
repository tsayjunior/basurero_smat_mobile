import React,  { useEffect, useState } from 'react'
import axios from 'axios';
import { URL_GET_TRANSACTIONS } from '../../utils/Config'
import { FlatList, StyleSheet, Text, View, Dimensions, RefreshControl  } from 'react-native';
import { Card, Title, Paragraph, IconButton, Dialog, Button } from 'react-native-paper';

const { width } = Dimensions.get('window'); // Para hacer la UI más responsiva
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken, getToken, storeToken } from '../../storage/dataStorage';
import { setToken } from '../../redux/slices/tokenSlice';
import { logout } from '../../redux/slices/authSlice';
import Header from '../../components/Header';

const data = [
  {
    id: '1',
    basurero: 'Basurero 1',
    basura: 'Botella de plástico',
    tipo: 'Reciclable',
    puntos: 10,
  },
  {
    id: '2',
    basurero: 'Basurero 2',
    basura: 'Restos de comida',
    tipo: 'Orgánico',
    puntos: 5,
  },
  {
    id: '3',
    basurero: 'Basurero 3',
    basura: 'Lata de aluminio',
    tipo: 'Reciclable',
    puntos: 15,
  },
  {
    id: '11',
    basurero: 'Basurero 1',
    basura: 'Botella de plástico',
    tipo: 'Reciclable',
    puntos: 10,
  },
  {
    id: '22',
    basurero: 'Basurero 2',
    basura: 'Restos de comida',
    tipo: 'Orgánico',
    puntos: 5,
  },
  {
    id: '33',
    basurero: 'Basurero 3',
    basura: 'Lata de aluminio',
    tipo: 'Reciclable',
    puntos: 15,
  },
  // Agrega más objetos de ejemplo aquí...
];
const Init = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [token, setearToken] = useState(useSelector((state) => state.token.token))
  const [data_transaction, setData_transaction] = useState([])

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const showAlert = () => {
    setVisible(true);
  };

  const hideAlert = () => {
    setVisible(false);
  };
  const onRefresh = () => {
    // Aquí puedes hacer la lógica para recargar los datos.
    setRefreshing(true);

    // Simulando una carga de datos (como si vinieran de una API)
    // setTimeout(() => {
    //   setRefreshing(false);
    //   console.log('Datos recargados');
    // }, 2000);
    
    getTransactions()
  };
  
  useEffect(() => {
    getTransactions()

  }, [])

  const logout_session = () =>{

    deleteToken();
    
    dispatch(setToken(token));
    dispatch(logout());
  }
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title style={styles.basureroTitle}>{item.container.name}</Title>
          <IconButton
            icon="trash-can"
            color="#f44336"
            size={24}
            onPress={() => console.log('Acción de basura')}
          />
        </View>

        <Paragraph style={styles.itemText}>
          <Text style={styles.bold}>Ubicacion:</Text> {item.container.location}
        </Paragraph>
        <Paragraph style={styles.itemText}>
          <Text style={styles.bold}>Basura:</Text> {item.waste_type.name}
        </Paragraph>
        <Paragraph style={styles.itemText}>
          <Text style={styles.bold}>Fecha:</Text> {item.date}
        </Paragraph>
        <Paragraph style={styles.itemText}>
          <Text style={styles.bold}>Puntos Ganados:</Text> {item.waste_type.bonus_points}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  const getTransactions = () => {
    console.log('ingresa a getTransactions ');
    axios.get(URL_GET_TRANSACTIONS, {
      headers: {
          Authorization: `Bearer ${token}` // Pasar el token Bearer aquí
      }
    })
        .then(({data}) => {
            setRefreshing(false);
            console.log(data);
            setData_transaction(data);
        })
        .catch(error => {
            setRefreshing(false);
            console.log(error.response.data.code);
            if(error.response.data.code == 'token_not_valid'){
              showAlert();
            }
        });
}

  return (
    <View style={styles.container}>
      <Header title="Transacciones"></Header>
      <FlatList
        data={data_transaction}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#00796b']}
            tintColor="#00796b"
            title="Recargando..."
            titleColor="#00796b"
          />
        }
      />

      {/* Dialog de confirmación */}
      <Dialog visible={visible} onDismiss={hideAlert}>
        <Dialog.Title>Advertencia</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Token expirado, vuelva a iniciar sesion</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          {/* <Button onPress={hideAlert}>Cancelar</Button> */}
          <Button onPress={logout_session}>Aceptar</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#e0f7fa', // Un fondo suave
  },
  list: {
    margin: 15,
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#ffffff', // Fondo blanco para las tarjetas
    borderLeftWidth: 5,
    borderColor: '#00796b', // Un borde de color verde para resaltar
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  basureroTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b', // Color verde oscuro
  },
  itemText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#00796b',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Init