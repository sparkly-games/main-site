// components/TeamsHeaderButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet, Linking, Alert, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TeamsHeaderButton = () => {
  const handlePress = async () => {
    const url = 'msteams://';
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        // Fallback for when the app is not installed
        Alert.alert(
          "Teams Not Found",
          "The Microsoft Teams app is not installed on your device. Would you like to open it in your browser?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Open in Browser",
              onPress: () => Linking.openURL('https://teams.microsoft.com')
            }
          ]
        );
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
      Alert.alert('Error', 'Could not open Microsoft Teams.');
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
    const bugReportButton = async () => {
      const url = '/bugreport';
      try {
        const supported = await Linking.canOpenURL(url);
  
        if (supported) {
          await Linking.openURL(url);
        }
      } catch (error) {
        console.error('Failed to open URL:', error);
        Alert.alert('Error', 'Could not open Bug Report.');
      }
    };

  return (<>
    <TouchableOpacity onPress={handlePress} style={styles.button}>
       <Image source={{uri: 'https://teams.microsoft.com/favicon.ico'}} style={{ width: 30, height: 30 }} />
    </TouchableOpacity>
    <TouchableOpacity onPress={handlePressSeneca} style={styles.button}>
       <Image source={{uri: 'https://senecalearning.com/icons/icon-512x512.png'}} style={{ width: 30, height: 30 }} />
    </TouchableOpacity>
    <TouchableOpacity onPress={bugReportButton} style={styles.button}>
       <Image source={require("@/assets/images/bugReport.png")} style={{ width: 30, height: 30 }} />
    </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
  },
});

export default TeamsHeaderButton;