import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import GameField from "./src/GameField";

export default function App() {
  return (
    <View style={styles.container}>
      <GameField />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
