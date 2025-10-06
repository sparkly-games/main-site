import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { analytics, logEvent } from '@/app/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const prefix = '..';

// Map game slugs to URLs
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
  'd': `https://survival-race.wasmer.app`,
  'e': `${prefix}/penkick`,
  'f': `${prefix}/dartspro`,
};

export default function GameScreen() {
  const { slug } = useLocalSearchParams();
  const gameUrl = typeof slug === 'string' ? games[slug] : null;

  useEffect(() => {
    if (!gameUrl || !analytics) return;

    const logGame = async () => {
      const id = uuidv4();
      const timestamp = new Date().toISOString();
      logEvent(analytics, 'game', {
        id,
        time: timestamp,
        slug,
        gameUrl,
        path: gameUrl ? new URL(gameUrl, window.location.origin).pathname : null
      });
    };

    logGame();
  }, [slug, gameUrl]);

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
  container: { flex: 1, width: '100%', height: '100%' },
  iframe: { flex: 1, width: '100%', height: '100%', borderWidth: 0 },
  errorText: { fontSize: 20, color: 'red', textAlign: 'center', marginTop: 50 },
});