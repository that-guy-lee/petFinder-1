import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ImageBackground, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import logo from './assets/Ourinfologo.png'
import bg from './assets/supportpagebackground.png'

const Support = () => {

  const navigation = useNavigation();

  const handleNav = () => {

      navigation.navigate("PrivacyPolicy")
    
  }

  return (

    <ImageBackground source={bg} style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ChoicePage')}>
        <Image source={logo} style={styles.logo}></Image>
      </TouchableOpacity>
      <View style={styles.content}>



        <View style={{ width: '100%', height: '80%', alignItems: 'center' }}>

          <View style={styles.buttonHolder}>

            <Text style={styles.headingText}>About us</Text>
            <Text style={styles.infoText}>We are Lee and Chad, the creators of "Pet Finder".
              As pet owners ourselves, we understand the pain of losing a furry friend.
              Our app provides an easy-to-use platform for pet owners to quickly locate their missing pets by connecting
              them with volunteers and animal shelters. Our goal is to make the process of finding lost
              pets less stressful and more efficient. We hope to make a positive impact on the lives of pets and their owners everywhere.</Text>
          </View>

          <View style={styles.buttonHolder}>
            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('http://privacy.lnkcommunications.co.za/')}>
              <Text style={styles.buttonText}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('mailto:petfinder@lnkcommunications.co.za')}>
              <Text style={styles.buttonText}>Report a bug</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('mailto:petfinder@lnkcommunications.co.za')}>
              <Text style={styles.buttonText}>Contact Us</Text>
            </TouchableOpacity>

          </View>


        </View>
      </View>
    </ImageBackground>

  );





}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCD5FF',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
    margin: '5%',
  },
  header: {
    width: '100%',
    height: '18%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    padding: 0,
    paddingTop: '13%',
    borderRadius: 0
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
    margin: 0,
    paddingTop: 0
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: '#2196F3',
    height: 40,
    borderRadius: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  buttonHolder: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    marginTop: '3%',
    borderRadius: 15,
    padding: '5%'
  },
  infoText: {
    fontSize: 20,
    textAlign: 'center'
  },
  headingText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export { Support };