import { View, ScrollView } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { insideLocationFetch } from "./endpointManager";
import React from "react";
import { Button, DataTable, PaperProvider } from "react-native-paper";
import TableModalComponent from "./tablemodal";
import { roomtablestyles } from "./roomtablestyles";

// Define the type for the route parameters
type RouteParams = {
  room: string;
};

interface Asset {
  assetId: string;
  description: string;
  itemStatus: string;
  comment: string;
}

interface RoomData {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Asset[];
}

export default function RoomComponent() {
  // Access the route object with a defined type
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  // Extract and decode the 'room' parameter from the route object
  const location = decodeURIComponent(route.params.room);

  const [assets, setAssets] = React.useState<Asset[]>([]);

  React.useEffect(() => {
    getAssets();
  }, []);

  async function onScanClick() {
    const updatedAssets = assets.map((asset) => ({
      ...asset,
      itemStatus: randomStatus(),
    }));
    setAssets(updatedAssets);
    console.log(updatedAssets);
  }

  function onSaveClick() {
    //////////////////////////////////////////////////////////////////////////////
    //MUST IMPLEMENT
  }

  function randomStatus() {
    const randomnumber = Math.random();
    if (randomnumber < 0.6) {
      return "OK";
    } else if (randomnumber < 0.85) {
      return "NEW";
    } else {
      return "MISSING";
    }
  }

  async function getAssets() {
    const data: RoomData = await insideLocationFetch(location);
    if (data) {
      setAssets(data.content);
      console.log(data.content);
    }
  }

  // Determine row color based on status
  function getRowColor(status: string) {
    switch (status) {
      case "OK":
        return { backgroundColor: "green" };
      case "NEW":
        return { backgroundColor: "grey" };
      case "MISSING":
        return { backgroundColor: "red" };
      default:
        return {};
    }
  }

  return (
    <ScrollView>
      <PaperProvider>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>AssetId</DataTable.Title>
            <DataTable.Title>Description</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title>Action</DataTable.Title>
          </DataTable.Header>

          {assets.map((item) => (
            <DataTable.Row
              key={item.assetId}
              style={getRowColor(item.itemStatus)}
            >
              <DataTable.Cell>{item.assetId}</DataTable.Cell>
              <DataTable.Cell numeric>{item.description}</DataTable.Cell>
              <DataTable.Cell numeric>{item.itemStatus}</DataTable.Cell>
              <DataTable.Cell style={roomtablestyles.cell}>
                <TableModalComponent />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <View style={roomtablestyles.tablefooter}>
          <Button
            style={roomtablestyles.button}
            mode="contained"
            onPress={onScanClick}
          >
            SCAN
          </Button>
          <Button
            style={roomtablestyles.button}
            mode="contained"
            onPress={() => console.log("SAVE Pressed")}
          >
            SAVE
          </Button>
        </View>
      </PaperProvider>
    </ScrollView>
  );
}
