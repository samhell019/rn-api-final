import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import { useAuthContext, LOGOUT } from '../providers/AuthProvider';

const Home = (props) => {
  const [{ profile, accessToken }] = useAuthContext();
  const [, dispatch] = useAuthContext();

  const image = require('../assets/pozadi4.jpg'); // path to your image in the assets folder

  return (
    <ImageBackground source={image} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Vítejte v aplikaci pro zapisování jízd do autoškoly!</Text>
        {accessToken !== null ? (
          <Text style={styles.subheader}>Jste přihlášen jako: {profile.unique_name}</Text>
        ) : (
          <Text style={styles.subheader}>Pro přístup ke všem funkcím aplikace se prosím přihlašte nebo zaregistrujte.</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // make the background semi-transparent
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default Home;
