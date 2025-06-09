import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SubscribeScreen from "../screens/SubscribeScreen";
import MenuScreen from "../screens/MenuScreen";
import SettingScreen from "../screens/SettingScreen";
import CustomerScreen from "../screens/CustomerScreen";
import FilterSortMenuScreen from "../screens/FilterSortMenuScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator ();

//const Stack = createNativeStackNavigator();
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

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Welcome"
        onPress={() => props.navigation.navigate('Welcome')}
        testID="drawerItemWelcome"
        accessibilityLabel="Navigate to Welcome screen"
      />
      <DrawerItem
        label="Subscribe"
        onPress={() => props.navigation.navigate('Subscribe')}
        testID="drawerItemSubscribe"
        accessibilityLabel="Navigate to Subscribe screen"
      />
        <DrawerItem
        label="Menu"
        onPress={() => props.navigation.navigate('Menu')}
        testID="drawerItemSubscribe"
        accessibilityLabel="Navigate to Menu screen"
      />
         <DrawerItem
        label="FilterSortMenu"
        onPress={() => props.navigation.navigate('FilterSortMenu')}
        testID="drawerItemFilterSortMenu"
        accessibilityLabel="Navigate to Filter Sort Menu screen"
      />
         <DrawerItem
        label="Customer"
        onPress={() => props.navigation.navigate('Customer')}
        testID="drawerItemCustomer"
        accessibilityLabel="Navigate to Customer screen"
      />
         <DrawerItem
        label="Setting"
        onPress={() => props.navigation.navigate('Setting')}
        testID="drawerItemSetting"
        accessibilityLabel="Navigate to Setting screen"
      />
      
    </DrawerContentScrollView>
  );
};


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
  drawerContent={(props) => <CustomDrawerContent {...props} />}
>
  <Drawer.Screen name="Welcome" component={WelcomeScreen} />
  <Drawer.Screen name="Subscribe" component={SubscribeScreen} />
  <Drawer.Screen name="Menu" component={MenuScreen} />
  <Drawer.Screen name="Customer" component={CustomerScreen} />
  <Drawer.Screen name="FilterSortMenu" component={FilterSortMenuScreen} />
  <Drawer.Screen name="Setting" component={SettingScreen} />
</Drawer.Navigator>

  // <Drawer.Navigator
  //     screenOptions={({ navigation }) => ({
  //       headerLeft: () => <HamburgerButton navigation={navigation} />,
  //     })}
  //   >
  //     <Drawer.Screen name="Welcome" component={WelcomeScreen} />
  //     <Drawer.Screen name="Subscribe" component={SubscribeScreen} />
  //   </Drawer.Navigator>


  );
};

export default RootNavigator;
