import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../components/Header';
// import moment from 'moment';

const notifications = [
  {
    id: '1',
    type: 'transaction',
    title: 'Nueva Transaccion',
    description: 'Sele ha añadido puntos por la transaccion realizada.',
    time: '2024-11-05',
    icon: 'update',
  },
  {
    id: '2',
    type: 'premio',
    title: 'Recompensa Canjeada',
    description: 'Su recompensa acaba de ser canjeada',
    time: '2024-11-05',
    icon: 'message',
  },
  {
    id: '3',
    type: 'recompensa',
    title: 'Oferta especial',
    description: 'Nuevo premio añadido para canjear!!!',
    time: '2024-11-05',
    icon: 'local-offer',
  },
];

export default function Notification({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    // Aquí puedes hacer la lógica para recargar los datos.
    setRefreshing(true);

    // Simulando una carga de datos (como si vinieran de una API)
    setTimeout(() => {
      setRefreshing(false);
      console.log('Datos recargados');
    }, 2000);
    
    // getRewards()
  };
  const handleNotificationPress = (type) => {
    switch (type) {
      case 'transaction':
        console.log(' ingresa a notification transaction');
        navigation.navigate('Init');
        
        break;
      case 'premio':
        console.log(' ingresa a notification premio');
        navigation.navigate('ReclaimRewards');
        
        break;
      case 'recompensa':
        console.log(' ingresa a notification recompensa');
        navigation.navigate('Rewards');
        
        break;
    
      default:
        break;
    }
  }
  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationCard} activeOpacity={0.8}
      onPress={() => handleNotificationPress(item.type)} // Ejecuta el método al presionar
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name={item.icon} size={24} color="#4CAF50" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Notificaciones"></Header>
      {/* <Text style={styles.header}>Notificaciones</Text> */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
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
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa', // Un fondo suave
    paddingHorizontal: 15,
    paddingBottom: 65,
    backgroundColor: '#e0f7fa', // Un fondo suave
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  time: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 5,
  },
});
