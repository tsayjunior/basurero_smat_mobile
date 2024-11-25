import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Colors from './src/utils/Colors';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AuthNavigator from './src/components/authentication/AuthNavigator';

// Importa SafeAreaProvider de react-native-safe-area-context
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.LETTUCE_GREEN_DARK} />
      <Provider store={store}>
        <AuthNavigator/>
        <Toast />
      </Provider>
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
