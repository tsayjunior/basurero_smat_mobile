import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity,Image } from 'react-native'
import { View } from 'react-native'
import Header from '../../components/Header'
import Colors from '../../utils/Colors'
import { Button, LinearProgress } from '@rneui/themed';
import * as Animatable from 'react-native-animatable';
import loginStyles from '../../styles/login'
import TextInputForm from '../../components/form/TextInputForm'
import useInput from '../../utils/FormText'
import Toast from 'react-native-toast-message';
import { Icon } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { FlatList } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; // Paquete de íconos
import axios from 'axios';
import { URL_REGISTER } from '../../utils/Config'
import { Card, Title, Paragraph, IconButton, Dialog } from 'react-native-paper';

const RegisterUser = ({ navigation }) => {
  const [progress, setProgress] = useState(0.00);
  const username = useInput('');
  const password = useInput('');
  const repeatPassword = useInput('');
  const [hidePassword, setHidePassword] = useState(true);
  const [showFirstScroll, setShowFirstScroll] = useState(true);
  const [showFirstScrollReview, setShowFirstScrollReview] = useState(true);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // El estado de carga
  const [registerGood, setRegisterGood] = useState(false);
  const [visible, setVisible] = useState(false);

  const [image, setImage] = useState(null); // Estado para almacenar la imagen seleccionada

  const showAlert = () => {
    setVisible(true);
  };

  const hideAlert = () => {
    setVisible(false);
  };

  const showregisterGood = () => {
    setRegisterGood(true);
  };

  const hideregisterGood = () => {
    setRegisterGood(false);
  };

  const progressLineAdd = (quantity) => {
    let currentProgress = +progress;
    const intervalId = setInterval(() => {
      if (currentProgress >= +progress + +quantity) {
        clearInterval(intervalId); // Detenemos el intervalo cuando se alcanza el valor deseado
        return;
      }
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 0.03;
        currentProgress = newProgress;
        // return newProgress;
        return 1;
      });
    }, 100); // Incrementa el progreso cada 100ms
  };
  // const progressLineRemove = (quantity) => {
  //   let currentProgress = +progress;
  //   const intervalId = setInterval(() => {
  //     if (currentProgress <= +progress - +quantity) {
  //       clearInterval(intervalId); // Detenemos el intervalo cuando se alcanza el valor deseado
  //       return;
  //     }
  //     setProgress((prevProgress) => {
  //       const newProgress = prevProgress - 0.03;
  //       currentProgress = newProgress;
  //       return 0;
  //     });
  //   }, 100); // Incrementa el progreso cada 100ms
  // };
  
  const progressLineRemove = (quantity) => {
    // console.log(repeatPassword.value== '' && password.value== '' && username.value== '', repeatPassword.value, password.value, username.value);
    console.log(' ingres a progressLineRemove');
    // if(repeatPassword.value== '' && password.value== '' && username.value== ''){
      setProgress(0);
    // }

  };
  const deleteImage = (index) => {

    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    console.log('i ngresa a quitar imaeg', index);
  };

  const addProgressLine = (value, inputName) => {
    
    if(value!= ''){
      console.log(' addProgressLine => ', value, ' esta con datos', [inputName], inputName.lineProgress);
      if(!inputName.lineProgress){
        inputName.onChangeLineProgress(true);
        progressLineAdd(0.2);
      }
    }else{
      inputName.onChangeLineProgress(true);
      console.log(' addProgressLine minus => ', value, inputName.lineProgress);
      if(inputName.lineProgress){
        inputName.onChangeLineProgress(false);
        progressLineRemove(0.2);
      }
    }
  }
  const showToast = () => {
    Toast.show({
      type: 'error', // Puedes usar 'info', 'success', 'error', etc.
      text1: 'Error',
      text2: 'Por favor, rellena todos los campos del formulario.',
      visibilityTime: 3000,
      position: 'top', // Cambia la posición si es necesario
    });
  };
  const toggleScrollView = () => {
    setShowFirstScroll(!showFirstScroll);
    setTimeout(() => {
      setShowFirstScrollReview(!showFirstScrollReview);
    }, 500);
  };
  // Función para abrir la galería o cámara
  const pickImage = async () => {
    // Solicitar permisos
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert('Permiso para acceder a las fotos es necesario!');
      return;
    }

    // Seleccionar la imagen
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      console.log(' ingresa a guardar foto ');
      // Agregar la imagen seleccionada al array de imágenes
      setImages((prevImages) => [...prevImages, pickerResult.assets[0].uri]);
      setImage(pickerResult.assets[0].uri); // Guarda la URI de la imagen seleccionada
      // setImage(pickerResult.uri); // Guarda la URI de la imagen seleccionada
      console.log(' foto ', image, pickerResult);
    }
  };
  const createAcount = () =>{
    console.log('ingresa a crear cuenta');
    // console.log(image);
    // console.log(username.value);
    // console.log(password.value);
    // console.log(repeatPassword.value);
    
    const formData = new FormData();
    images.forEach((element, index) => {
      let titleaux= index == 0? '' : ''+(index + 1);
      let title = 'image_perfil' + titleaux;
      formData.append( title, {
        uri: element,
        type: 'text/plain', // Ajusta el tipo de imagen según corresponda
        name: 'img_perfil.jpg', // Ajusta el nombre del archivo según corresponda
        });
      
    });
    // formData.append('image_perfil2', {
    //   uri: images[1],
    //   type: 'text/plain', // Ajusta el tipo de imagen según corresponda
    //   name: 'img_perfil.jpg', // Ajusta el nombre del archivo según corresponda
    //   });
    // formData.append('image_perfil3', {
    //   uri: images[2],
    //   type: 'text/plain', // Ajusta el tipo de imagen según corresponda
    //   name: 'img_perfil.jpg', // Ajusta el nombre del archivo según corresponda
    //   });
    formData.append('username', username.value);
    formData.append('password', password.value);
    console.log(formData);
    axios.post(URL_REGISTER, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(({data}) => {
          console.log('Lo que devuelve el register ', data);
          showregisterGood();
        })
        .catch(error => {
          console.log(error);
          console.log('ingrsa',  error.response.data);
          showAlert();
          // setLoading(false);
        });
  }
  const creation_good = () => {
    hideregisterGood();
    navigation.navigate('Login');
  }
  return (
    <View style={{flex: 1, backgroundColor: Colors.SOFT_BACKGROUND, paddingHorizontal: 15,}}>
      <Header title="Crear Nueva cuenta"></Header>


      <View style={{backgroundColor: Colors.RED_DEGRADADO, flex: 8, margin: 20, borderBottomEndRadius: 40, borderBottomLeftRadius: 40}}>
        <LinearProgress
          style={{ marginVertical: 0, borderRadius: 20,  height: 15 }}
          value={progress}
          variant="determinate"
        />
        <View style={{ flex: 1, justifyContent: 'center', padding: 20,}}>
          {showFirstScrollReview? 
            <Animatable.View
              animation={showFirstScroll ? "fadeIn" : "fadeOut"}
              duration={500}
              style={styles.animatableView}
              onAnimationEnd={() => {
                if (!showFirstScroll) {
                  // Se asegura de que el segundo ScrollView esté visible después de desvanecer el primero
                  setShowFirstScroll(false);
                }
              }}
            >
              <ScrollView style={{flex: 1, marginTop: 35}}>
                <Animatable.View animation="bounceIn" 
                    style={loginStyles.contain_body}
                    >
                    <TextInputForm
                        keyboardType="email-address"
                        placeholder="Nombre Usuario"
                        icon_image="user"
                        onChangeText={(value) => {username.onChange(value); addProgressLine(value, username)}}
                        icon_font="Icons.FontAwesome"
                        strError={username.valueError}
                        bolError={true}
                    />

                    <TextInputForm
                        keyboardType="default"
                        placeholder="Contraseña"
                        icon_image="lock"
                        onChangeText={(value) => {password.onChange(value); addProgressLine(value, password)}}
                        icon_font="Icons.FontAwesome"
                        is_password={true}
                        onPress={() => setHidePassword(!hidePassword)}
                        secureTextEntry={hidePassword}
                        strError={password.valueError}
                        bolError={true}
                    />
                    <TextInputForm
                        keyboardType="default"
                        placeholder="Repetir Contraseña"
                        icon_image="lock"
                        onChangeText={(value) => {repeatPassword.onChange(value); addProgressLine(value, repeatPassword)}}
                        icon_font="Icons.FontAwesome"
                        is_password={true}
                        onPress={() => setHidePassword(!hidePassword)}
                        secureTextEntry={hidePassword}
                        strError={repeatPassword.valueError}
                        bolError={true}
                    />

                </Animatable.View>
              </ScrollView>
            </Animatable.View>
          
          :
          
            <Animatable.View
              animation={showFirstScroll ? "fadeOut" : "fadeIn"}
              duration={500}
              style={styles.animatableView}
              onAnimationEnd={() => {
                if (showFirstScroll) {
                  // Se asegura de que el segundo ScrollView esté visible después de desvanecer el primero
                  setShowFirstScroll(true);
                }
              }}
            >
              <ScrollView style={{flex: 1, marginTop: 35}}>
                <Animatable.View animation="bounceIn" 
                    style={loginStyles.contain_body}
                    >
                      
                  <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                      {/* <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Subir Fotos de Referencia</Text> */}
                      <Icon
                          raised
                          name='camera'
                          type='font-awesome'
                          color='#f50'
                          onPress={() => { console.log('hello'),pickImage() }}
                          size={80}
                      />
                  </View>
                  {/* {image && (
                    <Image source={{ uri: image }} style={styles.image} />
                  )} */}
                  <View style={styles.imageGallery}>
                    {images.map((image, index) => (
                      <View key={index} style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.image} />

                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => deleteImage(index)}
                        >
                          <MaterialIcons name="delete" size={24} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  
                </Animatable.View>
              </ScrollView>
            </Animatable.View>
            
          }
        </View>
      </View>
      
      <View style={{flex: 1, margin: 10}}>
        <TouchableOpacity 
          // disabled={progress < 0.5}
          onPress={()=> {progress < 0.5? showToast() : showFirstScrollReview? toggleScrollView(): createAcount()}}
          style={{alignItems: 'center', backgroundColor: progress < 0.5?Colors.GREEN_DEGRADADO:Colors.GREEN , marginHorizontal: 30, paddingVertical: 8, borderRadius: 10}}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20}}>{showFirstScrollReview? 'Siguiente' : 'Crear'}</Text>
        </TouchableOpacity>
      </View>
      
      <Dialog visible={registerGood} onDismiss={hideregisterGood} style={styles.dialog}>
        <Dialog.Title style={styles.dialogTitle}>✔️ ¡Éxito!</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={styles.dialogContent}>
          El usuario se Creó correctamente !!!
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button onPress={()=> creation_good()} textColor="#4CAF50" labelStyle={styles.buttonTextDialog}>
            Aceptar
          </Button>
        </Dialog.Actions>
      </Dialog>
      
      <Dialog visible={visible} onDismiss={hideAlert} style={styles.dialog}>
        <Dialog.Title style={styles.dialogTitle}>⚠️ Advertencia</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={styles.dialogContent}>
            Ha ocurrido un error al intentar registrar usuario
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button onPress={hideAlert} textColor="#4CAF50" labelStyle={styles.buttonTextDialog}>
            Aceptar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}

const styles = StyleSheet.create({
  animatableView: {
    position: 'absolute', // Asegura que ambos ScrollView ocupen la misma posición
    top: 0, // Se puede ajustar si es necesario
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageContainer: {
    margin: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  // image: {
  //   width: 200,
  //   height: 200,
  //   marginTop: 20,
  //   borderRadius: 10,
  // },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: Colors.LETTUCE_GREEN_DARK,
    borderRadius: 15,
    padding: 5,
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
});
export default RegisterUser