import React, { useEffect } from 'react';
import { Text, StyleSheet, Platform, TouchableOpacity, View, ImageBackground, Image, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db, storage } from './firebase';

import { BackButton } from './BackButton';

import geographicData from './geographicData.json'; // Import the JSON file

import logo from './assets/foundpetlogo.png'
import bg from './assets/addpetbackground.png'

const FoundPet4 = (props) => {

  const navigation = useNavigation();

  const [Other, setOther] = React.useState("")
  const [ContactPerson, setContactPerson] = React.useState(null)
  const [ContactNumber, setContactNumber] = React.useState(null)


  const [Province, setProvince] = React.useState("Other");
  const [ProvinceOpen, setProvinceOpen] = React.useState(false);
  const [ProvinceOptions, setProvinceOptions] = React.useState(geographicData.provinces.map((province) => ({ label: province.name, value: province.name })));

  const [City, setCity] = React.useState("Other");
  const [CityOpen, setCityOpen] = React.useState(false);
  const [CityOptions, setCityOptions] = React.useState([]);

  const [Area, setArea] = React.useState("Other");
  const [AreaOpen, setAreaOpen] = React.useState(false);
  const [AreaOptions, setAreaOptions] = React.useState([]);


  useEffect(() => {
    const selectedProvince = geographicData.provinces.find((province) => province.name === Province);
    if (selectedProvince) {
      setCityOptions(selectedProvince.cities.map((city) => ({ label: city.name, value: city.name })));
      setCity("Other"); // Reset city when province changes
      setArea("Other")
    }
  }, [Province]);

  // Update area options when city changes
  useEffect(() => {
    const selectedProvince = geographicData.provinces.find((province) => province.name === Province);
    if (selectedProvince) {
      const selectedCity = selectedProvince.cities.find((city) => city.name === City);
      if (selectedCity) {
        setAreaOptions(selectedCity.areas.map((area) => ({ label: area, value: area })));
        setArea("Other"); // Reset area when city changes
      }
    }
  }, [City, Province]);
  const ContactNumberVaild = () => {

    for (var i = 0; i < ContactNumber.split("").length; i++) {

      if (isNaN(parseInt(ContactNumber.split("")[i]))) {
        return (false)
      }
    }

    if (ContactNumber.split("").length != 10) {
      return (false)
    } else {
      return (true)
    }
  }

  const handleNext = async () => {

    if (ContactPerson && ContactNumber) {

      if (ContactNumberVaild()) {
        if (isNaN(ContactPerson)) {
          try {
            const docRef = await addDoc(collection(db, 'foundpets'), {
              Owner: auth.currentUser?.email,
              Type: props.route.params.Type,
              Size: props.route.params.Size,
              Limbs: props.route.params.Limbs,
              Ears: props.route.params.Ears,
              Tail: props.route.params.Tail,
              Collar: props.route.params.Collar,
              Breed: props.route.params.Breed,
              Area: Area,
              ContactNumber: ContactNumber,
              ContactPerson: ContactPerson,
              Gender: props.route.params.Gender
            })

            navigation.navigate('FoundPet5', {
              Owner: auth.currentUser?.email,
              Type: props.route.params.Type,
              Size: props.route.params.Size,
              Limbs: props.route.params.Limbs,
              Ears: props.route.params.Ears,
              Tail: props.route.params.Tail,
              Collar: props.route.params.Collar,
              Breed: props.route.params.Breed,
              Area: Area,
              ContactNumber: ContactNumber,
              ContactPerson: ContactPerson,
              Gender: props.route.params.Gender

            });
          } catch (e) {
            console.error('Error adding document: ', e);
            alert(`There was an error. Please try again or contact support`);
          }
        } else {
          alert("Please enter a valid contact name")
        }

      } else {
        alert("Please enter a valid contact number")
      }

    } else {
      alert("Contact name and number are required")
    }


  }



  return (

    <ImageBackground source={bg} style={styles.container}>

      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ChoicePage')}>
        <Image source={logo} style={styles.logo}></Image>
      </TouchableOpacity>

      <View style={styles.buttonHolder}>

        <Text style={styles.textHeading}>Last step</Text>


        <TextInput
          style={styles.inputNormal}
          onChangeText={(text) => setContactPerson(text)}
          value={ContactPerson}
          placeholder={"Contact person's name"}
        />


        <TextInput
          style={styles.inputNormal}
          onChangeText={(text) => setContactNumber(text)}
          value={ContactNumber}
          keyboardType='numbers-and-punctuation'
          placeholder={"Contact person's number"}
        />

        <Divider style={{ width: "80%", margin: 7, }} color='black' />

        {Platform.OS === 'ios' ? (
          <View style={{ width: '100%' }}>
            <Text style={styles.infoText}>Province:</Text>
            <DropDownPicker
              open={ProvinceOpen}
              value={Province}
              items={ProvinceOptions}
              setOpen={setProvinceOpen}
              setValue={setProvince}
              setItems={setProvinceOptions}
              zIndex={1000}
            />

            <Text style={styles.infoText}>City:</Text>
            <DropDownPicker
              open={CityOpen}
              value={City}
              items={CityOptions}
              setOpen={setCityOpen}
              setValue={setCity}
              setItems={setCityOptions}
              zIndex={999}
            />

            <Text style={styles.infoText}>Suburb:</Text>
            <DropDownPicker
              open={AreaOpen}
              value={Area}
              items={AreaOptions}
              setOpen={setAreaOpen}
              setValue={setArea}
              setItems={setAreaOptions}
              zIndex={998}
            />




            < TouchableOpacity style={styles.button} onPress={() => handleNext()}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: '100%' }}>

            <Text style={styles.infoText}>Province:</Text>
            <Picker
              selectedValue={Province}
              onValueChange={province => setProvince(province)}
              style={styles.picker}>
              {ProvinceOptions.map((v) => {
                return (< Picker.Item label={v.label} value={v.value} key={v.value} />);
              })}
            </Picker>

            <Text style={styles.infoText}>City:</Text>
            <Picker
              selectedValue={City}
              onValueChange={City => setCity(City)}
              style={styles.picker}>
              {CityOptions.map((v) => {
                return (< Picker.Item label={v.label} value={v.value} key={v.value} />);
              })}
            </Picker>

            <Text style={styles.infoText}>Suburb</Text>
            <Picker
              selectedValue={Area}
              onValueChange={area => setArea(area)}
              style={styles.picker}>
              {AreaOptions.map((v) => {
                return (< Picker.Item label={v.label} value={v.value} key={v.value} />);
              })}
            </Picker>

            <TouchableOpacity style={styles.button} onPress={() => handleNext()}>
              <Text style={styles.buttonText}>Save</Text>
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
    padding: '5%',
  },
  inputNormal: {
    width: '100%',
    borderWidth: 1,
    marginBottom: '2%',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
    height: 50
  },
  picker: {
    width: '100%',
    borderWidth: 1,
    marginBottom: '2%',
    textAlign: 'center',
    fontSize: 20
  },
  infoText: {
    fontSize: 22
  },
  textHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: '5%'
  }
});

export { FoundPet4 };