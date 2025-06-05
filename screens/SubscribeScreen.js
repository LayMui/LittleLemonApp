import * as React from 'react';
import { Alert, StyleSheet, Image, TextInput, Text, View } from 'react-native';
import Button from '../components/Button';
import { validateEmail } from '../utils/index';


const SubscribeScreen = () => {
  const [email, setEmail] = React.useState('');

  return <View style={styles.container}>
    <Image
      style={styles.logo}
      source={require("../assets/little-lemon-logo-grey.png")}
    />
    <Text style={styles.title}>
      Subscribe to our newsletter for our latest delicious recipes!
    </Text>
    <TextInput
      style={styles.emailInput}
      value={email}
      onChangeText={setEmail}
      keyboardType='email-address'
      textContentType='emailAddress'
      placeholder='Your email'
    />
    <Button
      disabled={!validateEmail(email)}
      onPress={() => Alert.alert("Thank you for subscribing!")}
    >
      Subscribe
    </Button>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  emailInput: {
    fontSize: 16,
    marginVertical: 20,
    padding: 10,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default SubscribeScreen;
