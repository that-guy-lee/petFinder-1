import React from 'react';
import { Text, StyleSheet, Platform, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from 'firebase/firestore';
import { auth, db, storage } from './firebase';

import { BackButton } from './BackButton';
import { Loader } from './Loader';

import logo from './assets/addapetlogo.png'
import bg from './assets/addpetbackground.png'



const AddPet5 = (props) => {

  const navigation = useNavigation();

  const [PetImage, setPetImage] = React.useState(null)
  const [Loading, setLoading] = React.useState(false)

  const handleSave = async () => {

    if (PetImage != null) {
      setLoading(true)
      var ImageUrl = await handleImageSave();
      try {
        const docRef = await addDoc(collection(db, 'mypets'), {
          Owner: auth.currentUser?.email,
          Type: props.route.params.Type,
          Size: props.route.params.Size,
          Colour: props.route.params.Colour,
          Limbs: props.route.params.Limbs,
          Ears: props.route.params.Ears,
          Tail: props.route.params.Tail,
          Collar: props.route.params.Collar,
          Name: props.route.params.Name,
          AnswersTo: props.route.params.AnswersTo.split(","),
          Breed: props.route.params.Breed,
          Lost: false,
          Other: props.route.params.Other,
          Reward: "0",
          Area: props.route.params.Area,
          ContactNumber: props.route.params.ContactNumber,
          ContactPerson: props.route.params.ContactPerson,
          ImageUrl: ImageUrl,
          Gender: props.route.params.Gender
        })

        navigation.navigate('MyPetInfo', {
          pet: {
            Owner: auth.currentUser?.email,
            Type: props.route.params.Type,
            Size: props.route.params.Size,
            Colour: props.route.params.Colour,
            Limbs: props.route.params.Limbs,
            Ears: props.route.params.Ears,
            Tail: props.route.params.Tail,
            Collar: props.route.params.Collar,
            Name: props.route.params.Name,
            AnswersTo: props.route.params.AnswersTo.split(","),
            Breed: props.route.params.Breed,
            Lost: false,
            Other: props.route.params.Other,
            Reward: "0",
            Area: props.route.params.Area,
            ContactNumber: props.route.params.ContactNumber,
            ContactPerson: props.route.params.ContactPerson,
            ImageUrl: ImageUrl,
            Gender: props.route.params.Gender
          }
        });
      } catch (e) {
        console.error('Error adding document: ', e);
        alert(`There was an error adding ${props.route.params.Name}. Please try again or contact support`);
      }
    } else {
      alert(`Please add an image of ${props.route.params.Name}`)
    }

  };



  const handleImageSave = async () => {
    // Create a reference to the storage location where the image will be uploaded
    const storageRef = ref(storage, `${auth.currentUser?.email}-${props.route.params.Name}-${Date.now().toString()}`);

    try {
      // Fetch the image data using its URL
      const response = await fetch(PetImage);

      // Convert the response to a blob
      const blob = await response.blob();

      // Upload the base64-encoded string to Firebase storage
      await uploadBytes(storageRef, blob)
      
      return await getDownloadURL(storageRef)

    } catch (e) {
      console.error('Error uploading image', e);
      alert('Error uploading image');
    }
  };

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.2,
    });

    if (!result.canceled) {
      setPetImage(result.uri);
    }

  };


  return (

    <ImageBackground source={bg} style={styles.container}>

      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ChoicePage')}>
        <Image source={logo} style={styles.logo}></Image>
      </TouchableOpacity>

      <View style={styles.buttonHolder}>

        <Text style={styles.textHeading}>Last step!</Text>

        {Loading ? (
          <Loader />
        ) : (

          <View style={{ width: '100%' }}>

            {PetImage != null ? (
              <View style={{ width: '100%', alignItems: 'center' }}>
                {/* <Divider style={{ width: "80%", margin: 7, }} color='black' /> */}
                <Image
                  source={{ uri: PetImage }}
                  style={{ width: 200, height: 200 }}
                />

                <TouchableOpacity style={styles.button} onPress={() => handleImageUpload()}>
                  <Text style={styles.buttonText}>Change image</Text>
                </TouchableOpacity>
                < TouchableOpacity style={styles.button} onPress={() => handleSave()}>
              <Text style={styles.buttonText}>Add Pet!</Text>
            </TouchableOpacity>
              </View>
            ) : (

              <TouchableOpacity style={styles.button} onPress={() => handleImageUpload()}>
                <Text style={styles.buttonText}>Upload image</Text>
              </TouchableOpacity>

            )}


           
          </View>

        )
        }





      </View>


        <BackButton />

    </ImageBackground >

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
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: '#152fa3',
    height: 40,
    borderRadius: 15,
    backgroundColor: '#2196F3',

  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  buttonHolder: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    marginTop: '3%',
    borderRadius: 15,
    padding: '5%',
  },
  textHeading: {
    fontSize: 25,
    marginBottom: '5%',
    fontWeight: 'bold'
  }
});

export { AddPet5 };