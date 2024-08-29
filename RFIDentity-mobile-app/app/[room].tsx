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
  inventoryStatus: string;
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
      inventoryStatus: randomStatus(),
    }));
    setAssets(updatedAssets);
    console.log(updatedAssets);
  }

  async function onSaveClick() {
    const payload = {
      location,
      assets: assets.map(({ assetId, inventoryStatus, comment }) => ({
        assetId,
        status: inventoryStatus,
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
        return { backgroundColor: "#8be6a0" };
      case "NEW":
        return { backgroundColor: "#c6c9ce" };
      case "MISSING":
        return { backgroundColor: "#ec7d87" };
      default:
        return {};
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <PaperProvider>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={roomtablestyles.label}>Selected room: {location}</View>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={roomtablestyles.column}>
                Asset ID
              </DataTable.Title>
              <DataTable.Title style={roomtablestyles.column}>
                Description
              </DataTable.Title>
              <DataTable.Title style={roomtablestyles.column}>
                Status
              </DataTable.Title>
              <DataTable.Title style={roomtablestyles.column}>
                Action
              </DataTable.Title>
            </DataTable.Header>

            {assets.map((item) => (
              <DataTable.Row
                key={item.assetId}
                style={getRowColor(item.inventoryStatus)}
              >
                <DataTable.Cell style={roomtablestyles.column}>
                  {item.assetId}
                </DataTable.Cell>
                <DataTable.Cell style={roomtablestyles.column} numeric>
                  {item.description}
                </DataTable.Cell>
                <DataTable.Cell style={roomtablestyles.column} numeric>
                  {item.inventoryStatus}
                </DataTable.Cell>
                <DataTable.Cell style={roomtablestyles.column}>
                  <TableModalComponent />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>

        <View style={roomtablestyles.footer}>
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
    </View>
  );
}
