import React, { useEffect } from 'react';
import { Text, StyleSheet, Platform, TouchableOpacity, View, ImageBackground, Image, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed';

import DropDownPicker from 'react-native-dropdown-picker';
import geographicData from './geographicData.json';

import logo from './assets/addapetlogo.png'
import bg from './assets/addpetbackground.png'

const AddPet4 = (props) => {

  const navigation = useNavigation();

  const [Other, setOther] = React.useState("")
  const [ContactPerson, setContactPerson] = React.useState(null)
  const [ContactNumber, setContactNumber] = React.useState(null)

  //TODO: FIX THE MULTILINE SITUATION

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

    var ContactNumberCurrent = ContactNumber;

    if (ContactNumberCurrent.startsWith("+27")) {
      ContactNumberCurrent = "0" + ContactNumberCurrent.slice(3);
    } else if (ContactNumberCurrent.startsWith("27")) {
      ContactNumberCurrent = "0" + ContactNumberCurrent.slice(2);
    }

    // Check if ContactNumber consists of valid numbers
    for (var i = 0; i < ContactNumberCurrent.length; i++) {
      if (isNaN(parseInt(ContactNumberCurrent[i]))) {
        return false;
      }
    }

    // Check if ContactNumber has a valid length
    if (ContactNumberCurrent.length !== 10) {
      return false;
    } else {
      setContactNumber(ContactNumberCurrent);
      return true;
    }
  };


  const handleNext = () => {


    if (ContactPerson && ContactNumber) {

      if (ContactNumberVaild()) {
        if (isNaN(ContactPerson)) {
          navigation.navigate('AddPet5', {
            AnswersTo: props.route.params.AnswersTo,
            Colour: props.route.params.Colour,
            Name: props.route.params.Name,
            Type: props.route.params.Type,
            Gender: props.route.params.Gender,

            Ears: props.route.params.Ears,
            Limbs: props.route.params.Limbs,
            Size: props.route.params.Size,
            Collar: props.route.params.Collar,
            Tail: props.route.params.Tail,

            Breed: props.route.params.Breed,
            Other: Other,
            Area: Area,
            ContactPerson: ContactPerson,
            ContactNumber: ContactNumber

          });
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

        <Text style={styles.textHeading}>Second last step</Text>

        <TextInput
          style={styles.input}
          multiline
          onChangeText={(text) => setOther(text)}
          value={Other}
          placeholder={"Any defining trait or extra information that may help someone identify your pet"}
        />

        <Divider style={{ width: "80%", margin: 7, }} color='black' />

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
              <Text style={styles.buttonText}>Next</Text>
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
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}




      </View>


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
    height: 100,
    borderWidth: 1,
    marginBottom: '2%',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
    height: 100,
    padding: '2%'
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
    marginBottom: '5%',
    fontWeight: 'bold'
  }
});


export { AddPet4 };