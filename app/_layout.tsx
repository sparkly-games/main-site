import { Stack } from "expo-router";
import TeamsHeaderButton from '@/components/TeamsButton';
import SparxHeaderButton from "@/components/SparxButton";
import { Text } from "react-native";
import React from "react";

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
        options={{ title: "Games" }}
      />
    </Stack>
  );
}