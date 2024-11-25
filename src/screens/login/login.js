import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View, TouchableOpacity, Text } from 'react-native'
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

const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false)
    const [token, setearToken] = useState(useSelector((state) => state.token.token))
    const username = useInput('wfarel');
    const password = useInput('wf12345*');
    const dispatch = useDispatch();
    // const token = useSelector((state) => state.token.token);

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
        console.error(error);
        console.error(error.response.data);
        // Maneja el error de manera apropiada, muestra un mensaje de error, etc.
      });
    };
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
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

export default Login