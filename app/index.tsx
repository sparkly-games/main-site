import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Game } from '@/components/Game';
import { gameIcons } from '@/assets/images/GameIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Index() {
  const router = useRouter();
  const [expandedNotices, setExpandedNotices] = useState<{ [key: string]: boolean }>({});

  const notices = [
    {
      id: 'maintenance',
      title: 'Scheduled Maintenance',
      message: 'Server maintenance will be performed on Friday, September 20th from 2:00 AM to 4:00 AM EST. Some games may be temporarily unavailable during this time.',
    },
    {
      id: 'newgames',
      title: 'New Games Added',
      message: 'We\'ve added three new exciting games to our collection! Check out the latest additions and enjoy hours of entertainment.',
    },
    {
      id: 'update',
      title: 'App Update Available',
      message: 'Version 2.1.0 is now available with improved performance, bug fixes, and enhanced user experience. Update now for the best gaming experience.',
    },
  ];

  const toggleNotice = (noticeId: string) => {
    setExpandedNotices(prev => ({
      ...prev,
      [noticeId]: !prev[noticeId]
    }));
  };

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
        <Game
          name="Subway Surfers"
          imageSource={gameIcons['subway surfers']}
          onPress={() => router.push('/game/subway-surfers')}
        />
        <Game
          name="Clash Royale"
          imageSource={gameIcons['clash royale']}
          onPress={() => router.push('/game/clash-royale')}
        />
        <Game
          name="Duck Duck Clicker"
          imageSource={gameIcons['duck-duck-clicker']}
          onPress={() => router.push('/game/duck-duck-clicker')}
        />
        <Game
          name="Thorns and Balloons"
          imageSource={gameIcons['thorns and balloons']}
          onPress={() => router.push('/game/thorns-and-balloons')}
        />
      </View>
      
      <View style={styles.noticesSection}>
        <Text style={styles.noticesTitle}>Notices</Text>
        {notices.map((notice) => (
          <View key={notice.id} style={styles.noticeItem}>
            <TouchableOpacity
              style={styles.noticeHeader}
              onPress={() => toggleNotice(notice.id)}
            >
              <Text style={styles.noticeHeaderText}>{notice.title}</Text>
              <Text style={styles.dropdownArrow}>
                {expandedNotices[notice.id] ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>
            {expandedNotices[notice.id] && (
              <View style={styles.noticeContent}>
                <Text style={styles.noticeMessage}>{notice.message}</Text>
              </View>
            )}
          </View>
        ))}
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
  noticesSection: {
    width: '90%',
    maxWidth: 600,
    marginTop: 30,
    marginBottom: 20,
  },
  noticesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  noticeItem: {
    backgroundColor: '#333333',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#444444',
  },
  noticeHeaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  dropdownArrow: {
    color: 'white',
    fontSize: 12,
    marginLeft: 10,
  },
  noticeContent: {
    padding: 15,
    backgroundColor: '#333333',
  },
  noticeMessage: {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 20,
  },
});
