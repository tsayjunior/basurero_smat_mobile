import React, { useEffect, useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Inicio from "../screens/Inicio";
// import Perfil from "../screens/Perfil";
// import { Colors } from "../constants/Colors";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { Ionicons } from '@expo/vector-icons';
import Ionic from "react-native-vector-icons/Ionicons";
// import Icon, { Icons } from "../components/Icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useRef } from "react";
// import logout from "../screens/Logout";
// import Logout from "../screens/Logout";
// import PerfilDate from "../screens/PerfilDate";
import Init from "../../screens/init/Init";
import Colors from "../../utils/Colors";
import Icon, { Icons } from "../Icons";
import Perfil from "../../screens/perfil/Perfil";
// import { colors } from "react-native-elements";
// import { UsuarioContext } from "../Context/UsuarioContext";
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Tab = createBottomTabNavigator();
const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focussed = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    console.log(' **********************************************************************************************************************');
    if (focussed) {
      viewRef.current.animate({
        0: { scale: 0.5, rotate: "0deg" },
        1: { scale: 1.5, rotate: "360deg" },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1.5, rotate: "360deg" },
        1: { scale: 1, rotate: "0deg" },
      });
    }
  }, [focussed]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={1}
      // color={Colors.GREEN}
    >
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <Icon
          type={item.type}
          name={focussed ? item.activeIcon : item.inActiveIcon}
          color={focussed ? Colors.LETTUCE_GREEN_DARK : Colors.secundary}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};
// class ButtonTab extends Component {
  
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
const ButtonTab =()=>{
  // const [ ,,,,,,,,,,,setShowModal] = useContext(UsuarioContext);
  
const [showModal, setShowModal] = useState(false);
const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Ionicons,
    activeIcon: "home",
    inActiveIcon: "home-outline",
  // component: ()=><Inicio filtro={showModal}/>,
    component: Init,
    titleApp: 'Historial de Denuncias',
  },
  // { route: 'Perfil', label: 'Perfil', type: Icons.Ionicons, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: Perfil },
  // { route: 'Perfil2', label: 'Perfil', type: Icons.Ionicons, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: Perfil },
  // { route: 'Perfil3', label: 'Perfil', type: Icons.Ionicons, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: Perfil },
  // { route: 'Search', label: 'Search', type: Icons.Ionicons, activeIcon: 'grid', inActiveIcon: 'grid-outline', component: ColorScreen },
  // { route: 'Account', label: 'Account', type: Icons.Ionicons, activeIcon: 'grid', inActiveIcon: 'grid-outline', component: ColorScreen }

  {
    route: "Like2",
    label: "Like2",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "heart-plus",
    inActiveIcon: "heart-plus-outline",
    component: Perfil,
    titleApp: 'Perfil2',
  },
  {
    route: "Like",
    label: "Like",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "heart-plus",
    inActiveIcon: "heart-plus-outline",
    component: Perfil,
    titleApp: 'Perfil',
  },
  {
    route: "Logout",
    label: "Search",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "timeline-plus",
    inActiveIcon: "timeline-plus-outline",
    component: Perfil,
    titleApp: 'Logout',
  },
  {
    route: "PerfilDate",
    label: "Account",
    type: Icons.FontAwesome,
    activeIcon: "user-circle",
    inActiveIcon: "user-circle-o",
    component: Perfil,
    titleApp: 'Editar Datos',
  },
];
  
    return (
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: "right", //alineacion del titulo de la pestaña de cada tab
          // cambiando color de los tab de forma global
          tabBarActiveTintColor: Colors.secundary, //color del tab tickeado
          tabBarStyle: { backgroundColor: Colors.colorHeader }, //color del tab no tickeado
          tabBarStyle: {
            height: 60,
            position: "absolute",
            bottom: 16,
            right: 16,
            left: 13,
            borderRadius: 16,
          },
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                // headerRight: () => (
                //   <TouchableOpacity onPress={()=> {setShowModal(true), console.log('ingresa')}} style={{ marginRight: 10 }}>
                //     {/* <FontAwesome5 name="icon-name" size={24} color="white" /> */}
                //     <Icon
                //         type={Icons.FontAwesome}
                //         name={"filter"}
                //         color={Colors.WHITE}
                //         size={35}
                //       />
                //   </TouchableOpacity>
                // ),
                tabBarShowLabel: false,
                // (item.label=='Home'?<> </> :<></> ),
                // icono superior izquierdo del drawer
                headerTintColor: "white",//color de la letra del titulo del medio
                headerTitle: item.titleApp,
                headerStyle: { height: 120, backgroundColor: Colors.GREEN },

                headerShown: false, // Deshabilitar el encabezado superior
                tabBarIcon: ({ color, size, focused }) => (
                  // <FontAwesome5 name="home" size={27} color={color} />
                  <Ionic name={focused ? item.activeIcon : item.inActiveIcon} color={color} size={size} />
                ),
                tabBarButton: (props) => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
    );
  }

export default ButtonTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#eee'
    borderRadius: 0, // Ajusta el valor de borderRadius para hacerlo más curveado

  },
});
