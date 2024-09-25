import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Colors from './src/utils/Colors';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AuthNavigator from './src/components/authentication/AuthNavigator';

import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.RED} />
      <Provider store={store}>
        <AuthNavigator/>
        <Toast />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
