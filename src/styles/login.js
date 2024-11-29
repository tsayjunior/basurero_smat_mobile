import { StyleSheet } from 'react-native';
import Colors from '../utils/Colors';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: Colors.SOFT_BACKGROUND
  },
  contain_logo: {
      // backgroundColor:Colors.BLACK,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
      // width: 'auto',
  },
  contain_body: {
      // flex: 1,
      // backgroundColor: Colors.GRAY,
      // alignItems: 'center',
      // justifyContent: 'center'
  },
  contain_footer: {
      flex: 0.5,
      // backgroundColor: Colors.GREEN,
      alignItems: 'center',
      justifyContent: 'center'
  },
  btnMain: {
      flex: 0.3,
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      width: 280,
      marginTop: 0,
      marginBottom: 0,
      backgroundColor: Colors.LETTUCE_GREEN_DARK,
      borderRadius: 18
  },
  txtTransparent: {
      color: Colors.RED,
      fontSize: 19,
  },
  btntxt: {
      textAlign: 'center',
      fontSize: 17,
      color: Colors.WHITE,
      paddingVertical: 15,
      // backgroundColor: Colors.BLACK_DEGRADADO,
      // fontFamily: 'Poppins-Bold',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});
