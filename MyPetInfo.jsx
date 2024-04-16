import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ImageBackground, Image, Linking } from 'react-native';
import { auth, db } from './firebase';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, deleteDoc, getDocs, updateDoc } from 'firebase/firestore';
import { Divider } from '@rneui/themed';
import Dialog from "react-native-dialog";
import { ScrollView } from 'react-native-gesture-handler';
import { getStorage, ref, deleteObject } from "firebase/storage";

import { Loader } from './Loader';

import logo from './assets/petinfologo.png'
import bg from './assets/petinfobackground.png'

const MyPetInfo = (props) => {

  const navigation = useNavigation();
  const [selectedPet, setSelectedPet] = React.useState(props.route.params.pet)
  const [showRewardPopup, setShowRewardPopup] = React.useState(false)
  const [reward, setReward] = React.useState("0")
  const [showFoundPopup, setShowFoundPopup] = React.useState(false)
  const [Loading, setLoading] = React.useState(false)


  const handleUpdate = async () => {

    if (reward > 10000) {
      alert("Reward cannot be greater than R10 000")
    } else {

      setLoading(true)

      const q = query(collection(db, 'mypets'), where('Owner', '==', auth.currentUser?.email), where('Name', '==', selectedPet.Name));

      try {

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          updateDoc(doc.ref, { Lost: !selectedPet.Lost });

          if (Number(reward) != NaN) {
            updateDoc(doc.ref, { Reward: reward });
          }

        });

        alert(`${selectedPet.Name} has been marked as ${selectedPet.Lost ? "found. We're glad that they're home safe!" : 'lost'}`);
        navigation.navigate('Landing')
      } catch (error) {
        console.error('Error updating: ', error);
      }
    }

  };

  const handleDelete = async () => {

    setLoading(true)
    try {
      const q = query(collection(db, 'mypets'), where('Owner', '==', auth.currentUser?.email), where('Name', '==', selectedPet.Name));
      const storage = getStorage();
      const snapshot = await getDocs(q);

      if (snapshot.size > 0) {
        const docRef = snapshot.docs[0].ref;
        const petData = snapshot.docs[0].data();
        const imageRef = ref(storage, petData.ImageUrl);

        await deleteDoc(docRef);
        await deleteObject(imageRef);

        alert(`${selectedPet.Name} has been successfully deleted.`);
        navigation.navigate('Landing')
      }


    } catch (error) {
      console.error('Error deleting: ', error);
    }
  };

  return (

    <ImageBackground source={bg} style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ChoicePage')}>
        <Image source={logo} style={styles.logo}></Image>
      </TouchableOpacity>
      <View style={styles.content}>

        {Loading ? (
          <Loader />
        ) : (
          <ScrollView style={{ width: '100%' }}>
            <View style={{ width: '100%', height: '80%', alignItems: 'center' }}>
              <Text style={styles.heading}>{selectedPet.Name}</Text>

              {selectedPet.Lost ? (
                <View style={styles.buttonHolder}>
                  <Text style={styles.infoText}>We're doing everything in our power to help find {selectedPet.Name}. {selectedPet.Gender == "Male" ? "His" : "Her"} reward is set at R{selectedPet.Reward}</Text>
                  <Divider style={{ width: "80%", margin: 7, }} color='black' />
                  <Text style={styles.infoText}>Type of pet: {selectedPet.Type}</Text>
                  <Text style={styles.infoText}>Breed: {selectedPet.Breed}</Text>
                  <Text style={styles.infoText}>Size: {selectedPet.Size}</Text>
                  <Text style={styles.infoText}>Gender: {selectedPet.Gender}</Text>
                  <Text style={styles.infoText}>Area: {selectedPet.Area}</Text>
                  <Text style={styles.infoText}>Answers To: {selectedPet.AnswersTo.toString()}</Text>
                  <Divider style={{ width: "80%", margin: 7, }} color='black' />
                  <Text style={styles.infoText}>Collar: {selectedPet.Collar ? 'Yes' : 'No'}</Text>
                  <Text style={styles.infoText}>Colour: {selectedPet.Colour}</Text>
                  <Text style={styles.infoText}>Number of ears: {selectedPet.Ears}</Text>
                  <Text style={styles.infoText}>Number of limbs: {selectedPet.Limbs}</Text>
                  <Text style={styles.infoText}>Tail: {selectedPet.Tail ? 'Yes' : 'No'}</Text>
                  <Divider style={{ width: "80%", margin: 7, }} color='black' />
                  <Text style={styles.infoText}>Contact Person: {selectedPet.ContactPerson}</Text>
                  <Text style={styles.infoText}>Contact Number: {selectedPet.ContactNumber}</Text>


                  <Divider style={{ width: "80%", margin: 7, }} color='black' />
                  <Text style={styles.infoText}>Other information:</Text>
                  <Text style={styles.infoText}>{selectedPet.Other != null && selectedPet.Other.length > 0  ? selectedPet.Other : "No additional information was provided"}</Text>

                  <Divider style={{ width: "80%", margin: 7, }} color='black' />
                  <Image style={{ width: 200, height: 200 }} source={{ uri: selectedPet.ImageUrl }} />


                </View>
              ) : (
                <View style={styles.buttonHolder}>

                  <Text style={styles.infoText}>Type of pet: {selectedPet.Type}</Text>
                  <Text style={styles.infoText}>Breed: {selectedPet.Breed}</Text>
                  <Text style={styles.infoText}>Size: {selectedPet.Size}</Text>
                  <Text style={styles.infoText}>Gender: {selectedPet.Gender}</Text>
                  <Text style={styles.infoText}>Area: {selectedPet.Area}</Text>
                  <Text style={styles.infoText}>Answers To: {selectedPet.AnswersTo.toString()}</Text>
                  <Divider style={{ width: "80%", margin: 7, }} color='black' />
                  <Text style={styles.infoText}>Collar: {selectedPet.Collar ? 'Yes' : 'No'}</Text>
                  <Text style={styles.infoText}>Colour: {selectedPet.Colour}</Text>
                  <Text style={styles.infoText}>Number of ears: {selectedPet.Ears}</Text>
                  <Text style={styles.infoText}>Number of limbs: {selectedPet.Limbs}</Text>
                  <Text style={styles.infoText}>Tail: {selectedPet.Tail ? 'Yes' : 'No'}</Text>
                  <Divider style={{ width: "80%", margin: 7, }} color='black' />
                  <Text style={styles.infoText}>Contact Person: {selectedPet.ContactPerson}</Text>
                  <Text style={styles.infoText}>Contact Number: {selectedPet.ContactNumber}</Text>

                  <Divider style={{ width: "80%", margin: 7, }} color='black' />
                  <Text style={styles.infoText}>Other information:</Text>
                  <Text style={styles.infoText}>{selectedPet.Other != null && selectedPet.Other.length > 0  ? selectedPet.Other : "No additional information was provided"}</Text>


                  {selectedPet.ImageUrl != "" ? (
                    <View>
                      <Divider style={{ width: "80%", margin: 7, }} color='black' />
                      <Image style={{ width: 200, height: 200 }} source={{ uri: selectedPet.ImageUrl }} />
                    </View>
                  ) : (
                    <View>
                      <Divider style={{ width: "80%", margin: 7, }} color='black' />
                      <Image style={{ width: 200, height: 200 }} source={require('./assets/default.jpg')} />
                    </View>
                  )}

                </View>

              )}


              <TouchableOpacity style={styles.button} onPress={() => { if (!selectedPet.Lost) { setShowRewardPopup(true) } else { setShowFoundPopup(true) } }}>
                <Text style={styles.buttonText}>{selectedPet.Lost ? 'Mark as found' : 'Mark as lost'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleDelete()}>
                <Text style={styles.buttonText}>Delete this pet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Landing", {back: true})}>
                <Text style={styles.buttonText}>Go back</Text>
              </TouchableOpacity>

              <View>
                <Dialog.Container visible={showRewardPopup}>
                  <Dialog.Title>Reward?</Dialog.Title>
                  <Dialog.Description>
                    If you'd like to offer a cash reward, enter it below
                  </Dialog.Description>
                  <Dialog.Input onChangeText={(text) => setReward(text)} keyboardType='numeric' />
                  <Dialog.Button label="Cancel" onPress={() => setShowRewardPopup(false)} />
                  <Dialog.Button label="Save" onPress={() => handleUpdate()} />
                </Dialog.Container>
              </View>

              <View>
                <Dialog.Container visible={showFoundPopup}>
                  <Dialog.Title>Yay! We're glad they're home!
                  </Dialog.Title>
                  <Dialog.Description>
                    Would you mind giving Pet Finder a review on Facebook?
                  </Dialog.Description>
                  <Dialog.Button label="Sure" onPress={() => { handleUpdate(); setShowRewardPopup(false); Linking.openURL('https://www.facebook.com/PetFinderAppSA?mibextid=LQQJ4d') }} />
                  <Dialog.Button label="No thanks" onPress={() => handleUpdate()} />
                </Dialog.Container>
              </View>

            </View>
          </ScrollView>
        )}


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
    height: 40,
    borderRadius: 15,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  heading: {
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold',
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
  }
});

export { MyPetInfo };