import * as React from "react";
import { List } from "react-native-paper";
import TableComponent from "./table";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native-reanimated/lib/typescript/Animated";

interface Room {
  SAP_Room: string;
}
const MyComponent = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const rooms: Room[] = [
    {
      SAP_Room: "Room 1",
    },
    { SAP_Room: "Room 2" },
    { SAP_Room: "Room 3" },
    { SAP_Room: "Room 4" },
  ];

  return (
    <ScrollView>
      <List.Section title="Rooms">
        {rooms.map((room, index) => (
          <List.Accordion
            key={index}
            title={room.SAP_Room}
            left={(props) => <List.Icon {...props} icon="folder" />}
            onPress={handlePress}
          >
            <TableComponent room={room.SAP_Room} />
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
};

export default MyComponent;
