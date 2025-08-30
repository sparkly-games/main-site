import { Text, View, StyleSheet } from "react-native";
import { Game } from '@/components/Game';
import { gameIcons } from '@/assets/images/GameIcons';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Hub</Text>
      <View style={styles.gameList}>
        <Game
          name="Tiny Fishing"
          imageSource={gameIcons['tiny fishing']}
          onPress={() => router.push('/game/tiny-fishing')}
        />
        <Game
          name="Ragdoll Archers"
          imageSource={gameIcons['ragdoll archers']}
          onPress={() => router.push('/game/ragdoll-archers')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#202020',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  gameList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
