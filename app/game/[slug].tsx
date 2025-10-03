import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

const prefix = '..';

// This object maps the game slug to the relative URL of your game's HTML file.
// Place your game folders (e.g., 'tiny-fishing/') inside the 'public' directory at the root of your project.
const games = {
  '0': `${prefix}/clash-royale`,
  '1': `${prefix}/tiny-fishing`,
  '2': `${prefix}/ragdoll-archers`,
  '3': `${prefix}/subway-surfers`,
  '4': `${prefix}/duck-duck-clicker`,
  '5': `${prefix}/thorns-and-balloons`,
  '6': `${prefix}/bitlife`,
  '7': `${prefix}/ovo`,
  '8': `${prefix}/gunspin`,
  '9': `${prefix}/drive-mad`,
  'a': `${prefix}/fnaf/1`,
  'b': `${prefix}/roper`,
  'c': `${prefix}/ragdoll-hit`,
  'd': `${prefix}/survival-race`,
  'e': `${prefix}/penkick`,
  'f': `${prefix}/8bp`
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