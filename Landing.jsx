import React, { useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ImageBackground, Image, Animated } from 'react-native';
import { auth, db } from './firebase';
import { useNavigation } from '@react-navigation/native';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import { Loader } from './Loader';
import { BackButton } from './BackButton';

import logo from './assets/mypetslogo.png'
import bg from './assets/landingpagebackground.png'

const Landing = () => {

  const navigation = useNavigation();
  const [myPets, setMyPets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [IsAddButtonExpanded, setIsAddButtonExpanded] = React.useState(false);
  const addButtonWidth = React.useRef(new Animated.Value(60)).current;
  const [bounceValue] = React.useState(new Animated.Value(0));


  useEffect(() => {


    const q = query(collection(db, 'mypets'), where('Owner', '==', auth.currentUser?.email));
    try {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        var myPetArray = []
        snapshot.forEach((doc) => {
          myPetArray.push(doc.data());
        });
        setMyPets(myPetArray)
        if (myPetArray.length == 0) {
          Animated.loop(
            Animated.sequence([
              Animated.timing(bounceValue, { toValue: 10, duration: 300, useNativeDriver: false }),
              Animated.timing(bounceValue, { toValue: 0, duration: 300, useNativeDriver: false }),
            ])
          ).start();
        }

        setLoading(false)
      });

      return unsubscribe;
    } catch (error) {
      alert('Error fetching documents: ', error);
    }


  }, [bounceValue]);


  const handleCloseButton = () => {
    // Close the expanded button only if it's already expanded
    if (IsAddButtonExpanded) {
      setIsAddButtonExpanded(false);
      Animated.timing(addButtonWidth, {
        toValue: 60, // Set the original width
        duration: 300, // Set the duration of the animation
        useNativeDriver: false,
      }).start();
    }
  };


  const handlePetSelection = (item) => {
    navigation.navigate('MyPetInfo', { pet: item })
  }

  const handleAdd = () => {
    if (IsAddButtonExpanded) {
      // If the button is expanded, call handleAdd
      navigation.navigate('AddPet1', { MyPets: myPets });
    } else {
      // If the button is not expanded, start the expansion animation
      setIsAddButtonExpanded(true);
      Animated.timing(addButtonWidth, {
        toValue: 200, // Set the desired expanded width
        duration: 300, // Set the duration of the animation
        useNativeDriver: false,
      }).start();
    }
  };

  const popUpManagement = (code) => {
    switch (code) {

      case "cancel":
        setPopupVisible(false)
        setNameVisible(false);
        setAnswersToVisible(false);
        break;

      case "firstSure":
        setPopupVisible(false);
        setNameVisible(true);
        break;

      case "nameSet":
        setNameVisible(false)
        setAnswersToVisible(true)

      case "answersToSet":
        setAnswersToVisible(false)
        alert(answersTo)

      default:
        alert("ah")
    }
  }



  return (




    <TouchableOpacity
      activeOpacity={1} // To prevent the TouchableOpacity from causing a delay in onPress
      style={{ flex: 1 }}
      onPress={handleCloseButton}
    >
      <ImageBackground source={bg} style={styles.container}>

        <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ChoicePage')}>
          <Image source={logo} style={styles.logo}></Image>
        </TouchableOpacity>

        <View style={styles.content}>

          <View style={{ width: '100%', height: '80%', alignItems: 'center' }}>
            <View style={styles.buttonHolder}>

              {loading ? (
                <Loader />
              ) : (

                <FlatList style={styles.flatlist}
                  data={myPets}
                  renderItem={({ item }) => (
                    item.Lost
                      ? <TouchableOpacity style={styles.buttonRed} onPress={() => handlePetSelection(item)}>
                        <Text style={styles.buttonText}>{item.Name}</Text>
                      </TouchableOpacity>
                      : <TouchableOpacity style={styles.buttonGreen} onPress={() => handlePetSelection(item)}>
                        <Text style={styles.buttonText}>{item.Name}</Text>
                      </TouchableOpacity>
                  )}
                  keyExtractor={item => item.Name}
                />

              )}


            </View>

          </View>
        </View>


        <Animated.View
          style={[
            styles.addButton,
            { width: addButtonWidth, transform: [{ translateY: bounceValue }] },
            IsAddButtonExpanded && { backgroundColor: '#2196F3' },
          ]}
        >
          <TouchableOpacity
            onPress={() => handleAdd()}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center', width: "100%"
            }}
          >
            {IsAddButtonExpanded ? (
              <Text style={styles.addButtonLabel}>Add a Pet</Text>
            ) : (
              <Text style={styles.addButtonLabel}>+</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Add back button */}
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }]}>
          <Text style={styles.addButtonLabel}>{'<'}</Text>
        </TouchableOpacity> */}

        <BackButton />



      </ImageBackground >
    </TouchableOpacity>


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
    borderRadius: 0,
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
    height: 60,
    borderRadius: 15
  },
  buttonRed: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: 'red',
    height: 60,
    borderRadius: 15
  },
  buttonGreen: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: '#152fa3',
    height: 60,
    borderRadius: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  flatlist: {
    width: '100%',
    height: '100%',
  },
  buttonHolder: {
    width: '100%'
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 60,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Add elevation for shadow
    overflow: 'hidden', // Hide overflow when expanded
  },
  addButtonLabel: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 60,  // Set a fixed width for the back button
    height: 60,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    overflow: 'hidden',
  },
});

export { Landing };