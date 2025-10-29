import { Stack } from "expo-router";
import TeamsHeaderButton from '@/components/TeamsButton';
import SparxHeaderButton from "@/components/SparxButton";
import { Text, Image, StyleSheet } from "react-native"; // Import Image and StyleSheet
import React from "react";

// --- Placeholder for your Logo Image ---
// NOTE: Replace this with the actual path to your logo file
const LogoImageSource = require('@/assets/images/og12_logo_banner.png'); 

// Component to render the logo in the header
const HeaderLogo = () => (
  <Image
    style={styles.headerImage}
    source={LogoImageSource}
    resizeMode="contain" // Ensures the logo fits well without cropping
  />
);

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Text style={{ color: 'white', fontSize: 36, margin: 15 }} onPress={() => window.location.href = '/'}>⌂</Text>
        ),
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: 'rgb(81,81,81)' },
        headerTitleStyle: { color: 'white' },
        headerRight: () => (
          <>
            <SparxHeaderButton />
            <TeamsHeaderButton />
          </>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{ 
          // Set headerTitle to the function that returns the Image component
          headerTitle: HeaderLogo,
          // Remove the default 'title: "Games"' 
        }}
      />
    </Stack>
  );
}

// --- Styles for the Header Image ---
const styles = StyleSheet.create({
  headerImage: {
    width: 150*1.5,  // Adjust width to fit your design
    height: 40*1.5,  // Adjust height to fit your design
    // The height and width are crucial for displaying the image properly
    borderRadius: 25,
    opacity: 0.8
  },
});