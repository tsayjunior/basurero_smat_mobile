import React,  { useEffect, useState } from 'react'
import axios from 'axios';
import { URL_REWARDS, URL_REWARDS_CLAIMS } from '../../utils/Config'
import { FlatList, StyleSheet, Text, View, Dimensions, RefreshControl, Image, ActivityIndicator  } from 'react-native';
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
const Rewards = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [forReclaim, setForReclaim] = useState(null);
  const [reclaimReward, setReclaimReward] = useState(false);
  const [reclaimGood, setReclaimGood] = useState(false);
  const [notReclaimReward, setNotReclaimReward] = useState(false);
  const [token, setearToken] = useState(useSelector((state) => state.token.token))
  const [data_transaction, setData_transaction] = useState([])
  const { user_id, points } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false); // El estado de carga

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const showAlert = () => {
    setVisible(true);
  };

  const hideAlert = () => {
    setVisible(false);
  };
  
  const showReclaimReward = () => {
    setReclaimReward(true);
  };

  const hideReclaimReward = () => {
    setReclaimReward(false);
  };
  
  const showNotReclaimReward = () => {
    setNotReclaimReward(true);
  };

  const hideNotReclaimReward = () => {
    setNotReclaimReward(false);
  };
  
  const showReclaimGood = () => {
    setReclaimGood(true);
  };

  const hideReclaimGood = () => {
    setReclaimGood(false);
  };
  const onRefresh = () => {
    // Aquí puedes hacer la lógica para recargar los datos.
    setRefreshing(true);

    // Simulando una carga de datos (como si vinieran de una API)
    // setTimeout(() => {
    //   setRefreshing(false);
    //   console.log('Datos recargados');
    // }, 2000);
    
    getRewards()
  };
  
  useEffect(() => {
    getRewards()

  }, [])
  const reclaim_reward = (item) => {
    console.log(`Reclamando premio: ${item.name}`, item)
    if(points >= item.points_required){
      console.log('puede reclamar su premio');
      setForReclaim(item);
      showReclaimReward();
    }else{
      console.log(' no puede reclamar su premio');
      showNotReclaimReward();
    }
  }
  const getReclaimReward = () => {
    console.log(' hace el reclamo de la recompensa', forReclaim.id, user_id, points);
    setIsLoading(true);
    hideReclaimReward();
    axios.post(URL_REWARDS_CLAIMS ,
      {
        user_id: user_id,
        reward_id: forReclaim.id
      },{
        headers: {
            Authorization: `Bearer ${token}` // Pasar el token Bearer aquí
        }
      })
      .then( ({data}) => {
        setIsLoading(false);
        console.log('ingresa a response de getReclaimReward');
        console.log(data);
        showReclaimGood();
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error en getReclaimReward', error.response.data);
        // Maneja el error de manera apropiada, muestra un mensaje de error, etc.
      });
  }
  const logout_session = () =>{

    deleteToken();
    dispatch(setToken(token));
    dispatch(logout());
  }
  const renderItem = ({ item, index }) => (
    <Card key={item.id} style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title style={styles.basureroTitle}>{item.name}</Title>
          {/* <IconButton
            icon="trash-can"
            color="#f44336"
            size={24}
            onPress={() => console.log('Acción de basura')}
          /> */}
        </View>
        <Image 
          source={{ uri: item.image }} 
          style={styles.image} 
          resizeMode="contain" 
        />
        <Paragraph style={styles.itemText}>
          <Text style={styles.bold}>Descripcion:</Text> {item.description}
        </Paragraph>
        <Paragraph style={styles.itemText}>
          <Text style={styles.bold}>Puntos requeridos:</Text> {item.points_required}
        </Paragraph>
        <Paragraph style={styles.itemText}>
          <Text style={styles.bold}>Cantidad:</Text> {item.stock}
        </Paragraph>
        <Paragraph style={styles.itemText}>
          <Text style={styles.bold}>estado:</Text> {item.status? 'Activo' : 'false'}
        </Paragraph>
      </Card.Content>

      {/* Botón para reclamar premio */}
      <Card.Actions>
        <Button 
          mode="contained" 
          icon="gift" 
          onPress={()=> reclaim_reward(item)}
          style={styles.reclaimButton}
          labelStyle={styles.buttonText}
        >
          Reclamar premio
        </Button>
      </Card.Actions>
    </Card>
  );

  const getRewards = () => {
    console.log('ingresa a getRewards ');
    axios.get(URL_REWARDS, {
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
      <Header title="Premios"></Header>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
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
      <Dialog visible={reclaimReward} onDismiss={hideReclaimReward} style={styles.dialog}>
        <Dialog.Title style={styles.dialogTitle}>⚠️ Advertencia</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={styles.dialogContent}>
            ¿Está seguro de reclamar el premio?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button onPress={hideReclaimReward} textColor="#FF5252" labelStyle={styles.buttonTextDialog}>
            Cancelar
          </Button>
          <Button onPress={getReclaimReward} textColor="#4CAF50" labelStyle={styles.buttonTextDialog}>
            Aceptar
          </Button>
        </Dialog.Actions>
      </Dialog>

      {/* Dialog de no se puede hacer el reclamo */}
      <Dialog visible={notReclaimReward} onDismiss={hideNotReclaimReward} style={styles.dialog}>
        <Dialog.Title style={styles.dialogTitle}>⚠️ Advertencia</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={styles.dialogContent}>
            Puntaje menor al necesario, siga recolectando mas puntos ...
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button onPress={hideNotReclaimReward} textColor="#4CAF50" labelStyle={styles.buttonTextDialog}>
            Aceptar
          </Button>
        </Dialog.Actions>
      </Dialog>

      {/* Dialog de no se puede hacer el reclamo */}
      <Dialog visible={visible} onDismiss={hideAlert} style={styles.dialog}>
        <Dialog.Title style={styles.dialogTitle}>⚠️ Advertencia</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={styles.dialogContent}>
            Token expirado, vuelva a iniciar sesion
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button onPress={logout_session} textColor="#4CAF50" labelStyle={styles.buttonTextDialog}>
            Aceptar
          </Button>
        </Dialog.Actions>
      </Dialog>
      
      <Dialog visible={reclaimGood} onDismiss={hideReclaimGood} style={styles.dialog}>
        <Dialog.Title style={styles.dialogTitle}>✔️ ¡Éxito!</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={styles.dialogContent}>
          El premio se reclamó correctamente. ¡Felicidades!
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button onPress={()=> hideReclaimGood()} textColor="#4CAF50" labelStyle={styles.buttonTextDialog}>
            Aceptar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
    
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 65,
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
    flexDirection: 'center',
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
  image: {
    width: '100%',
    height: 150, // Ajusta la altura según lo necesario
    borderRadius: 8,
    marginVertical: 8,
  },
  reclaimButton: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#4caf50', // Color del botón
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontWeight: 'bold',
  },
  dialog: {
    borderRadius: 15,
    backgroundColor: '#F7F8FA', // Fondo claro y moderno
    elevation: 4, // Sombra para mayor profundidad
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333', // Título en color oscuro
  },
  dialogContent: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555', // Texto ligeramente gris
    marginVertical: 10,
  },
  dialogActions: {
    justifyContent: 'space-evenly', // Botones espaciados uniformemente
  },
  buttonTextDialog: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject, // Llena toda la pantalla
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro y semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Asegura que el overlay esté sobre el contenido
  },
});

export default Rewards