import * as React from "react";
import { List } from "react-native-paper";
import TableComponent from "./table";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native-reanimated/lib/typescript/Animated";
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
  const [expanded, setExpanded] = React.useState(true);
  const [rooms, setRooms] = React.useState<RoomData[]>([]); // Initialize as an empty array
  const handlePress = () => setExpanded(!expanded);

  async function getAreas() {
    const data: RoomDataResponse = await areasFetch();
    console.log(data);
    if (data != null) {
      console.log(data);
      setRooms(data.content);
    }
  }

  React.useEffect(() => {
    getAreas();
    console.log("USEEFFECT TRIGGERED");
  }, []);

  return (
    <ScrollView>
      <List.Section title="Rooms">
        {rooms.map((room, index) => (
          <List.Accordion
            key={index}
            title={room.location} // Use room.location instead of room.SAP_Room
            left={(props) => <List.Icon {...props} icon="folder" />}
            onPress={handlePress}
          >
            <TableComponent room={room.location} />
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
};

export default MyComponent;
