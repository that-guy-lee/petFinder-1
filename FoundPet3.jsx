import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ImageBackground, Image, Pressable, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { BackButton } from './BackButton';

import logo from './assets/foundpetlogo.png'
import bg from './assets/addpetbackground.png'

import DogBreeds from './DogBreeds.json'
import CatBreeds from './CatBreeds.json'
import BirdBreeds from './BirdBreeds.json'

const FoundPet3 = (props) => {

  var OptionOptions = []

  if (props.route.params.Type == "Dog") {
    OptionOptions = DogBreeds
  } else if (props.route.params.Type == "Cat") {
    OptionOptions = CatBreeds
  } else {
    OptionOptions = BirdBreeds
  }

  const navigation = useNavigation();
  const [Breed, setBreed] = React.useState("")
  const [Selected, setSelected] = React.useState([])
  const [BreedOptions, setBreedOptions] = React.useState(OptionOptions)
  const [random, setRandom] = React.useState()

  const handleNext = () => {

    if (Selected.length > 0) {
      navigation.navigate('FoundPet4', {
        Type: props.route.params.Type,
        Gender: props.route.params.Gender,

        Ears: props.route.params.Ears,
        Limbs: props.route.params.Limbs,
        Size: props.route.params.Size,
        Collar: props.route.params.Collar,
        Tail: props.route.params.Tail,

        Breed: Selected.toString()
      });
    } else {
      alert("Please select a breed")
    }

  }

  const handleSelect = (value) => {
    if (Selected.includes(value)) {
      Selected.splice(Selected.indexOf(value), 1)
    } else {
      if (Selected.length == 2) {
        alert("You can only have a maximum of 2 breeds selected. To unselct a breed, just tap it again")
      } else {
        Selected.push(value)
      }
    }
    setRandom(Math.random())
  }



  return (

    <ImageBackground source={bg} style={styles.container}>

      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ChoicePage')}>
        <Image source={logo} style={styles.logo}></Image>
      </TouchableOpacity>

      <View style={styles.buttonHolder}>

        <Text style={styles.textHeading}>Select a breed</Text>
        <Text style={styles.textSubHeading}>(Maximum of two)</Text>

        <FlatList
          data={BreedOptions}
          extraData={random}
          renderItem={({ item }) => (
            <Pressable style={styles.card} onPress={() => handleSelect(item.value)}>
              <ImageBackground imageStyle={{ resizeMode: 'cover', height: '100%' }} style={[styles.itemContainer, { borderColor: Selected.includes(item.value) ? '#49fc21' : 'transparent' }]} source={{ uri: item.image }} >
                <View style={{ backgroundColor: 'rgba(255, 255, 255,0.6)', borderRadius: 0, padding: 3 }}>
                  <Text style={styles.itemName}>{item.label}</Text>
                </View>
              </ImageBackground>
            </Pressable>
          )}
          contentContainerStyle={styles.list}
          numColumns={2}
          columnWrapperStyle={styles.column}
          style={{ height: "55%" }}

        />

        <TouchableOpacity style={styles.button} onPress={() => handleNext()}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
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
    backgroundColor: '#2196F3',
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
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    marginTop: '3%',
    borderRadius: 15,
    padding: '5%'
  },
  textHeading: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  itemContainer: {
    borderRadius: 5,
    height: 150,
    alignItems: 'center',
    borderWidth: 4,
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: 'black'
  },
  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  list: {
    justifyContent: 'space-around'
  },
  column: {
    flexShrink: 1,
  },
  card: {
    width: "48%",
    margin: "1%",
  },
});


export { FoundPet3 };