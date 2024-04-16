import React from 'react';
import { Text, StyleSheet, Platform, TouchableOpacity, View, ImageBackground, Image, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import { BackButton } from './BackButton';

import logo from './assets/addapetlogo.png'
import bg from './assets/addpetbackground.png'

const AddPet1 = (props) => {

  const navigation = useNavigation();

  const [MyPets, setMyPets] = React.useState(props.route.params.MyPets)
  const [AnswersTo, setAnswersTo] = React.useState(null)
  const [Name, setName] = React.useState(null)

  const [Type, setType] = React.useState("Other")
  const [TypeOpen, setTypeOpen] = React.useState(false);
  const [TypeOptions, setTypeOptions] = React.useState([
    { label: 'Dog', value: 'Dog' },
    { label: 'Cat', value: 'Cat' },
    { label: 'Horse', value: 'Horse' },
    { label: 'Chinchilla', value: 'Chinchilla' },
    { label: 'Bearded Dragon', value: 'Bearded Dragon' },
    { label: 'Hedgehog', value: 'Hedgehog' },
    { label: 'Other', value: 'Other' },
  ]);

  const [Gender, setGender] = React.useState("Male")
  const [GenderOpen, setGenderOpen] = React.useState(false);
  const [GenderOptions, setGenderOptions] = React.useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ]);

  const [Colour, setColour] = React.useState("Other")
  const [ColourOpen, setColourOpen] = React.useState(false);
  const [ColourOptions, setColourOptions] = React.useState([
    { "label": "Black", "value": "Black" },
    { "label": "Brown", "value": "Brown" },
    { "label": "White", "value": "White" },
    { "label": "Tan", "value": "Tan" },
    { "label": "Grey", "value": "Grey" },
    { "label": "Brindle", "value": "Brindle" },
    { "label": "Red", "value": "Red" },
    { "label": "Golden", "value": "Golden" },
    { "label": "Cream", "value": "Cream" },
    { "label": "Blue", "value": "Blue" },

    { "label": "Tabby", "value": "Tabby" },
    { "label": "Orange", "value": "Orange" },
    { "label": "Calico", "value": "Calico" },
    { "label": "Siamese", "value": "Siamese" },
    { "label": "Tortoiseshell", "value": "Tortoiseshell" },

    { "label": "Bay", "value": "Bay" },
    { "label": "Chestnut", "value": "Chestnut" },
    { "label": "Palomino", "value": "Palomino" },
    { "label": "Buckskin", "value": "Buckskin" },
    { "label": "Roan", "value": "Roan" },
    { "label": "Appaloosa", "value": "Appaloosa" },
    { "label": "Pinto", "value": "Pinto" },
    { "label": "Dun", "value": "Dun" },
    { "label": "Other", "value": "Other" }

  ]
  );



  const uniqueName = () => {
    //This function checks if the user has a pet with that name already
    var unique = true;
    var cleanName = Name.replace(/[^A-Z0-9]/ig, "");

    MyPets.forEach(pet => {

      var cleanPetName = pet.Name.replace(/[^A-Z0-9]/ig, "");
      if (cleanPetName.toLowerCase() == cleanName.toLowerCase()) {
        unique = false;
      }
    });

    return unique;

  }

  const handleNext = () => {

    if (Colour && Name) {

      if (isNaN(Colour)) {
        if (uniqueName()) {
          navigation.navigate('AddPet2', {
            AnswersTo: AnswersTo != null && AnswersTo.length > 0 ? AnswersTo : "n/a",
            Colour: Colour,
            Name: Name,
            Type: Type,
            Gender: Gender
          });
        } else {
          alert("You've already added a pet with that name")
        }

      } else {
        alert("Please enter a valid colour")
      }
    } else {
      alert("All fields are required")
    }

  }


  return (

    <ImageBackground source={bg} style={styles.container}>

      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ChoicePage')}>
        <Image source={logo} style={styles.logo}></Image>
      </TouchableOpacity>


      <View style={styles.buttonHolder}>

        <Text style={styles.textHeading}>The Basics </Text>

        <TextInput
          editable
          onChangeText={text => setName(text)}
          value={Name}
          style={styles.input}
          placeholder={"Name"}
        />
        <TextInput
          editable
          onChangeText={text => setAnswersTo(text)}
          value={AnswersTo}
          style={styles.input}
          placeholder={"Nickname"}
        />

        <Divider style={{ width: "80%", margin: 7, }} color='black' />

        {Platform.OS === 'ios' ? (
          <View style={{ width: '100%' }}>
            <Text style={styles.infoText}>What kind of animal are they?: </Text>
            <DropDownPicker
              open={TypeOpen}
              value={Type}
              items={TypeOptions}
              setOpen={setTypeOpen}
              setValue={setType}
              setItems={setTypeOptions}
              zIndex={1000}
            />

            <Text style={styles.infoText}>Colour: </Text>
            <DropDownPicker
              open={ColourOpen}
              value={Colour}
              items={ColourOptions}
              setOpen={setColourOpen}
              setValue={setColour}
              setItems={setColourOptions}
              zIndex={999}
            />

            <Text style={styles.infoText}>Gender: </Text>

            <DropDownPicker
              open={GenderOpen}
              value={Gender}
              items={GenderOptions}
              setOpen={setGenderOpen}
              setValue={setGender}
              setItems={setGenderOptions}
              zIndex={998}

            />
            < TouchableOpacity style={styles.button} onPress={() => handleNext()}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: '100%' }}>
            <Text style={styles.infoText}>Animal species: </Text>
            <Picker
              selectedValue={Type}
              onValueChange={type => setType(type)}
              style={styles.input}>
              {TypeOptions.map((v) => {
                return (< Picker.Item label={v.label} value={v.value} key={v.value} />);
              })}
            </Picker>

            <Text style={styles.infoText}>Colour: </Text>
            <Picker
              selectedValue={Colour}
              onValueChange={colour => setColour(colour)}
              style={styles.input}>
              {ColourOptions.map((v) => {
                return (< Picker.Item label={v.label} value={v.value} key={v.value} />);
              })}
            </Picker>

            <Text style={styles.infoText}>Gender: </Text>
            <Picker
              selectedValue={Gender}
              onValueChange={type => setGender(type)}
              style={styles.picker}>
              {GenderOptions.map((v) => {
                return (< Picker.Item label={v.label} value={v.value} key={v.value} />);
              })}

            </Picker>
            < TouchableOpacity style={styles.button} onPress={() => handleNext()}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}

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
  buttonHolder: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    marginTop: '3%',
    borderRadius: 15,
    padding: '5%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    marginBottom: '1%',
    textAlign: 'center',
    fontSize: 22,
    borderRadius: 8,
    height: 50
  },
  picker: {
    width: '100%',
    marginBottom: '2%',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 22
  },
  textHeading: {
    fontSize: 25,
    marginBottom: '5%',
    fontWeight: 'bold'
  }
});


export { AddPet1 };