import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  Text,
  Button,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const window = useWindowDimensions();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: colorScheme === 'light' ? '#fff' : '#333333',
        },
      ]}
    >
      <View style={styles.centeredContent}>
        <Image
          style={styles.logo}
          source={require('../assets/little-lemon-logo.png')}
          resizeMode="contain"
          accessible
          accessibilityLabel="Little Lemon Logo"
        />
        <Text style={styles.regular}>
          Little Lemon, your local Mediterranean Bistro
        </Text>

        <View style={styles.buttonWrapper}>
          <Button
            title="Newsletter"
            onPress={() => navigation.navigate('Subscribe')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  centeredContent: {
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 300,
  },
  regular: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
  },
  buttonWrapper: {
    marginTop: 20,
    width: 200,
  },
});

export default WelcomeScreen;
