import { Stack } from "expo-router";
import TeamsHeaderButton from '@/components/TeamsButton';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "onlinegames12",
          headerRight: () => <TeamsHeaderButton />,
        }}
      />
    </Stack>
  );
}