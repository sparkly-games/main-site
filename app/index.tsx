import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Game } from '@/components/Game';
import { gameIcons } from '@/assets/images/GameIcons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import Markdown from 'react-native-markdown-display';

export default function Index() {
  const router = useRouter();
  const [expandedNotices, setExpandedNotices] = useState<{ [key: string]: boolean }>({});
  const [changelogContent, setChangelogContent] = useState<string>('');
  const [showChangelog, setShowChangelog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // You can change this URL to point to your own GitHub markdown file
  const changelogUrl = 'https://raw.githubusercontent.com/onlinegames19/onlinegames19.github.io/main/CHANGELOG.md';

  const notices = [
    {
      id: 'game-information',
      title: 'Game Info',
      message: `
      Thorns and Balloons: The game currently has no sound. [TD;LR]
      Tiny Fishing: Before May 2024 update. (No fish after purple seahorse) [TD;LR]
      Bitlife: Untested. [TD;LR]
      Happy Wheels: Untested. [TD;LR]
      Gunspin: May open blocked tabs periodically. [TD;LR]
      `,
    },
    {
      id: 'temporary-removals',
      title: 'Temporary Removals',
      message: `
      The following games will be temporarily removed due to size constraints. We are working hard to bring them back, faster and smaller than ever.
      - BitLife
      - GunSpin

      Some games have been permanently removed:
      - Happy Wheels
      - Crazy Crash Landing
      - FnaF 3
      - DTA 6

      They may return in the future, but for now, they are gone.
      `,
    },
    {
      id: 'sitewide-bugs',
      title: 'Sitewide Bugs',
      message: `
      If you reload the tab, the server WILL return a 404 error. You will need to use the back button to return and re enter the game. [TD;LR]
      `,
    }
  ];

  const toggleNotice = (noticeId: string) => {
    setExpandedNotices(prev => ({
      ...prev,
      [noticeId]: !prev[noticeId]
    }));
  };

  const fetchChangelog = async () => {
    if (changelogContent) {
      setShowChangelog(!showChangelog);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(changelogUrl);
      const text = await response.text();
      setChangelogContent(text);
      setShowChangelog(true);
    } catch (error) {
      console.error('Failed to fetch changelog:', error);
      // Fallback to local markdown content
      const fallbackMarkdown = `Error fetching changelog. Please check your internet connection and try again.`;
      
      setChangelogContent(fallbackMarkdown);
      setShowChangelog(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={require('@/assets/images/og12_logo_banner.png')} style={{ height: 225, width: 500, marginBottom: 20, borderRadius: 10 }} />
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
            name="Drive Mad"
            imageSource={gameIcons['drive mad']}
            onPress={() => router.push('/game/drive-mad')}
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
          {/* SIZE ISSUES
          <Game
            name="BitLife"
            imageSource={gameIcons['bitlife']}
            onPress={() => router.push('/game/bitlife')}
          />
          */}
          <Game
            name="OVO"
            imageSource={gameIcons['ovo']}
            onPress={() => router.push('/game/ovo')}
          />
          {/* SIZE ISSUES
          <Game
            name="GunSpin"
            imageSource={gameIcons['gunspin']}
            onPress={() => router.push('/game/gunspin')}
          />
          */}
          <Game
            name="FnaF 1"
            imageSource={gameIcons['fnaf']}
            onPress={() => router.push('/game/fnaf-1')}
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
        
        <View style={styles.changelogSection}>
          <TouchableOpacity style={styles.changelogButton} onPress={fetchChangelog}>
            <Text style={styles.changelogButtonText}>
              {loading ? 'Loading...' : showChangelog ? 'Hide Changelog' : 'View Changelog'}
            </Text>
          </TouchableOpacity>
          
          {showChangelog && (
            <ScrollView style={styles.changelogContainer} nestedScrollEnabled>
              <Markdown style={markdownStyles}>
                {changelogContent}
              </Markdown>
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
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
  changelogSection: {
    width: '90%',
    maxWidth: 600,
    marginTop: 20,
    marginBottom: 20,
  },
  changelogButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  changelogButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  changelogContainer: {
    maxHeight: 400,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
  },
  heading1: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  heading2: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 15,
  },
  heading3: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  paragraph: {
    color: '#cccccc',
    marginBottom: 10,
  },
  list_item: {
    color: '#cccccc',
    marginBottom: 5,
  },
  code_inline: {
    backgroundColor: '#444444',
    color: '#ffffff',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
    fontSize: 13,
  },
  code_block: {
    backgroundColor: '#333333',
    color: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  strong: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
