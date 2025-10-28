import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { gameIcons } from '@/assets/images/GameIcons';

interface GameProps {
  name: string;
  imageSource: keyof typeof gameIcons;
  onPress: () => void;
}

export function Game({ name, imageSource, onPress }: GameProps) {
  const icon: ImageSourcePropType = gameIcons[imageSource];

  if (!icon) {
    console.error(`Error: No image source found for game name "${name}"`);
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={icon} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgb(56,59,58)',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    margin: 10,
    alignItems: 'center',
    padding: 15,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 24,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
