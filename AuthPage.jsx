import React, { useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ImageBackground, Image, TextInput, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Dialog from "react-native-dialog";

import logo from './assets/logonobg.png'
import bg from './assets/authpagebackground.png'

import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const AuthPage = () => {

  const [emailAddress, UpdateEmailAddress] = React.useState(null);
  const [password, UpdatePassword] = React.useState(null);
  const [passwordVerify, UpdatePasswordVerify] = React.useState(null);
  const [ID, UpdateID] = React.useState(null);
  const [IDNaN, setIDNaN] = React.useState(false);
  const [registered, UpdateRegistered] = React.useState(true)
  const navigation = useNavigation()
  const [ShowPrivacyPopup, setShowPrivacyPopup] = React.useState(false)

  const changeRegistered = () => {
    if (registered) {
      UpdateRegistered(false)
    } else {
      UpdateRegistered(true)
    }

  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.replace("ChoicePage");
      }
    });
    return unsubscribe;
  }, []);

  const handleRegister = () => {

    if (emailAddress && password && passwordVerify && ID) {
      if (password == passwordVerify) {
        setIDNaN(false)
        verifyID()
      } else {
        alert("Passwords don't match")
      }
    } else {
      alert("All fields are required")
    }
  }

  const verifyID = () => {

    var IDArray = [];

    for (var i = 0; i < ID.split("").length; i++) {

      if (isNaN(parseInt(ID.split("")[i]))) {
        alert("Please enter a valid South African ID number")
        setIDNaN(true)
        break
      } else {
        IDArray.push(parseInt(ID.split("")[i]));
      }

    }


    if (!IDNaN) {
      const length = IDArray.length
      const birthDay = parseInt(`${IDArray[4]}${IDArray[5]}`)
      const birthMonth = parseInt(`${IDArray[2]}${IDArray[3]}`)

      if (length == 13 && birthDay <= 31 && birthDay > 0 && birthMonth <= 12 && birthMonth > 0) {
        setShowPrivacyPopup(true)
      } else {
        alert("Please enter a valid South African ID number")
      }

    }


  }

  const submitRegister = async () => {

    //Save ID number
    const docRef = await addDoc(collection(db, 'userData'), {
      Email: emailAddress,
      ID: ID
    })

    createUserWithEmailAndPassword(auth, emailAddress, password)
      .then(userCredential => {
        const user = userCredential.user;
        sendEmailVerification(auth.currentUser)
          .then(() => {
            auth
              .signOut()
              .then(() => {
                alert("Please verify your email address using the link we sent you")
                navigation.navigate("AuthPage");
              })
          });
      })
      .catch(error => alert(error.message));
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, emailAddress, password)
      .then(userCredential => {
        const user = userCredential.user;
        if (user.emailVerified) {
          console.log("logged in with: " + user.email);
        } else {
          auth
            .signOut()
            .then(() => {
              alert("Please verify your email address before logging in")
              navigation.navigate("AuthPage");
            })
        }
      })
      .catch(error => alert(error.message));
  }

  const handlePopup = (tmp) => {

    setShowPrivacyPopup(false)
    if (tmp == "yes") {

      submitRegister();
    } else if (tmp == "read") {

      navigation.navigate('PrivacyPolicy')
    }

  }
  if (registered) {
    return (

      <ImageBackground source={bg} style={styles.container}>

        <View style={styles.header}>
          <Image source={logo} style={styles.logo}></Image>
        </View>


        <View style={styles.content}>

          <View style={styles.formHolder}>
            <TextInput
              editable
              onChangeText={text => UpdateEmailAddress(text)}
              value={emailAddress}
              style={styles.textInput}
              placeholder={"Email address"}
            />
            <TextInput
              editable
              secureTextEntry
              onChangeText={text => UpdatePassword(text)}
              value={password}
              placeholder={"Password"}
              style={styles.textInput}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerTextHolder} onPress={changeRegistered}>
              <Text style={{ color: '#3366CC' }}>No account? Register here</Text>
            </TouchableOpacity>

          </View>


        </View>
      </ImageBackground>
    )
  } else {
    return (
      <ImageBackground source={bg} style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo}></Image>
        </View>

        <View style={styles.content}>


          <View style={styles.formHolder}>
            <TextInput
              editable
              onChangeText={text => UpdateEmailAddress(text)}
              value={emailAddress}
              style={styles.textInput}
              placeholder={"Email address"}
            />
            <TextInput
              editable
              secureTextEntry
              onChangeText={text => UpdatePassword(text)}
              value={password}
              placeholder={"Password"}
              style={styles.textInput}
            />

            <TextInput
              editable
              secureTextEntry
              onChangeText={text => UpdatePasswordVerify(text)}
              value={passwordVerify}
              placeholder={"Confirm Password"}
              style={styles.textInput}
            />
            <TextInput
              editable
              onChangeText={text => UpdateID(text)}
              value={ID}
              placeholder={"South African ID Number"}
              style={styles.textInput}

            />

            <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
              <Text style={{ color: "white" }}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerTextHolder} onPress={changeRegistered}>
              <Text style={{ color: '#3366CC' }}>Already have an account? Login here</Text>
            </TouchableOpacity>

          </View>

        </View>

        <View>
          <Dialog.Container visible={ShowPrivacyPopup}>
            <Dialog.Title>Privacy</Dialog.Title>
            <Dialog.Description>
              Do you accept our terms, conditions and privacy policy?
            </Dialog.Description>
            <Dialog.Button label="Yes" onPress={() => handlePopup("yes")} />
            <Dialog.Button label="No" onPress={() => handlePopup("no")} />
            <Dialog.Button label="Read policy" onPress={() => Linking.openURL('http://privacy.lnkcommunications.co.za/')} />
          </Dialog.Container>
        </View>

      </ImageBackground>



    )
  }



}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCD5FF',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
    margin: '5%'
  },
  formHolder: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
    margin: '20%'
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
  textInput: {
    height: '8%',
    width: '90%',
    borderWidth: 1,
    padding: 10,
    marginBottom: '2%',
    backgroundColor: 'white',
    opacity: .90,
    borderRadius: 15
  },
  loginButton: {
    height: '8%',
    width: '90%',
    borderWidth: 1,
    padding: 10,
    marginBottom: '2%',
    backgroundColor: '#152fa3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  registerTextHolder: {
    height: '8%',
    width: '90%',
    alignItems: 'flex-end',
  },

});

export { AuthPage };