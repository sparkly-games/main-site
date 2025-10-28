import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Game } from '@/components/Game';

interface RemoteNotice {
  name: string;
  info: string;
  noticeDetails: string;
  end: number;
}

const errorNoticesUrl = 'https://raw.githubusercontent.com/onlinegames19/main-site/main/errors.md';

const parseNotices = (rawText: string): RemoteNotice[] => {
  return rawText
    .split('---')
    .filter(block => block.trim())
    .map(block => {
      const data: any = {};
      block.trim().split('\n').forEach(line => {
        const [key, ...rest] = line.split(':');
        if (!key || !rest.length) return;
        const value = rest.join(':').trim().replace(/^['"]|['"]$/g, '');
        if (['name', 'info', 'noticeDetails'].includes(key)) data[key] = value;
        if (key === 'end') data.end = parseInt(value, 10);
      });
      return data as RemoteNotice;
    })
    .filter(n => n.name && n.info && n.noticeDetails && !isNaN(n.end));
};

const NewGameBadge = ({ disappear_after }: { disappear_after: number }) => {
  const year = 2000 + Math.floor(disappear_after / 1000000);
  const month = Math.floor((disappear_after % 1000000) / 10000) - 1;
  const day = Math.floor((disappear_after % 10000) / 100);
  const hour = disappear_after % 100;
  const disappearTime = new Date(year, month, day, hour).getTime();

  if (Date.now() >= disappearTime) return null;
  return <Text style={styles.newBadge}>New!</Text>;
};

export default function Index() {
  const router = useRouter();
  const [activeNotice, setActiveNotice] = useState<RemoteNotice | null>(null);
  const [showHorror, setShowHorror] = useState(false);

  const gameGo = (path: string) => router.push(`/game/${path.replace(/ /g, '-')}`);

  const fetchAndFilterNotices = async () => {
    try {
      const response = await fetch(errorNoticesUrl);
      if (!response.ok) throw new Error('Network error');
      const allNotices = parseNotices(await response.text());
      const now = Date.now();
      setActiveNotice(allNotices.find(n => n.end * 1000 > now) || null);
    } catch {
      setActiveNotice(null);
    }
  };

  useEffect(() => { fetchAndFilterNotices(); }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={require('@/assets/images/og12_logo_banner.png')} style={styles.banner} />

        {activeNotice && (
          <View style={styles.notice}>
            <Text style={styles.noticeTitle}>{activeNotice.name}</Text>
            <Text style={styles.noticeInfo}>{activeNotice.info}</Text>
            <Text style={styles.noticeDetails}>
              <Text style={{ fontWeight: 'bold' }}>Dates: </Text>{activeNotice.noticeDetails}
            </Text>
            <Text style={styles.noticeTimestamp}>
              Ends: {new Date(activeNotice.end * 1000).toLocaleDateString()}
            </Text>
          </View>
        )}

        <Text style={styles.title}>🎮 Our Games 🎮</Text>
        <View style={styles.gameList}>
          <View style={{ position: 'relative' }}>
            <Game name="BitLife" imageSource="6" onPress={() => gameGo('bitlife')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="BTD 5" imageSource="m" onPress={() => gameGo('btd')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="CCL" imageSource="n" onPress={() => gameGo('ccl')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Darts Pro" imageSource="f" onPress={() => gameGo('darts')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Draw Climber" imageSource="g" onPress={() => gameGo('draw climb')} />
            <NewGameBadge disappear_after={25110615} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Drift Boss" imageSource="w" onPress={() => gameGo('drift boss')} />
            <NewGameBadge disappear_after={25110615} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Drive Mad" imageSource="9" onPress={() => gameGo('drive mad')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="DDC" imageSource="4" onPress={() => gameGo('duck clicker')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Fast Runner" imageSource="t" onPress={() => gameGo('fast runner')} />
            <NewGameBadge disappear_after={25110615} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Flappy Bird" imageSource="h" onPress={() => gameGo('flappy bird')} />
            <NewGameBadge disappear_after={25110615} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="GunSpin" imageSource="8" onPress={() => gameGo('gunspin')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Idle Football" imageSource="k" onPress={() => gameGo('idle foot')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Penalty Kick" imageSource="e" onPress={() => gameGo('pens')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="PvZ" imageSource="p" onPress={() => gameGo('pvz')} />
            <NewGameBadge disappear_after={25110615} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Ragdoll Archers" imageSource="2" onPress={() => gameGo('ragdoll archers')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Roper" imageSource="b" onPress={() => gameGo('roper')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Run 3" imageSource="o" onPress={() => gameGo('run3')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="SharkIO" imageSource="s" onPress={() => gameGo('sharkio')} />
            <NewGameBadge disappear_after={25110615} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Snek Left (⚠︎)" imageSource="q" onPress={() => gameGo('snek left')} />
            <NewGameBadge disappear_after={25110615} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Spiral Roll" imageSource="i" onPress={() => gameGo('spiral roll')} />
            <NewGameBadge disappear_after={25110615} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Subway Surfers" imageSource="3" onPress={() => gameGo('subway surfers')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Survival Race" imageSource="d" onPress={() => gameGo('survival race')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Swoop!" imageSource="r" onPress={() => gameGo('swoop')} />
            <NewGameBadge disappear_after={25110615} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Tap Goal" imageSource="v" onPress={() => gameGo('tap goal')} />
            <NewGameBadge disappear_after={25110615} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Thorns and Balloons" imageSource="5" onPress={() => gameGo('tabs')} />
          </View>
          <View style={{ position: 'relative' }}>
            <Game name="Tiny Fishing" imageSource="1" onPress={() => gameGo('tiny fishing')} />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setShowHorror(!showHorror)}>
          <Text style={styles.buttonText}>{showHorror ? 'Hide Horror' : 'Show Horror'}</Text>
        </TouchableOpacity>

        {showHorror && (
          <>
            <Text style={styles.noticeTitle}>🎃 Horror Games 🎃</Text>
            <View style={styles.gameList}>
              <View style={{ position: 'relative' }}>
                <Game name="Granny" imageSource="j" onPress={() => gameGo('granny')} />
                <NewGameBadge disappear_after={25110615} />
              </View>
              <View style={{ position: 'relative' }}>
                <Game name="FnaF (⚠︎)" imageSource="a" onPress={() => gameGo('fnaf')} />
                <NewGameBadge disappear_after={25110615} />
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <code style={{ margin: 10, color: 'white' }}>v6.0.0 (wsvoko)</code>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2b2b2bff' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
  banner: { width: '90%', maxWidth: 600, height: 200, marginBottom: 20, borderRadius: 10 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  gameList: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  notice: { width: '90%', backgroundColor: 'rgba(74, 168, 255, 1)', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 2, borderColor: 'rgba(135,189,229,1)', maxWidth: 600 },
  noticeTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  noticeInfo: { color: 'white', fontSize: 14, marginBottom: 8, textAlign: 'center' },
  noticeDetails: { color: 'white', fontSize: 14, paddingTop: 5, borderTopWidth: 1, borderTopColor: 'rgba(135,189,229,0.3)' },
  noticeTimestamp: { color: 'white', fontSize: 12, marginTop: 5, textAlign: 'right' },
  button: { backgroundColor: 'rgba(135,189,229,1)', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  newBadge: { position: 'absolute', height: 30, alignContent: 'center', top: 5, right: 5, backgroundColor: 'rgba(135,189,229,1)', color: 'white', fontWeight: '600', fontSize: 10, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 6, textTransform: 'uppercase' },
});