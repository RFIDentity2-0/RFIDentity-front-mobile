import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function RoomComponent() {
  return (
    <View style={styles.container}>
      <h1>view works</h1>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
