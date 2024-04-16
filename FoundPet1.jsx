import React from 'react';
import { Text, StyleSheet, Platform, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

import { BackButton } from './BackButton';

import logo from './assets/foundpetlogo.png'
import bg from './assets/addpetbackground.png'


const FoundPet1 = () => {

  const navigation = useNavigation();

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
    { label: 'Female', value: 'Female' },
    { label: 'Unsure', value: 'Unsure' }
  ]);



  const handleNext = () => {

    navigation.navigate('FoundPet2', {
      Type: Type,
      Gender: Gender
    });

  }


  return (

    <ImageBackground source={bg} style={styles.container}>

      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ChoicePage')}>
        <Image source={logo} style={styles.logo}></Image>
      </TouchableOpacity>

      <View style={styles.buttonHolder}>

        <Text style={styles.textHeading}>The Basics </Text>

        {Platform.OS === 'ios' ? (
          <View style={{ width: '100%' }}>
            <Text style={styles.infoText}>Animal species:</Text>
            <DropDownPicker
              open={TypeOpen}
              value={Type}
              items={TypeOptions}
              setOpen={setTypeOpen}
              setValue={setType}
              setItems={setTypeOptions}
              zIndex={1000}
            />

            <Text style={styles.infoText}>Gender: </Text>

            <DropDownPicker
              open={GenderOpen}
              value={Gender}
              items={GenderOptions}
              setOpen={setGenderOpen}
              setValue={setGender}
              setItems={setGenderOptions}
              zIndex={999}

            />
            < TouchableOpacity style={styles.button} onPress={() => handleNext()}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: '100%' }}>
            <Text style={styles.infoText}>Animal species:</Text>
            <Picker
              selectedValue={Type}
              onValueChange={type => setType(type)}
              style={styles.input}>
              {TypeOptions.map((v) => {
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
    marginBottom: '2%',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 15
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

export { FoundPet1 };