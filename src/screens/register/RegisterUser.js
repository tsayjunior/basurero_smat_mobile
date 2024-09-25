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

const RegisterUser = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const username = useInput('');
  const password = useInput('');
  const repeatPassword = useInput('');
  const [hidePassword, setHidePassword] = useState(true);
  const [showFirstScroll, setShowFirstScroll] = useState(true);
  const [showFirstScrollReview, setShowFirstScrollReview] = useState(true);
  const [images, setImages] = useState([]);



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
        return newProgress;
      });
    }, 100); // Incrementa el progreso cada 100ms
  };
  const progressLineRemove = (quantity) => {
    let currentProgress = +progress;
    const intervalId = setInterval(() => {
      if (currentProgress <= +progress - +quantity) {
        clearInterval(intervalId); // Detenemos el intervalo cuando se alcanza el valor deseado
        return;
      }
      setProgress((prevProgress) => {
        const newProgress = prevProgress - 0.03;
        currentProgress = newProgress;
        return newProgress;
      });
    }, 100); // Incrementa el progreso cada 100ms
  };
  const addProgressLine = (value, inputName) => {
    
    if(value!= ''){
      console.log(' addProgressLine => ', value, ' esta con datos', [inputName], inputName.lineProgress);
      if(!inputName.lineProgress){
        inputName.onChangeLineProgress(true);
        progressLineAdd(0.2);
      }
    }else{
      console.log(' addProgressLine => ', value, ' esta sin datos', inputName);
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
      // Agregar la imagen seleccionada al array de imágenes
      setImages((prevImages) => [...prevImages, pickerResult.uri]);
    }
  };
  const createAcount = () =>{
    console.log('ingresa a crear cuenta');
    navigation.navigate('Login')
  }
  return (
    <View style={{flex: 1}}>
      <Header></Header>


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
                  <View style={styles.imageGallery}>
                    {images.map((image, index) => (
                      <View key={index} style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.image} />
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
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
export default RegisterUser