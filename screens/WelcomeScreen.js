import * as React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Button from '../components/Button';

const WelcomeScreen = ({ navigation }) => {
  return <View style={styles.container}>
    <View style={styles.contentContainer}>
      <Image
        style={styles.logo}
        source={require("../assets/little-lemon-logo.png")}
      />
      <Text style={styles.title}>
        Little Lemon, your local Mediterranean Bistro
      </Text>
    </View>
    <Button onPress={() => navigation.navigate('Subscribe')}>Newsletter</Button>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default WelcomeScreen;
