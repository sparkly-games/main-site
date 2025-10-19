// components/TeamsHeaderButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet, Linking, Alert, Image } from 'react-native';

const SparxHeaderButton = () => {
  const handlePressMaths = async () => {
    const url = 'https://sparxmaths.uk/';
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
      Alert.alert('Error', 'Could not open Sparx.');
    }
  };
  const handlePressReader = async () => {
    const url = 'https://reader.sparx-learning.com/';
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
      Alert.alert('Error', 'Could not open Sparx.');
    }
  };
  const handlePressScience = async () => {
    const url = 'https://science.sparx-learning.com/';
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
      Alert.alert('Error', 'Could not open Sparx.');
    }
  };
  const handlePressEDU = async () => {
    const url = 'https://edulinkone.com/';
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
      Alert.alert('Error', 'Could not open Edulink One.');
    }
  };

  return (
    <>
    <TouchableOpacity onPress={handlePressMaths} style={styles.button}>
       <Image source={{uri: 'https://sparxmaths.com/favicon.ico'}} style={{ width: 30, height: 30 }} />
    </TouchableOpacity>
    <TouchableOpacity onPress={handlePressReader} style={styles.button}>
       <Image source={{uri: 'https://sparxreader.com/favicon.ico'}} style={{ width: 30, height: 30 }} />
    </TouchableOpacity>
    <TouchableOpacity onPress={handlePressScience} style={styles.button}>
       <Image source={{uri: 'https://sparxscience.com/favicon.ico'}} style={{ width: 30, height: 30 }} />
    </TouchableOpacity>
    <TouchableOpacity onPress={handlePressEDU} style={styles.button}>
       <Image source={{uri: 'https://edulinkone.com/favicon.ico'}} style={{ width: 30, height: 30 }} />
    </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
  },
});

export default SparxHeaderButton;