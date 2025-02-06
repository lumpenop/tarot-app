import { View, Text } from "react-native";
import { Slot } from "expo-router";

interface Props {
  children: React.ReactNode;
}
function Layout({ children }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Header</Text>
      <Slot />
      <Text>Footer</Text>
    </View>
  );
}

export default Layout;
