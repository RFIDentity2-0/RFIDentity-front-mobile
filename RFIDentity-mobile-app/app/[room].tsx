import { View, ScrollView, Text } from "react-native";
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
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
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

  async function onSaveClick() {
    const payload = {
      location,
      assets: assets.map(({ assetId, itemStatus, comment }) => ({
        assetId,
        status: itemStatus,
        comment: comment || "",
      })),
    };

    console.log("Payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(
        "http://localhost:8080/api/mobile/updateOutcome",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Save successful:", result);
    } catch (error) {
      console.error("Save failed:", error);
    }
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

  function getRowColor(status: string) {
    switch (status) {
      case "OK":
        return { backgroundColor: "#8be6a0" }; // Light green for OK
      case "NEW":
        return { backgroundColor: "#c6c9ce" }; // Light grey for NEW
      case "MISSING":
        return { backgroundColor: "#ec7d87" }; // Light red for MISSING
      default:
        return {};
    }
  }

  return (
    <ScrollView contentContainerStyle={roomtablestyles.container}>
      <View style={roomtablestyles.header}>
        <Text style={roomtablestyles.headerText}>{location}</Text>
      </View>
      <PaperProvider>
        <DataTable style={roomtablestyles.dataTable}>
          <DataTable.Header>
            <DataTable.Title style={roomtablestyles.headerTitle}>
              Asset ID
            </DataTable.Title>
            <DataTable.Title style={roomtablestyles.headerTitle}>
              Description
            </DataTable.Title>
            <DataTable.Title style={roomtablestyles.headerTitle}>
              Status
            </DataTable.Title>
            <DataTable.Title style={roomtablestyles.headerTitle}>
              Action
            </DataTable.Title>
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
        <View style={roomtablestyles.tableFooter}>
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
            onPress={onSaveClick}
          >
            SAVE
          </Button>
        </View>
      </PaperProvider>
    </ScrollView>
  );
}
