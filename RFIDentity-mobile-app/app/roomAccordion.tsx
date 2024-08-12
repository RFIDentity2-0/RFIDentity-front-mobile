import * as React from "react";
import { List } from "react-native-paper";
import TableComponent from "./table";
import { ScrollView } from "react-native-gesture-handler";
const MyComponent = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <ScrollView>
      <List.Section title="Rooms">
        <List.Accordion
          title="Room 1"
          left={(props) => <List.Icon {...props} icon="folder" />}
        >
          <TableComponent></TableComponent>
        </List.Accordion>

        <List.Accordion
          title="Room 2"
          left={(props) => <List.Icon {...props} icon="folder" />}
          onPress={handlePress}
        >
          <TableComponent></TableComponent>
        </List.Accordion>
      </List.Section>
    </ScrollView>
  );
};

export default MyComponent;
