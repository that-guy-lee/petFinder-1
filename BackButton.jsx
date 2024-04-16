import React, { useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ImageBackground, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {

  const navigation = useNavigation();
  


  return (

    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }]}>
      <Text style={styles.addButtonLabel}>{'<'}</Text>
    </TouchableOpacity>




  );





}


const styles = StyleSheet.create({

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

export { BackButton };