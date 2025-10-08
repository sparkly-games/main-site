import { Stack } from "expo-router";
import TeamsHeaderButton from '@/components/TeamsButton';
import SparxHeaderButton from "@/components/SparxButton";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Text style={{ color: 'black', fontSize: 18, marginLeft: 10 }} onPress={() => window.history.back()}>⬅️</Text>
        ),
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#f0f0f0' },
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
        options={{ title: "onlinegames12" }}
      />
    </Stack>
  );
}