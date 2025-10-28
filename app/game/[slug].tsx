import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { analytics, logEvent } from '@/app/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const prefix = '..';

// Map game slugs to URLs and display names
const games = {
  'tiny-fishing': [`${prefix}/tiny-fishing`, 'Tiny Fishing'],
  'ragdoll-archers': [`${prefix}/ragdoll-archers`, 'Ragdoll Archers'],
  'subway-surfers': [`${prefix}/subway-surfers`, 'Subway Surfers'],
  'duck-clicker': [`${prefix}/duck-duck-clicker`, 'Duck Clicker'],
  'tabs': [`${prefix}/thorns-and-balloons`, 'Thorns and Balloons'],
  'bitlife': [`${prefix}/bitlife`, 'Bitlife'],
  'ovo': [`${prefix}/ovo`, 'OvO'],
  'gunspin': [`${prefix}/gunspin`, 'Gunspin'],
  'drive-mad': [`${prefix}/drive-mad`, 'Drive Mad'],
  'fnaf': [`${prefix}/fnaf`, 'FNAF'],
  'roper': [`${prefix}/roper`, 'Roper'],
  // 'Ragdoll-Hit': [`${prefix}/ragdoll-hit`, 'Ragdoll Hit'],
  'survival-race': [`https://survival-race.wasmer.app`, 'Survival Race'],
  'pens': [`${prefix}/penkick`, 'Pen Kick'],
  'darts': [`${prefix}/dartspro`, 'Darts Pro'],
  'idle-foot': [`${prefix}/idle-football`, 'Idle Football'],
  // 'Hotline-Miami': [`https://hotlinemiami.wasmer.app`, 'Hotline Miami'],
  'btd': [`${prefix}/btd5.htm`, 'BTD5'],
  'ccl': [`${prefix}/ccl.htm`, 'CCL'],
  'run3': [`${prefix}/run3`, 'Run 3'],
  'pvz': [`${prefix}/pvz`, 'PVZ'],
  'snek-left': [`${prefix}/snek-left`, 'Snek Left'],
  'spiral-roll': [`${prefix}/slice-roll`, 'Spiral Roll'],
  'tap-goal': [`${prefix}/tap-goal`, 'Tap Goal'],
  'draw-climb': [`${prefix}/draw-climber`, 'Draw Climber'],
  'flappy-bird': [`${prefix}/flappy-bird`, 'Flappy Bird'],
  'drift-boss': [`${prefix}/drift-boss`, 'Drift Boss'],
  'granny': [`${prefix}/granny.htm`, 'Granny'],
  'swoop': [`${prefix}/swoop.htm`, 'Swoop'],
  'sharkio': [`${prefix}/sharkio`, 'Shark.io'],
  'fast-runner': [`${prefix}/fast-runner`, 'Fast Runner'],
  // '': [`${prefix}/`, ''],
};

export default function GameScreen() {
  const { slug } = useLocalSearchParams();
  const gameUrl = typeof slug === 'string' ? games[slug]?.[0] : null;
  const displayName = typeof slug === 'string' ? games[slug]?.[1] ?? slug.replace(/-/g, ' ') : '';

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
      <Stack.Screen options={{ title: displayName }} />
      <iframe
        src={gameUrl}
        style={styles.iframe}
        title={displayName}
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