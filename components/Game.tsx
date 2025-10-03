import React from 'react';
import { Text, View, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

/**
 * Game component displays a game icon and its name.
 * @param {string} name - The name of the game.
 * @param {ImageSourcePropType} imageSource - The source of the image to display.
 * @param {() => void} onPress - A function to call when the play button is pressed.
 */
export function Game({ name, imageSource, onPress }: { name: string; imageSource: ImageSourcePropType; onPress: () => void }) {
  if (!imageSource) {
    console.error(`Error: No image source provided for game name "${name}"`);
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.container}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    margin: 10,
  },
  container: {
    alignItems: 'center',
    padding: 15,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});