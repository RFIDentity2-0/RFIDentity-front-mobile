import * as React from "react";
import { DataTable, PaperProvider } from "react-native-paper";
import { tableFetch } from "./endpointManager";
import { ActivityIndicator } from "react-native";
import { Button } from "react-native-paper";
import { tablestyles } from "./tablestyles";
import { ScrollView } from "react-native-gesture-handler";
import TableModalComponent from "./tablemodal";
import { View } from "react-native";
import { Link } from "expo-router";

interface TableComponentProps {
  room: string;
}
// interface AssetList extends Array<Asset> {}

// // for testing purposes
// interface Asset {
//   AssetId: string;
//   Description: string;
//   VM_Location: string;
//   Status: string;
//   Action: string;
// }
interface Asset {
  assetId: string; // Represents the ID of the asset
  description: string; // Describes the asset
  itemStatus: string; // Represents the status of the item (e.g., "NEW")
}

interface RoomData {
  location: string; // Represents the location of the room or storage
  assetCount: number; // Represents the count of assets in the location
  assets: Asset[]; // Represents an array of assets in the location
}

interface RoomDataResponse {
  totalElements: number; // Represents the total number of elements in the data
  totalPages: number; // Represents the total number of pages available
  size: number; // Represents the size of the page (number of items per page)
  content: RoomData[]; // Represents an array of RoomData objects
}
// end of testing
const TableComponent: React.FC<TableComponentProps> = ({ room }) => {
  // Table states
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([10, 15, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  // Fetch states
  const [items, setItems] = React.useState<Asset[]>([]);
  const [loading, setLoading] = React.useState(true);

  async function updateAssets() {
    setLoading(true);
    const data: RoomDataResponse = await tableFetch(room);
    if (data != null) {
      // Find the room that matches the `room` prop and set its assets to `items`
      const roomData = data.content.find((r) => r.location === room);
      if (roomData) {
        setItems(roomData.assets);
      }
    }
    setLoading(false);
  }

  React.useEffect(() => {
    updateAssets();
  }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <ScrollView>
        <PaperProvider>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>AssetId</DataTable.Title>
              <DataTable.Title>Description</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
              <DataTable.Row key={item.assetId}>
                <DataTable.Cell>{item.assetId}</DataTable.Cell>
                <DataTable.Cell numeric>{item.description}</DataTable.Cell>
                <DataTable.Cell style={tablestyles.cell}>
                  <TableModalComponent />
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            {/* <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${items.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={"Rows per page"}
            /> */}
          </DataTable>
          <View style={tablestyles.tablefooter}>
            <Button
              style={tablestyles.button}
              mode="contained"
              onPress={() => console.log("Pressed")}
            >
              <Link
                href={{
                  pathname: "/[room]",
                  params: { room: room },
                }}
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
