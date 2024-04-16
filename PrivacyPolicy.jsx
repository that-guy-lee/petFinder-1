import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ImageBackground, Image, ScrollView } from 'react-native';
import { auth } from './firebase';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed';

import logo from './assets/TandCslogo.png'
import bg from './assets/supportpagebackground.png'

const PrivacyPolicy = () => {

  const navigation = useNavigation();

  const handleNav = () => {
    if (auth.currentUser?.email.length > 0) {
      auth
        .signOut()
        .then(() => {
          navigation.navigate("ChoicePage");
        })
    } else {
      navigation.navigate("AuthPage")
    }
  }

  return (

    <ImageBackground source={bg} style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ChoicePage')}>
        <Image source={logo} style={styles.logo}></Image>
      </TouchableOpacity>
      <View style={styles.content}>



        <View style={{ width: '100%', height: '80%', alignItems: 'center' }}>

          <View style={styles.buttonHolder}>

            <Text style={styles.headingText}>Terms, conditions and privacy policy</Text>
            <ScrollView>
              <Text style={styles.subHeadingText}>
                Acceptance of Terms
              </Text>

              <Text style={styles.infoText}>
                By accessing and using the Pet Finders (the "App"), you agree to comply with and be bound by the following terms and conditions.
              </Text>

              <Divider style={{ width: "80%", margin: "10%", justifyContent: 'center' }} color='black' />

              <Text style={styles.subHeadingText}>
                User Responsibilities
              </Text>

              <Text style={styles.infoText}>
                a. Users of the App acknowledge and agree that the primary purpose of the platform is to facilitate the reunification of lost pets with their owners and vice versa.
              </Text>
              <Text style={styles.infoText}>
                b. Users must provide accurate, up-to-date, and truthful information when reporting lost or found pets.
              </Text>

              <Divider style={{ width: "80%", margin: "10%", justifyContent: 'center' }} color='black' />

              <Text style={styles.subHeadingText}>
                Contact Details Sharing
              </Text>

              <Text style={styles.infoText}>
                a. When a user reports a lost pet, the App may share the contact details provided by the user (including but not limited to name, phone number, and email address) with individuals claiming to have found the pet.
              </Text>
              <Text style={styles.infoText}>
                b. Similarly, when a user reports finding a pet, the App may share the user's contact details with the pet owner.
              </Text>
              <Text style={styles.infoText}>
                c. Users acknowledge and explicitly consent to the sharing of their contact details for the sole purpose of facilitating the safe return of lost pets.
              </Text>

              <Divider style={{ width: "80%", margin: "10%", justifyContent: 'center' }} color='black' />

              <Text style={styles.subHeadingText}>
                Privacy and Data Security
              </Text>
              <Text style={styles.infoText}>
                a. Pet Finders is committed to maintaining the privacy and security of user information and will take reasonable measures to protect it.
              </Text>
              <Text style={styles.infoText}>
                b. Users are responsible for safeguarding their login credentials and must promptly notify the App of any unauthorized access to their account.
              </Text>

              <Divider style={{ width: "80%", margin: "10%", justifyContent: 'center' }} color='black' />

              <Text style={styles.subHeadingText}>
                Contact by Pet Finders
              </Text>
              <Text style={styles.infoText}>
                a. By using the App, users agree to receive communications from Pet Finders through the email address provided during the registration process.
              </Text>
              <Text style={styles.infoText}>
                b. Pet Finders may contact users to provide updates on lost or found pets, offer assistance, or communicate important information related to the App.
              </Text>
              <Divider style={{ width: "80%", margin: "10%", justifyContent: 'center' }} color='black' />
              <Text style={styles.subHeadingText}>
                User Conduct
              </Text>
              <Text style={styles.infoText}>
                a. Users agree not to misuse the App by providing false information, engaging in fraudulent activities, or using the platform for any unlawful purpose.
              </Text>
              <Text style={styles.infoText}>
                b. Users are solely responsible for the content they submit to the App, and Pet Finders reserves the right to remove or modify content that violates these terms.
              </Text>
              <Divider style={{ width: "80%", margin: "10%", justifyContent: 'center' }} color='black' />
              <Text style={styles.subHeadingText}>
                Limitation of Liability
              </Text>
              <Text style={styles.infoText}>
                a. The App and its creators shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with the use of the App.
              </Text>
              <Divider style={{ width: "80%", margin: "10%", justifyContent: 'center' }} color='black' />
              <Text style={styles.infoText}>
                By using the App, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.

              </Text>

            </ScrollView>
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
    backgroundColor: '#152fa3',
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
    fontSize: 18,
    textAlign: 'center'
  },
  headingText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '3%'
  },
  subHeadingText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export { PrivacyPolicy };