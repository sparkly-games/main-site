import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from "react-native";
import { Game } from '@/components/Game';
import { gameIcons } from '@/assets/images/GameIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Markdown from 'react-native-markdown-display';

export default function Index(this: any) {
  const router = useRouter();
  const [expandedNotices, setExpandedNotices] = useState<{ [key: string]: boolean }>({});
  const [changelogContent, setChangelogContent] = useState<string>('');
  const [showChangelog, setShowChangelog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showHorror, setShowHorror] = useState<boolean>(false);

  // You can change this URL to point to your own GitHub markdown file
  const changelogUrl = 'https://raw.githubusercontent.com/onlinegames19/onlinegames19.github.io/main/CHANGELOG.md';

  const notices = [
    {
      id: 'game-information',
      title: 'Game Info',
      message: `
      Tiny Fishing: Before May 2024 update. (No fish after purple seahorse) [TD;LR]
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
    <ImageBackground source={require('@/assets/images/background.jpg')} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {// <AdCarousel />
            }
            <Image source={require('@/assets/images/og12_logo_banner.png')} style={{ height: 225, width: 500, borderRadius: 10 }} />
            
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 10, textAlign: 'center' }}>Endless Games</Text>
            <View style={styles.gameList}>
              <Game
                name="Tiny Fishing"
                imageSource={gameIcons['1']}
                onPress={() => router.push('/game/1')}
              />
              <Game
                name="Subway Surfers"
                imageSource={gameIcons['3']}
                onPress={() => router.push('/game/3')}
              />
              <Game
                name="Duck Duck Clicker"
                imageSource={gameIcons['4']}
                onPress={() => router.push('/game/4')}
              />
              <Game
                name="GunSpin"
                imageSource={gameIcons['8']}
                onPress={() => router.push('/game/8')}
              />
            </View>

            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, textAlign: 'center' }}>Arcade Games</Text>
            <View style={styles.gameList}>
              <Game
                name="Thorns and Balloons"
                imageSource={gameIcons['5']}
                onPress={() => router.push('/game/5')}
              />
              <Game
                name="BitLife"
                imageSource={gameIcons['6']}
                onPress={() => router.push('/game/6')}
              />
              <Game
                name="OVO"
                imageSource={gameIcons['7']}
                onPress={() => router.push('/game/7')}
              />
            </View>

            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, textAlign: 'center' }}>Fancade</Text>
            <View style={styles.gameList}>
              <Game
                name="Drive Mad"
                imageSource={gameIcons['9']}
                onPress={() => router.push('/game/9')}
              />
              <Game
                name="Roper"
                imageSource={gameIcons['b']}
                onPress={() => router.push('/game/b')}
              />
            </View>

            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, textAlign: 'center' }}>Sports Games</Text>
            <View style={styles.gameList}>
              <Game
                name="Penalty Kick Online"
                imageSource={gameIcons['e']}
                onPress={() => router.push('/game/e')}
              />
              <Game
                name="Survival Race"
                imageSource={gameIcons['d']}
                onPress={() => router.push('/game/d')}
              />
              <Game
                name="8 Ball Pool"
                imageSource={gameIcons['f']}
                onPress={() => router.push('/game/f')}
              />
            </View>

            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, textAlign: 'center' }}>Ragdoll Games</Text>
            <View style={styles.gameList}>
              <Game
                name="Ragdoll Hit"
                imageSource={gameIcons['c']}
                onPress={() => router.push('/game/c')}
              />
              <Game
                name="Ragdoll Archers"
                imageSource={gameIcons['2']}
                onPress={() => router.push('/game/2')}
              />
            </View>
            <TouchableOpacity style={styles.changelogButton} onPress={setShowHorror.bind(this, !showHorror)}>
                <Text style={styles.changelogButtonText}>
                  {showHorror ? 'Hide Horror' : 'Show Horror'}
                </Text>
              </TouchableOpacity>
            {showHorror && (
              <>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Horror Games</Text>
                <View style={styles.gameList}>
                  <Game
                    name="FnaF 1"
                    imageSource={gameIcons['a']}
                    onPress={() => router.push('/game/a')}
                  />
                </View>
              </>
            )}  
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
            <Text style={styles.deprecatedTitle}>Deprecated Games</Text>
            <View style={styles.gameList}>
              <Game
                name="Clash Royale"
                imageSource={gameIcons['0']}
                onPress={() => router.push('/game/0')}
              />
            </View>
          </ScrollView>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  deprecatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#888888',
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
