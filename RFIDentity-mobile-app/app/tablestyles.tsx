import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  dataTable: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2,
  },
  dataTableTitle: {
    fontWeight: "bold",
    color: "#333",
  },
  column: {
    flex: 1, // Ensures columns take up equal width
    justifyContent: "center",
    textAlign: "center",
  },
  tableFooter: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    width: 120,
  },
  link: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
