import Home from "@/02.pages/home";
import { Stack } from "expo-router";
import { View, Text } from "react-native";

function HomePage() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}

export default HomePage;
