import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  StatusBar.setBarStyle("dark-content");
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
