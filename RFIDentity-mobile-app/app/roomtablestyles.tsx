import { StyleSheet } from "react-native";

export const roomtablestyles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f8f8f8", // Light background color for the footer
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 10, // Adds shadow for iOS
  },
  button: {
    width: "48%", // Makes each button take up half of the width, with some margin for spacing
  },
  column: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    margin: 20,
    fontSize: 20,
    fontWeight: "bold", // Make the label text bold for a more professional look
  },
});
