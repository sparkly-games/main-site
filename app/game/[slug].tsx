import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { analytics, logEvent } from '@/app/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const prefix = '..';

// Map game slugs to URLs
const games = {
  'clash': `${prefix}/clash-royale`,
  'tiny-fishing': `${prefix}/tiny-fishing`,
  'ragdoll-archers': `${prefix}/ragdoll-archers`,
  'subway-surfers': `${prefix}/subway-surfers`,
  'duck-duck-clicker': `${prefix}/duck-duck-clicker`,
  'thorns-and-balloons': `${prefix}/thorns-and-balloons`,
  'bitlife': `${prefix}/bitlife`,
  'ovo': `${prefix}/ovo`,
  'gunspin': `${prefix}/gunspin`,
  'drive-mad': `${prefix}/drive-mad`,
  'fnaf-1': `${prefix}/fnaf/1`,
  'roper': `${prefix}/roper`,
  'ragdoll-hit': `${prefix}/ragdoll-hit`,
  'survival-race': `https://survival-race.wasmer.app`,
  'penkick': `${prefix}/penkick`,
  'darts-pro': `${prefix}/dartspro`,
  'sl': `${prefix}/fnaf/sl`,
  'ucn': `${prefix}/fnaf/ucn`,
  'awesome-tanks': `${prefix}/at2`,
  'golf-champs': `${prefix}/golf-champs`,
  'idle-football': `${prefix}/idle-football`,
  'hotline-miami': `${prefix}/hotlinemiami`,
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