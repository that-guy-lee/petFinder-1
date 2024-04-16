import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed';
import axios from 'axios';
import React from 'react';
import { Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Loader } from './Loader';

import bg from './assets/petinfobackground.png';
import logo from './assets/petinfologo.png';


const FoundPetInfo = (props) => {

  const navigation = useNavigation();
  const [selectedPet, setSelectedPet] = React.useState(props.route.params.pet)
  const [foundPet, setFoundPet] = React.useState(props.route.params.foundPet)
  const [Loading, setLoading] = React.useState(false)


  const contact = async () => {

    const options = {
      params: {
        to: selectedPet.Owner,
        subject: `We think ${selectedPet.Name} has been found.`,
        body: `Hi ${selectedPet.ContactPerson}, \n\n Someone has logged a found pet that matches ${selectedPet.Name}'s description. \n
        Here are their contact details (we've given them yours too):\nName: ${foundPet.ContactPerson}\nContact Number: ${foundPet.ContactNumber}
        \n\nHere's the description that they gave us: \n
        Type: ${foundPet.Type}\n
        Size: ${foundPet.Size}\n
        Number of limbs: ${foundPet.Limbs}\n
        Number of ears: ${foundPet.Ears}\n
        Tail: ${foundPet.Tail ? "Yes" : "No"}\n
        Collar: ${foundPet.Collar ? "Yes" : "No"}\n
        Breed: ${foundPet.Breed}\n
        Area found: ${foundPet.Area}\n
        Gender: ${foundPet.Gender}
        \n\n

        Best wishes,\n
        The Pet Finder Team
        `
      }
    }

    axios.get(
      'https://us-central1-pet-finder-76ee7.cloudfunctions.net/sendEmail', options
    ).then(function (response) {
      console.log(response.data)
    }).catch(function (error) {
      console.error('Error triggering Cloud Function:', error);
    })

    alert(`We're so glad that ${selectedPet.Name} has been found and is safe! We've sent the owners your contact details, but you can contact ${selectedPet.ContactPerson} in the mean time.`)
    Linking.openURL(`tel:${selectedPet.ContactNumber}`)
  
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

                <View style={styles.buttonHolder}>
                  <Text style={styles.infoText}>Did you find {selectedPet.Name}? Their reward is set at R{selectedPet.Reward}.</Text>

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

                  <Text style={styles.infoText}>Other information:</Text>
                  <Text style={styles.infoText}>{selectedPet.Other != null && selectedPet.Other.length > 0  ? selectedPet.Other : "No additional information was provided"}</Text>

                  <Divider style={{ width: "80%", margin: 7, }} color='black' />

                  <Image style={{ width: 200, height: 200 }} source={{ uri: selectedPet.ImageUrl }} />


                </View>

              <TouchableOpacity style={styles.button} onPress={() => contact()}>
                <Text style={styles.buttonText}>Contact owner</Text>
              </TouchableOpacity>

              {/* TODO: GOING BACK BREAKS THE "VIEW MORE FUNCTIONALITY" */}
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FoundPet5")}>
                <Text style={styles.buttonText}>Go back</Text>
              </TouchableOpacity>

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
    backgroundColor: '#152fa3',
    height: 40,
    borderRadius: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  heading: {
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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

export { FoundPetInfo };
