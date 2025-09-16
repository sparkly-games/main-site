import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
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
  const changelogUrl = 'https://raw.githubusercontent.com/facebook/react-native/main/CHANGELOG.md';

  const notices = [
    {
      id: 'game-information',
      title: 'Game Info',
      message: 'Thorns and Balloons: The game currently has no sound. [TD;LR]',
    },
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
      const fallbackMarkdown = `# Changelog

## Version 2.1.0 - September 16, 2025
### Added
- New notices section with dropdown functionality
- Enhanced game selection interface
- Improved user experience

### Fixed
- Performance optimizations
- UI responsiveness improvements

### Changed
- Updated color scheme for better accessibility
- Modernized component styling

## Version 2.0.0 - September 1, 2025
### Added
- Complete redesign of the game hub
- New game selection system
- Mobile-first responsive design

### Breaking Changes
- Removed legacy game loading system
- Updated routing structure

## Version 1.5.0 - August 15, 2025
### Added
- Added 6 new games to the collection
- Improved loading times
- Better error handling`;
      
      setChangelogContent(fallbackMarkdown);
      setShowChangelog(true);
    } finally {
      setLoading(false);
    }
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
