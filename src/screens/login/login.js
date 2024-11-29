import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import loginStyles from '../../styles/login'
import { StatusBar } from 'expo-status-bar'
import LottieView from 'lottie-react-native'
import * as Animatable from 'react-native-animatable';
import TextInputForm from '../../components/form/TextInputForm'
import useInput from '../../utils/FormText'
import { Button } from '@rneui/base'
import { BASE_URL, URL_LOGIN } from '../../utils/Config'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../redux/slices/tokenSlice'
import { authenticate } from '../../redux/slices/authSlice'
import { getToken, storeToken } from '../../storage/dataStorage'
import commonStyles from '../../styles/commonStyles'
import Colors from '../../utils/Colors'

const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false)
    const [token, setearToken] = useState(useSelector((state) => state.token.token))
    const username = useInput('');
    const password = useInput('');
    const dispatch = useDispatch();
    const [registerGood, setRegisterGood] = useState(false);
    const [visible, setVisible] = useState(false);
    // const token = useSelector((state) => state.token.token);

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
    const redirectToSignin = () => {
        console.log(' ingresa a registrar usuario');
        navigation.navigate('RegisterUser');
    }
    useEffect(() => {
        console.log(' token useEffect en login => ', token);
    },[])

    const login_auth = () => {
        setButtonLoading(true);
        login_user();
        // setTimeout(() => {
        //     setButtonLoading(false)
        //     console.log(' ingresa a L', username.value, ' error => ', username.valueError);
        //     username.onChangeError('Usuario incorrecto')
        //     password.onChangeError('Contraseña incorrecta')
        // }, 3000);
        // username.onChangeError('')
        // password.onChangeError('')
    }
    
  const login_user = () => {
    setButtonLoading(true);
    console.log('ingresa a login user xd', username.value, password.value, URL_LOGIN);
    username.onChangeError('');
    axios.post( URL_LOGIN,
        {
            username : username.value,
            password: password.value
        },
      )
      .then(({data}) => {
        console.log(' ******************************** good en login ************************************');
        const aux = data;
        setearToken(aux.access); 
        console.log(token, aux.access);
        storeToken(aux.access);
        dispatch(setToken(aux.access));
        dispatch(authenticate());
        setButtonLoading(false)
      })
      .catch(error => {
        setButtonLoading(false)
        console.log('****************************** error en login *************************************', URL_LOGIN);
        console.log(' response data del erro ', error.response.data);

        // console.error(error);
        if(error.response.data.detail == 'No active account found with the given credentials'){
            console.log(error.response.data.detail);
            username.onChangeError('usuario o contraseñas incorrectos !!!');
        }else{
            username.onChangeError('Ocurrió un error, intente nuevamente');
        }
        // Maneja el error de manera apropiada, muestra un mensaje de error, etc.
      });
    };
  return (
    <SafeAreaView style={[{ flex: 1, marginTop: StatusBar.currentHeight || 0 }, commonStyles.container]}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={loginStyles.container}
            >
                <View style={loginStyles.contain_logo}>
                    <LottieView
                        source={require('../../assets/login/dump.json')}
                        autoPlay
                        loop
                        style={{ width: 125, height: 125 }}
                        resizeMode="cover"
                    />
                </View>
                <Animatable.View animation="bounceIn" 
                    style={loginStyles.contain_body}
                    >
                    <TextInputForm
                        keyboardType="email-address"
                        placeholder="Usuario"
                        icon_image="user"
                        onChangeText={(value) => username.onChange(value)}
                        icon_font="Icons.FontAwesome"
                        strError={username.valueError}
                        bolError={true}
                    />

                    <TextInputForm
                        keyboardType="default"
                        placeholder="Contraseña"
                        icon_image="lock"
                        onChangeText={(value) => password.onChange(value)}
                        icon_font="Icons.FontAwesome"
                        is_password={true}
                        onPress={() => setHidePassword(!hidePassword)}
                        secureTextEntry={hidePassword}
                        strError={password.valueError}
                        bolError={true}
                    />
                </Animatable.View>
                <Animatable.View
                    style={loginStyles.contain_footer}
                    animation="pulse"
                    iterationCount="infinite" // Para repetir la animación infinitamente
                    duration={1500} // Duración de la animación
                >
                    <Button
                        onPress={() => { login_auth() }}
                        title="INICIAR SESION"
                        loading={buttonLoading}
                        loadingProps={{
                            size: '25',
                            color: 'white',
                        }}
                        buttonStyle={loginStyles.btnMain}
                        containerStyle={loginStyles.btntxt}
                        titleStyle={{ fontWeight: 'bold' }}
                        icon={{
                            name: 'arrow-right',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white',
                        }}
                        iconRight
                        iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
                    />
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <View >
                            <Text style={{alignItems: 'center', justifyContent: 'center', fontSize: 18}}>no tienes una cuenta?</Text>
                        </View>
                        <TouchableOpacity
                            onPress={redirectToSignin}>
                            <Text
                                style={[
                                    loginStyles.txtTransparent,
                                    { textDecorationLine: "underline" },
                                ]}
                            >
                                Registrate
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </ScrollView>
        </KeyboardAvoidingView>

    </SafeAreaView>
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
export default Login