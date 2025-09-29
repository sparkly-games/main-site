import { Stack } from "expo-router";
import TeamsHeaderButton from '@/components/TeamsButton';
import SparxHeaderButton from "@/components/SparxButton";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "onlinegames12",
          headerRight: () => <><SparxHeaderButton /><TeamsHeaderButton /></>,
        }}
      />
    </Stack>
  );
}