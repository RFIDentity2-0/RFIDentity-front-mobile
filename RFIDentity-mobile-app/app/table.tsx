import * as React from "react";
import { DataTable, PaperProvider, Button } from "react-native-paper";
import { tableFetch } from "./endpointManager";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import TableModalComponent from "./tablemodal";
import { Link } from "expo-router";
import { styles } from "./tablestyles";

interface TableComponentProps {
  room: string;
}

interface Asset {
  assetId: string;
  description: string;
  itemStatus: string;
}

interface RoomData {
  location: string;
  assetCount: number;
  assets: Asset[];
}

interface RoomDataResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: RoomData[];
}

const TableComponent: React.FC<TableComponentProps> = ({ room }) => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([10, 15, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [items, setItems] = React.useState<Asset[]>([]);
  const [loading, setLoading] = React.useState(true);

  async function updateAssets() {
    setLoading(true);
    try {
      const data: RoomDataResponse = await tableFetch(room);
      if (data != null) {
        const roomData = data.content.find((r) => r.location === room);
        if (roomData) {
          setItems(roomData.assets);
        }
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    updateAssets();
  }, [room]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <PaperProvider>
          <DataTable style={styles.dataTable}>
            <DataTable.Header>
              <DataTable.Title style={styles.column}>Asset ID</DataTable.Title>
              <DataTable.Title style={styles.column}>
                Description
              </DataTable.Title>
              <DataTable.Title style={styles.column}>Action</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
              <DataTable.Row key={item.assetId}>
                <DataTable.Cell style={styles.column}>
                  {item.assetId}
                </DataTable.Cell>
                <DataTable.Cell style={styles.column} numeric>
                  {item.description}
                </DataTable.Cell>
                <DataTable.Cell style={styles.column}>
                  <TableModalComponent />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
          <View style={styles.tableFooter}>
            <Button
              style={styles.button}
              mode="contained"
              onPress={() => console.log("Pressed")}
            >
              <Link
                href={{
                  pathname: "/[room]",
                  params: { room: room },
                }}
                style={styles.link}
              >
                Enter
              </Link>
            </Button>
          </View>
        </PaperProvider>
      </ScrollView>
    );
  }
};

export default TableComponent;
