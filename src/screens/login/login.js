import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View, TouchableOpacity, Text } from 'react-native'
import loginStyles from '../../styles/login'
import { StatusBar } from 'expo-status-bar'
import LottieView from 'lottie-react-native'
import * as Animatable from 'react-native-animatable';
import TextInputForm from '../../components/form/TextInputForm'
import useInput from '../../utils/FormText'
import { Button } from '@rneui/base'

const login = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false)
    const username = useInput('');
    const password = useInput('');

    const redirectToSignin = () => {
        // navigation.navigate('Signin');
    }

    const login_auth = () => {
        console.log(' ingresa a login', username.value, ' error => ', username.valueError);
        username.onChangeError('Usuario incorrecto')
        password.onChangeError('Contraseña incorrecta')
    }
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
                    animation="bounceIn"
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

export default login