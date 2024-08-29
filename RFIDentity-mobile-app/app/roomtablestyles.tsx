import { StyleSheet } from "react-native";

export const roomtablestyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", // Light background color
  },
  header: {
    backgroundColor: "#007bff", // Blue background
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#ffffff", // White text color
    fontSize: 20,
    fontWeight: "bold",
  },
  dataTable: {
    backgroundColor: "#ffffff", // White background for the table
    borderRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#333",
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
  },
  tableFooter: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});
