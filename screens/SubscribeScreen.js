import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native';

const SubscribeScreen = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email.trim() === '') {
      Alert.alert('Please enter a valid email address');
    } else {
      Alert.alert('Thanks for subscribing, ' + email + '!');
      setEmail(''); // clear input after subscribing
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/little-lemon-logo.png')}
        resizeMode="contain"
        accessible
        accessibilityLabel="Little Lemon Logo"
      />
      <Text style={styles.label}>Enter your email to subscribe:</Text>
      <TextInput
        style={styles.input}
        placeholder="email@example.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.buttonWrapper}>
        <Button title="Subscribe" onPress={handleSubscribe} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    height: 100,
    width: 300,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonWrapper: {
    width: 200,
  },
});

export default SubscribeScreen;
