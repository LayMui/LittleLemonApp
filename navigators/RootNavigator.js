import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SubscribeScreen from "../screens/SubscribeScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator ();

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
  //   <Stack.Navigator initialRouteName="Welcome">
  //   <Stack.Screen 
  //     options={{ title: 'Home' }} 
  //     screenOptions={{ headerStyle: { backgroundColor: '#FBDABB' } }}
  //     name="Welcome" component={WelcomeScreen} />

   
  //   <Stack.Screen name="Subscribe" component={SubscribeScreen} />
  // </Stack.Navigator>

  
  <Drawer.Navigator>
    <Drawer.Screen name="Welcome" component={WelcomeScreen} />
    <Drawer.Screen name="Menu" component={SubscribeScreen} />
  </Drawer.Navigator>


  );
};

export default RootNavigator;
