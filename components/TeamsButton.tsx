// components/TeamsHeaderButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TeamsHeaderButton = () => {
  const handlePress = async () => {
    const url = 'ms-teams:///';
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

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <MaterialCommunityIcons name="microsoft-teams" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
  },
});

export default TeamsHeaderButton;