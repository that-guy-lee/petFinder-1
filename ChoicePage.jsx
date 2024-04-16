import React, { useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ImageBackground, Image, Linking } from 'react-native';
import { auth } from './firebase';
import { getAuth, deleteUser } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Dialog from "react-native-dialog";


import logo from './assets/logonobg.png'
import bg from './assets/choicepagebackground.png'
import facebookLogo from './assets/facebook.png'
import helpLogo from './assets/help.png'
import signoutLogo from './assets/signout.png'

const ChoicePage = () => {

  const navigation = useNavigation();
  const [showPopup, setShowPopup] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleNav = (location) => {

    if (location == "myPets") {
      navigation.navigate('Landing')
    } else if (location == "support") {
      navigation.navigate('Support')
    } else {
      navigation.navigate('FoundPet1')
    }

  }

  const handleDelete = () => {

    const user = auth.currentUser;
  
    if (user) {
      deleteUser(user)
        .then(() => {
          navigation.navigate('AuthPage');
          setShowPopup(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  return (

    <ImageBackground source={bg} style={styles.container}>

      <View style={styles.header}>
        <Image source={logo} style={styles.logo}></Image>
      </View>
      <View style={styles.content}>

        <View style={{ width: '100%' }}>
          <View style={styles.buttonHolder}>
            <TouchableOpacity style={styles.button} onPress={() => handleNav("myPets")}>
              <Text style={styles.buttonText}>My Pets</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleNav("foundPet")}>
              <Text style={styles.buttonText}>Found a pet</Text>
            </TouchableOpacity>


          </View>

          <View style={styles.buttonHolderBottom}>


            <View style={styles.buttonBottom}>
              <TouchableOpacity style={styles.iconHolder} onPress={() => Linking.openURL('https://www.facebook.com/PetFinderAppSA?mibextid=LQQJ4d')}>
                <Image style={styles.icon} source={facebookLogo}></Image>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconHolder} onPress={() => handleNav("support")}>
                <Image style={styles.icon} source={helpLogo}></Image>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconHolder} onPress={() => setShowPopup(true)}>
                <Image style={styles.icon} source={signoutLogo}></Image>
              </TouchableOpacity>
            </View>


          </View>


        </View>
      </View>

      <View>
        <Dialog.Container visible={showPopup}>
          <Dialog.Title>Account</Dialog.Title>
          <Dialog.Description>
            What would you like to do?
          </Dialog.Description>
          <Dialog.Button label="Sign Out" onPress={() => { auth.signOut().then(() => navigation.navigate('AuthPage')); setShowPopup(false) }} />
          <Dialog.Button label="Delete Account" onPress={() => handleDelete()} />
          <Dialog.Button label="Cancel" onPress={() => setShowPopup(false)} />
        </Dialog.Container>
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


  content: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
    margin: '5%',
  },

  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: '#152fa3',
    height: '28%',
    borderRadius: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  buttonHolder: {
    width: '100%',
    justifyContent: 'center'
  },
  buttonHolderBottom: {
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: '20%'
  },
  iconHolder: {
    width: '25%',
    justifyContent: 'space-evenly',
    alignContent: 'stretch',

  },
  icon: {
    width: '100%',
    height: "80%",
    resizeMode: 'contain',
    margin: 0,
    paddingTop: 0

  },
  buttonBottom: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    height: '30%',
    borderRadius: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '20%'
  }

});

export { ChoicePage };