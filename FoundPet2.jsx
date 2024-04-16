import React from 'react';
import { Text, StyleSheet, Platform, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

import { BackButton } from './BackButton';

import logo from './assets/foundpetlogo.png'
import bg from './assets/addpetbackground.png'

const FoundPet2 = (props) => {

  const navigation = useNavigation();

  const [Size, setSize] = React.useState("Medium")
  const [SizeOpen, setSizeOpen] = React.useState(false);
  const [SizeOptions, setSizeOptions] = React.useState([
    { label: 'Small', value: 'Small' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Large', value: 'Large' },
  ]);

  const [Collar, setCollar] = React.useState(false)
  const [CollarOpen, setCollarOpen] = React.useState(false);
  const [CollarOptions, setCollarOptions] = React.useState([
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ]);

  const [Tail, setTail] = React.useState(true)
  const [TailOpen, setTailOpen] = React.useState(false);
  const [TailOptions, setTailOptions] = React.useState([
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ]);

  const [Ears, setEars] = React.useState(2)
  const [EarsOpen, setEarsOpen] = React.useState(false);
  const [EarsOptions, setEarsOptions] = React.useState([
    { label: '1', value: 1 },
    { label: '2', value: 2 },
  ]);

  const [Limbs, setLimbs] = React.useState(4)
  const [LimbsOpen, setLimbsOpen] = React.useState(false);
  const [LimbsOptions, setLimbsOptions] = React.useState([
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ]);

  const handleNext = () => {

    if (Ears && Limbs) {
      if (Ears <= 2 && Limbs <= 4) {
        if (props.route.params.Type != "Dog" && props.route.params.Type != "Cat" && props.route.params.Type != "Bird") {
          navigation.navigate('FoundPet4', {
            Type: props.route.params.Type,
            Gender: props.route.params.Gender,

            Ears: Ears,
            Limbs: Limbs,
            Size: Size,
            Collar: Collar,
            Tail: Tail,
            Breed: `No breeds available for ${props.route.params.Type}s`
          });

        } else {
          navigation.navigate('FoundPet3', {
            Type: props.route.params.Type,
            Gender: props.route.params.Gender,

            Ears: Ears,
            Limbs: Limbs,
            Size: Size,
            Collar: Collar,
            Tail: Tail
          });
        }
      } else {
        alert("Please enter a valid number of limbs and ears")
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

        <Text style={styles.textHeading}>More Info</Text>


        {Platform.OS === 'ios' ? (
          <View style={{ width: '100%' }}>

            <Text style={styles.infoText}>Limbs</Text>
            <DropDownPicker
              open={LimbsOpen}
              value={Limbs}
              items={LimbsOptions}
              setOpen={setLimbsOpen}
              setValue={setLimbs}
              setItems={setLimbsOptions}
              zIndex={1000}
            />

            <Text style={styles.infoText}>Ears</Text>
            <DropDownPicker
              open={EarsOpen}
              value={Ears}
              items={EarsOptions}
              setOpen={setEarsOpen}
              setValue={setEars}
              setItems={setEarsOptions}
              zIndex={999}
            />
            <Text style={styles.infoText}>What size is {props.route.params.Gender == "Female" ? 'she' : 'he'}?</Text>
            <DropDownPicker
              open={SizeOpen}
              value={Size}
              items={SizeOptions}
              setOpen={setSizeOpen}
              setValue={setSize}
              setItems={setSizeOptions}
              zIndex={998}
            />

            <Text style={styles.infoText}>Does {props.route.params.Gender == "Female" ? 'she' : 'he'} wear a collar?</Text>
            <DropDownPicker
              open={CollarOpen}
              value={Collar}
              items={CollarOptions}
              setOpen={setCollarOpen}
              setValue={setCollar}
              setItems={setCollarOptions}
              zIndex={997}
            />

            <Text style={styles.infoText}>Does {props.route.params.Gender == "Female" ? 'she' : 'he'} have a tail?</Text>
            <DropDownPicker
              open={TailOpen}
              value={Tail}
              items={TailOptions}
              setOpen={setTailOpen}
              setValue={setTail}
              setItems={setTailOptions}
              zIndex={996}
            />

            < TouchableOpacity style={styles.button} onPress={() => handleNext()}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: '100%' }}>

            <Text style={styles.infoText}>Limbs</Text>
            <Picker
              selectedValue={Limbs}
              onValueChange={limbs => setLimbs(limbs)}
              style={styles.input}>
              {LimbsOptions.map((v) => {
                return (< Picker.Item label={v.label} value={v.value} key={v.value} />);
              })}
            </Picker>

            <Text style={styles.infoText}>Ears</Text>
            <Picker
              selectedValue={Ears}
              onValueChange={ears => setEars(ears)}
              style={styles.input}>
              {EarsOptions.map((v) => {
                return (< Picker.Item label={v.label} value={v.value} key={v.value} />);
              })}
            </Picker>

            <Text style={styles.infoText}>What size is {props.route.params.Gender == "Female" ? 'she' : 'he'}?</Text>
            <Picker
              selectedValue={Size}
              onValueChange={size => setSize(size)}
              style={styles.input}>
              {SizeOptions.map((v) => {
                return (< Picker.Item label={v.label} value={v.value} key={v.value} />);
              })}
            </Picker>

            <Text style={styles.infoText}>Does {props.route.params.Gender == "Female" ? 'she' : 'he'} wear a collar?</Text>
            <Picker
              selectedValue={Collar}
              onValueChange={collar => setCollar(collar)}
              style={styles.input}>
              {CollarOptions.map((v) => {
                return (< Picker.Item label={v.label} value={v.value} key={v.value} />);
              })}
            </Picker>

            <Text style={styles.infoText}>Does {props.route.params.Gender == "Female" ? 'she' : 'he'} have a tail?</Text>
            <Picker
              selectedValue={Tail}
              onValueChange={tail => setTail(tail)}
              style={styles.input}>
              {TailOptions.map((v) => {
                return (< Picker.Item label={v.label} value={v.value} key={v.value} />);
              })}
            </Picker>


            <TouchableOpacity style={styles.button} onPress={() => handleNext()}>
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
  infoText: {
    fontSize: 22
  },
  textHeading: {
    fontSize: 25,
    marginBottom: '5%',
    fontWeight: 'bold'
  }
});

export { FoundPet2 };