import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { analytics, logEvent } from '@/app/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const prefix = '..';

// Map game slugs to URLs
const games = {
  'Clash': `${prefix}/clash-royale`,
  'Tiny-Fishing': `${prefix}/tiny-fishing`,
  'Ragdoll-Archers': `${prefix}/ragdoll-archers`,
  'Subway-Surfers': `${prefix}/subway-surfers`,
  'Duck-Duck-Clicker': `${prefix}/duck-duck-clicker`,
  'Thorns-and-Balloons': `${prefix}/thorns-and-balloons`,
  'BitLife': `${prefix}/bitlife`,
  'OvO': `${prefix}/ovo`,
  'GunSpin': `${prefix}/gunspin`,
  'Drive-Mad': `${prefix}/drive-mad`,
  'FNaF-1': `${prefix}/fnaf/1`,
  'Roper': `${prefix}/roper`,
  // 'Ragdoll-Hit': `${prefix}/ragdoll-hit`,
  'Survival-Race': `https://survival-race.wasmer.app`,
  'Pen-Kick': `${prefix}/penkick`,
  'Darts-Pro': `${prefix}/dartspro`,
  'SL': `${prefix}/fnaf/sl`,
  'UCN': `${prefix}/fnaf/ucn`,
  'Awesome-Tanks-2': `${prefix}/at2`,
  'Golf-Champs': `${prefix}/golf-champs`,
  'Idle-Football': `${prefix}/idle-football`,
  'Hotline-Miami': `https://hotlinemiami.wasmer.app`,
  'BTD-5': `${prefix}/btd5.htm`,
  'Crazy-Crash-Landing': `${prefix}/ccl.htm`,
  'Run-3': `${prefix}/run3`,
  'Plants-VS-Zombies': `${prefix}/pvz`,
  'Snek-Left': `${prefix}/snek-left`,
  'FNaF-2': `${prefix}/fnaf/2`,
  'FNaF-3': `${prefix}/fnaf/3`,
  'FNaF-4': `${prefix}/fnaf/4`,
  'FNaF-Pizzeria-Simulator': `${prefix}/fnaf/ps`,
  'FNaF-World': `${prefix}/fnaf/w`,
  // '': `${prefix}/`,
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
      <Stack.Screen options={{ title: slug.replace(/-/g, ' ') }} />
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