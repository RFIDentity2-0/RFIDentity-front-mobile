import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function RoomComponent() {
  return <View style={styles.container}>it just works</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
