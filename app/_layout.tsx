import { Stack } from "expo-router";
import TeamsHeaderButton from '@/components/TeamsButton';
import SparxHeaderButton from "@/components/SparxButton";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackVisible: true,
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