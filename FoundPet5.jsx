import React, { useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ImageBackground, Image, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { auth, db } from './firebase';

import { Loader } from './Loader';

import logo from './assets/foundpetlogo.png'
import bg from './assets/addpetbackground.png'

const FoundPet5 = (props) => {

  const [Options, setOptions] = React.useState([])
  const [random, setRandom] = React.useState()
  const [Loading, setLoading] = React.useState(false)
  const [CurrentLevel, setCurrentLevel] = React.useState(0)
  const [Gender, setGender] = React.useState("")

  const navigation = useNavigation();

  useEffect(() => {
    getLevel1();
  }, []);

  const getLevel1 = () => {
    setLoading(true);
    var q = null;
    if (props.route.params.Gender == "Unsure") {
      q = query(collection(db, 'mypets'),
        where('Area', '==', props.route.params.Area),
        where('Type', '==', props.route.params.Type),
        where('Limbs', '==', props.route.params.Limbs),
        where('Ears', '==', props.route.params.Ears),
        where('Size', '==', props.route.params.Size),
        where('Lost', '==', true)
      );
    } else {
      q = query(collection(db, 'mypets'),
        where('Area', '==', props.route.params.Area),
        where('Type', '==', props.route.params.Type),
        where('Gender', '==', props.route.params.Gender),
        where('Limbs', '==', props.route.params.Limbs),
        where('Ears', '==', props.route.params.Ears),
        where('Size', '==', props.route.params.Size),
        where('Lost', '==', true)
      );
    }

    try {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        var myPetArray = []

        snapshot.forEach((doc) => {
          myPetArray.push(doc.data());

        });
        setOptions(myPetArray)
        setCurrentLevel(1)
        

        if (myPetArray.length == 0) {
          getLevel2()
        }else if (myPetArray.length == 1){
          
          myPetArray.push({
            //Name: "Other",
            //ImageUrl: "https://firebasestorage.googleapis.com/v0/b/pet-finder-76ee7.appspot.com/o/other3.jpg?alt=media&token=aa699fd2-db1f-4922-8c43-76e38628475b"
          })
          setOptions(myPetArray)
          console.log(Options)
        }

        setLoading(false)
      });



      return unsubscribe;
    } catch (error) {
      alert('Error fetching documents: ', error);
    }


  }

  const getLevel2 = () => {
    setLoading(true);
    var q = null;
    if (props.route.Gender == "Unsure") {
      q = query(collection(db, 'mypets'),
        where('Area', '==', props.route.params.Area),
        where('Type', '==', props.route.params.Type),
        where('Limbs', '==', props.route.params.Limbs),
        where('Ears', '==', props.route.params.Ears),
        where('Lost', '==', true)

      );

    } else {
      q = query(collection(db, 'mypets'),
        where('Area', '==', props.route.params.Area),
        where('Type', '==', props.route.params.Type),
        where('Limbs', '==', props.route.params.Limbs),
        where('Ears', '==', props.route.params.Ears),
        where('Gender', '==', props.route.params.Gender),
        where('Lost', '==', true)

      );

    }

    try {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        var myPetArray = []
        snapshot.forEach((doc) => {
          myPetArray.push(doc.data());
        });
        setOptions(myPetArray)
        setCurrentLevel(2)
        

        if (myPetArray.length == 0) {
          getLevel3()
        }else if (myPetArray.length == 1){
          
          myPetArray.push({
            //Name: "Other",
            //ImageUrl: "https://firebasestorage.googleapis.com/v0/b/pet-finder-76ee7.appspot.com/o/other3.jpg?alt=media&token=aa699fd2-db1f-4922-8c43-76e38628475b"
          })
          setOptions(myPetArray)
          console.log(Options)
        }

        setLoading(false)
      });

      return unsubscribe;
    } catch (error) {
      alert('Error fetching documents: ', error);
    }


  }

  const getLevel3 = () => {
    setLoading(true);
    var q = null;
    if (props.route.Gender == "Unsure") {
      q = query(collection(db, 'mypets'),
        where('Type', '==', props.route.params.Type),
        where('Limbs', '==', props.route.params.Limbs),
        where('Lost', '==', true)

      );
    } else {
      q = query(collection(db, 'mypets'),
        where('Type', '==', props.route.params.Type),
        where('Limbs', '==', props.route.params.Limbs),
        where('Gender', '==', props.route.params.Gender),
        where('Lost', '==', true)

      );
    }

    try {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        var myPetArray = []
        snapshot.forEach((doc) => {
          myPetArray.push(doc.data());
        });
        setOptions(myPetArray)
        setCurrentLevel(3)
        setLoading(false)

        if (myPetArray.length == 0) {
          alert("Unfortunately, there are no more pets that match your description. But we'll save your info incase someone logs a missing pet with a matching description")
          navigation.navigate('ChoicePage')
        }else if (myPetArray.length == 1){
          
          myPetArray.push({
            //Name: "Other",
            //ImageUrl: "https://firebasestorage.googleapis.com/v0/b/pet-finder-76ee7.appspot.com/o/other3.jpg?alt=media&token=aa699fd2-db1f-4922-8c43-76e38628475b"
          })
          setOptions(myPetArray)
        }

        setLoading(false)
      });

      return unsubscribe;
    } catch (error) {
      alert('Error fetching documents: ', error);
    }


  }

  const handleMore = () => {
    if (CurrentLevel == 1) {
      getLevel2()
    } else if (CurrentLevel == 2) {
      getLevel3()
    } else if (CurrentLevel == 3) {
      alert("Unfortunately, those are all the pets that match your description. But we'll save your info incase someone logs a missing pet with a matching description")
      navigation.navigate('ChoicePage')
    }
  }

  const handleSelect = (item) => {
    navigation.navigate('FoundPetInfo', {
      pet: item,
      foundPet: {
        Owner: auth.currentUser?.email,
        Type: props.route.params.Type,
        Size: props.route.params.Size,
        Limbs: props.route.params.Limbs,
        Ears: props.route.params.Ears,
        Tail: props.route.params.Tail,
        Collar: props.route.params.Collar,
        Breed: props.route.params.Breed,
        Area: props.route.params.Area,
        ContactNumber: props.route.params.ContactNumber,
        ContactPerson: props.route.params.ContactPerson,
        Gender: props.route.params.Gender
      }
    })
  }



  return (
    <ImageBackground source={bg} style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ChoicePage')}>
        <Image source={logo} style={styles.logo}></Image>
      </TouchableOpacity>

      <View style={styles.buttonHolder}>
        <Text style={styles.textHeading}>Select a pet</Text>
        <Text style={styles.textSubHeading}>(These are the lost pets that match your description)</Text>

        {Loading ? (
          <Loader />
        ) : (
          <>
            <FlatList
              data={Options}
              extraData={random}
              renderItem={({ item }) => (
                <Pressable style={styles.card} onPress={() => handleSelect(item)}>
                  <ImageBackground
                    imageStyle={{ resizeMode: 'cover', height: '100%', width: '100%' }}
                    style={styles.itemContainer}
                    source={{ uri: item.ImageUrl }}
                  >
                    <View style={styles.itemContent}>
                      <Text style={styles.itemName}>{item.Name}</Text>
                    </View>
                  </ImageBackground>
                </Pressable>
              )}
              contentContainerStyle={styles.list}
              numColumns={2}
              columnWrapperStyle={styles.column}
              style={{ height: '55%' }}
            />

            <TouchableOpacity style={styles.button} onPress={() => handleMore()}>
              <Text style={styles.buttonText}>View More</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
};


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
    borderRadius: 0,
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
    margin: 0,
    paddingTop: 0,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: '#152fa3',
    height: 40,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
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
  },
  textSubHeading: {
    fontSize: 15,
    marginBottom: '5%',
  },
  itemContainer: {
    borderRadius: 5,
    height: 150,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
  itemContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 3,
    marginBottom: 5
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

export { FoundPet5 };