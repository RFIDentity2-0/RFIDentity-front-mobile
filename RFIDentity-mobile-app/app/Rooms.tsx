import * as React from "react";
import { List } from "react-native-paper";
import TableComponent from "./table";
import { ScrollView, StyleSheet, View } from "react-native";
import { areasFetch } from "./endpointManager";

interface RoomData {
  location: string; // Represents the location of the room or storage
  scannedDate: string | null; // Represents the date when the location was scanned, or null if not scanned
  count: number; // Represents the count of items in the location
}

interface RoomDataResponse {
  totalElements: number; // Represents the total number of elements in the data
  totalPages: number; // Represents the total number of pages available
  size: number; // Represents the size of the page (number of items per page)
  content: RoomData[]; // Represents an array of RoomData objects
}

const MyComponent = () => {
  const [expanded, setExpanded] = React.useState<string | null>(null); // Track which accordion is expanded
  const [rooms, setRooms] = React.useState<RoomData[]>([]); // Initialize as an empty array

  const handlePress = (location: string) => {
    setExpanded(expanded === location ? null : location);
  };

  async function getAreas() {
    try {
      const data: RoomDataResponse = await areasFetch();
      console.log(data);
      if (data != null) {
        setRooms(data.content);
      }
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  }

  React.useEffect(() => {
    getAreas();
    console.log("USEEFFECT TRIGGERED");
  }, []);

  return (
    <ScrollView style={styles.container}>
      <List.Section title="Locations" style={styles.section}>
        {rooms.map((room) => (
          <List.Accordion
            key={room.location}
            title={room.location} // Use room.location
            left={(props) => <List.Icon {...props} icon="folder" />}
            expanded={expanded === room.location}
            onPress={() => handlePress(room.location)}
            style={styles.accordion}
            titleStyle={styles.accordionTitle}
          >
            <TableComponent room={room.location} />
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Light background color
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  accordion: {
    backgroundColor: "#ffffff", // White background for the accordion
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2, // Adds a shadow effect
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MyComponent;
