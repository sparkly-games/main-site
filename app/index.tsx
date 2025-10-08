import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image } from "react-native";
import { Game } from '@/components/Game';
import { gameIcons } from '@/assets/images/GameIcons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import Markdown from 'react-native-markdown-display';

// --- Types and Constants ---

// Define the structure of a remote notice item
interface RemoteNotice {
  name: string;
  info: string;
  noticeDetails: string;
  end: number; // Unix timestamp in seconds
}

// URL for the remote notice file (Placeholder URL used)
const errorNoticesUrl = 'https://raw.githubusercontent.com/onlinegames19/main-site/main/errors.md';
const changelogUrl = 'https://raw.githubusercontent.com/onlinegames19/main-site/main/CHANGELOG.md';

/**
 * Custom parser for the YAML-like front-matter blocks.
 * It expects blocks separated by '---'.
 */
const parseNotices = (rawText: string): RemoteNotice[] => {
  // Split by '---', filter out empty strings, and exclude the first and last (if they are just delimiters)
  const blocks = rawText.split('---').filter(block => block.trim().length > 0);
  const notices: RemoteNotice[] = [];

  blocks.forEach(block => {
    try {
      const data: Partial<RemoteNotice> = {};
      const lines = block.trim().split('\n').filter(line => line.trim().length > 0);
      
      lines.forEach(line => {
        // Simple key: value extraction
        const parts = line.split(':');
        if (parts.length < 2) return;
        
        const key = parts[0].trim();
        // Join the rest of the parts to handle colons in the message, then clean up quotes
        const value = parts.slice(1).join(':').trim().replace(/^['"]|['"]$/g, '');
        
        if (key === 'name') data.name = value;
        else if (key === 'info') data.info = value;
        else if (key === 'noticeDetails') data.noticeDetails = value;
        // Parse end as an integer
        else if (key === 'end') data.end = parseInt(value, 10);
      });

      // Validate that all required fields are present
      if (data.name && data.info && data.noticeDetails && typeof data.end === 'number' && !isNaN(data.end)) {
        notices.push(data as RemoteNotice);
      }
    } catch (e) {
      console.error('Error parsing notice block:', e);
    }
  });

  return notices;
};

// --- Main Component ---

export default function Index(this: any) {
  const router = useRouter();
  // State for the single, active notice fetched remotely
  const [activeNotice, setActiveNotice] = useState<RemoteNotice | null>(null); 
  const [changelogContent, setChangelogContent] = useState<string>('');
  const [showChangelog, setShowChangelog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showHorror, setShowHorror] = useState<boolean>(false);

  const gameGo = (path: string) => {
    router.push(`/game/${path}`);
  }

  /**
   * Fetches the remote notices, parses them, and finds the first one 
   * that is still active (end timestamp is in the future).
   */
  const fetchAndFilterNotices = async () => {
    try {
      // Exponential backoff for network requests
      const maxRetries = 3;
      let response: Response | null = null;
      
      for (let i = 0; i < maxRetries; i++) {
        try {
          response = await fetch(errorNoticesUrl);
          if (response.ok) break;
        } catch (error) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
      }
      
      if (!response || !response.ok) {
        console.error('Failed to fetch notices after multiple retries.');
        setActiveNotice(null);
        return;
      }

      const rawText = await response.text();
      const allNotices = parseNotices(rawText);

      // Current time in milliseconds
      const nowMs = Date.now(); 

      // Find the first notice in the list whose end time (converted to milliseconds) is in the future
      const active = allNotices.find(notice => notice.end * 1000 > nowMs);

      if (active) {
        setActiveNotice(active);
      } else {
        setActiveNotice(null);
      }

    } catch (error) {
      console.error('Failed to process active notices:', error);
    }
  };

  // Run the notice fetching logic once on component mount
  useEffect(() => {
    fetchAndFilterNotices();
  }, []);

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
    // Note: The ImageBackground source needs to be locally resolvable in a real React Native environment
    <ImageBackground source={require('@/assets/images/background.jpg')} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Image source={require('@/assets/images/og12_logo_banner.png')} style={{ width: 600, height: 200, marginBottom: 20, borderRadius: 10 }} />
            {/* Conditional Display for the Active Notice (as requested, right under the title) */}
            {activeNotice && (
              <View style={styles.activeNoticeContainer}>
                <Text style={styles.activeNoticeTitle}>{activeNotice.name}</Text>
                <Text style={styles.activeNoticeInfo}>{activeNotice.info}</Text>
                <Text style={styles.activeNoticeDetails}>
                  <Text style={{fontWeight: 'bold'}}>Dates: </Text>{activeNotice.noticeDetails}
                </Text>
                <Text style={styles.activeNoticeTimestamp}>
                  Ends: {new Date(activeNotice.end * 1000).toLocaleDateString()}
                </Text>
              </View>
            )}
            <Text style={styles.title}>
              Endless Games
            </Text>
            <View style={styles.gameList}>
              <Game
                name="Tiny Fishing"
                imageSource={gameIcons['1']}
                onPress={() => gameGo('tiny-fishing')}
              />
              <Game
                name="Subway Surfers"
                imageSource={gameIcons['3']}
                onPress={() => gameGo('subway-surfers')}
              />
              <Game
                name="Duck Duck Clicker"
                imageSource={gameIcons['4']}
                onPress={() => gameGo('duck-duck-clicker')}
              />
              <Game
                name="Survival Race"
                imageSource={gameIcons['d']}
                onPress={() => gameGo('survival-race')}
              />
              <Game
                name="GunSpin"
                imageSource={gameIcons['8']}
                onPress={() => gameGo('gunspin')}
              />
            </View>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, textAlign: 'center' }}>Arcade Games</Text>
            <View style={styles.gameList}>
              <Game
                name="Thorns and Balloons"
                imageSource={gameIcons['5']}
                onPress={() => gameGo('thorns-and-balloons')}
              />
              <Game
                name="BitLife"
                imageSource={gameIcons['6']}
                onPress={() => gameGo('bitlife')}
              />
              <Game
                name="OVO"
                imageSource={gameIcons['7']}
                onPress={() => gameGo('ovo')}
              />
              <Game
                name="Awesome Tanks 2"
                imageSource={gameIcons['i']}
                onPress={() => gameGo('awesome-tanks')}
              />
              <Game
                name="Hotline Miami (UNSTABLE, PC)"
                imageSource={gameIcons['l']}
                onPress={() => gameGo('hotline-miami')}
              />
            </View>

            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, textAlign: 'center' }}>Sports Games</Text>
            <View style={styles.gameList}>
              <Game
                name="Penalty Kick Online"
                imageSource={gameIcons['e']}
                onPress={() => gameGo('penkick')}
              />
              <Game
                name="Darts Pro"
                imageSource={gameIcons['f']}
                onPress={() => gameGo('darts-pro')}
              />
              <Game
                name="Idle Football Manager"
                imageSource={gameIcons['k']}
                onPress={() => gameGo('idle-football')}
              />
              <Game
                name="Golf Champions"
                imageSource={gameIcons['j']}
                onPress={() => gameGo('golf-champs')}
              />
            </View>

            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, textAlign: 'center' }}>Fancade</Text>
            <View style={styles.gameList}>
              <Game
                name="Drive Mad"
                imageSource={gameIcons['9']}
                onPress={() => gameGo('drive-mad')}
              />
              <Game
                name="Roper"
                imageSource={gameIcons['b']}
                onPress={() => gameGo('roper')}
              />
            </View>

            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, textAlign: 'center' }}>Ragdoll Games</Text>
            <View style={styles.gameList}>
              <Game
                name="Ragdoll Hit"
                imageSource={gameIcons['c']}
                onPress={() => gameGo('ragdoll-hit')}
              />
              <Game
                name="Ragdoll Archers"
                imageSource={gameIcons['2']}
                onPress={() => gameGo('ragdoll-archers')}
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
                    onPress={() => gameGo('fnaf-1')}
                  />
                  <Game
                    name="FnaF Sister Location"
                    imageSource={gameIcons['g']}
                    onPress={() => gameGo('sl')}
                  />
                  <Game
                    name="FnaF UCN"
                    imageSource={gameIcons['h']}
                    onPress={() => gameGo('ucn')}
                  />
                </View>
              </>
            )}  
            
            {/* The old hardcoded notices section has been removed */}
            
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
                onPress={() => gameGo('clash')}
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
  
  // NEW STYLES for the Active Notice
  activeNoticeContainer: {
    width: '90%',
    maxWidth: 600,
    backgroundColor: '#D9534F', // Red background for important warning
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFDDC1', // Light border for contrast
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  activeNoticeTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  activeNoticeInfo: {
    color: '#ffe0e0',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  activeNoticeDetails: {
    color: 'white',
    fontSize: 14,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeNoticeTimestamp: {
    color: '#ffc6c6',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  // END NEW STYLES
  
  // Removed old noticesSection styles

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
