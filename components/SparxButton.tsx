// components/TeamsHeaderButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet, Linking, Alert, Image } from 'react-native';

const SparxHeaderButton = () => {
  const handlePressMain = async () => {
    const url = 'https://sparx-learning.com/';
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
  const handlePressSeneca = async () => {
    const url = 'https://app.senecalearning.com/dashboard/assignments/todo';
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
      Alert.alert('Error', 'Could not open Seneca.');
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
    <TouchableOpacity onPress={handlePressMain} style={styles.button}>
       <Image source={{uri: 'https://sparx-learning.com/favicons/apple-touch-icon.png'}} style={{ width: 30, height: 30 }} />
    </TouchableOpacity>
    <TouchableOpacity onPress={handlePressSeneca} style={styles.button}>
       <Image source={{uri: 'https://senecalearning.com/icons/icon-512x512.png'}} style={{ width: 30, height: 30 }} />
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