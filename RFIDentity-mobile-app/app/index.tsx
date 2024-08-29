import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Link href="/table" style={styles.link}>
        Home
      </Link>
      <Link href="/details" style={styles.link}>
        View Details
      </Link>
      <Link href="/Rooms" style={styles.link}>
        Rooms
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Light background color for better contrast
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Darker color for better readability
  },
  link: {
    backgroundColor: "#007bff", // Primary button color
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
    color: "#fff", // White text color
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "none", // Remove underline
  },
});
