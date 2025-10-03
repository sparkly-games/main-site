import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

const prefix = '..';

// This object maps the game slug to the relative URL of your game's HTML file.
// Place your game folders (e.g., 'tiny-fishing/') inside the 'public' directory at the root of your project.
const games = {
  'tiny-fishing': `${prefix}/tiny-fishing/index.html`,
  'ragdoll-archers': `${prefix}/ragdoll-archers/index.html`,
  'subway-surfers': `${prefix}/subway-surfers/index.html`,
  'clash-royale': `${prefix}/clash-royale/index.html`,
  'duck-duck-clicker': `${prefix}/duck-duck-clicker/index.html`,
  'thorns-and-balloons': `${prefix}/thorns-and-balloons/index.html`,
  'bitlife': `${prefix}/bitlife/index.html`,
  'ovo': `${prefix}/ovo/index.html`,
  'gunspin': `${prefix}/gunspin/index.html`,
  'drive-mad': `${prefix}/drive-mad/index.html`,
  // 'fnaf-1': `${prefix}/fnaf/1/index.html`,
  // 'fnaf-2': `${prefix}/fnaf/2/index.html`,
  // 'fnaf-3': `${prefix}/fnaf/3/index.html`,
  // 'fnaf-4': `${prefix}/fnaf/4/index.html`,
  // 'fnaf-w': `${prefix}/fnaf/w/index.html`,
  // 'fnaf-sl': `${prefix}/fnaf/sl/index.html`,
  // 'fnaf-ps': `${prefix}/fnaf/ps/index.html`,
  // 'fnaf-ucn': `${prefix}/fnaf/ucn/index.html`,
  'roper': `${prefix}/roper/index.html`,
  'ragdoll-hit': `${prefix}/ragdoll-hit/index.html`,
  'survival-race': `${prefix}/survival-race/index.html`,
  'pen-kick': `${prefix}/penkick/index.html`
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