import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SubscribeScreen from "../screens/SubscribeScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator ();

const Stack = createNativeStackNavigator();
const HamburgerButton = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.toggleDrawer()}
    accessibilityLabel="Open navigation menu"
    accessibilityRole="button"
    style={{ marginLeft: 15 }}
    testID="drawerToggleButton"
  >
    <Ionicons name="menu" size={24} color="black" />
  </TouchableOpacity>
);

const RootNavigator = () => {
  return (
  //   <Stack.Navigator initialRouteName="Welcome">
  //   <Stack.Screen 
  //     options={{ title: 'Home' }} 
  //     screenOptions={{ headerStyle: { backgroundColor: '#FBDABB' } }}
  //     name="Welcome" component={WelcomeScreen} />

   
  //   <Stack.Screen name="Subscribe" component={SubscribeScreen} />
  // </Stack.Navigator>

  
  <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => <HamburgerButton navigation={navigation} />,
      })}
    >
      <Drawer.Screen name="Welcome" component={WelcomeScreen} />
      <Drawer.Screen name="Subscribe" component={SubscribeScreen} />
    </Drawer.Navigator>


  );
};

export default RootNavigator;
