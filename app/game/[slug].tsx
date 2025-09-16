import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

// This object maps the game slug to the relative URL of your game's HTML file.
// Place your game folders (e.g., 'tiny-fishing/') inside the 'public' directory at the root of your project.
const games = {
  'tiny-fishing': '/tiny-fishing/index.html',
  'ragdoll-archers': '/ragdoll-archers/index.html',
  'subway-surfers': '/subway-surfers/index.html',
  'clash-royale': '/clash-royale/index.html',
  'duck-duck-clicker': '/duck-duck-clicker/index.html',
  'thorns-and-balloons': '/thorns-and-balloons/index.html'
};

export default function GameScreen() {
  const { slug } = useLocalSearchParams();
  const gameUrl = typeof slug === 'string' ? games[slug] : null;

  if (!gameUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Game not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: slug.replace(/-/g, ' ').toUpperCase() }} />
      <iframe
        src={gameUrl}
        style={styles.iframe}
        title={slug.replace(/-/g, ' ')}
        allowFullScreen={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  iframe: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderWidth: 0,
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});
