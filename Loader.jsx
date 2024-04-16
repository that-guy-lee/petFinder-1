import React, { useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ImageBackground, Image, Alert, useState, Animated, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';

const Loader = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#152fa3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export { Loader };