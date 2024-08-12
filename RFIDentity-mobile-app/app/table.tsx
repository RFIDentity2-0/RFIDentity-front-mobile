import * as React from "react";
import { DataTable, PaperProvider } from "react-native-paper";
import { testFetch } from "./endpointManager";
import { ActivityIndicator } from "react-native";
import { Button } from "react-native-paper";
import { tablestyles } from "./tablestyles";
import { ScrollView } from "react-native-gesture-handler";
import TableModalComponent from "./tablemodal";
interface Asset {
  AssetId: string;
  Description: string;
  VM_Location: string;
  SAP_Room: string;
  Status: string;
  Action: string;
}

const TableComponent = () => {
  // table states
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([10, 15, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  // fetch states
  const [items, setItems] = React.useState<Asset[]>([]);
  const [loading, setLoading] = React.useState(true);

  async function updateAssets() {
    setLoading(true);
    const data: Asset[] = await testFetch(); // Make sure that testFetch returns an array of Assets
    if (data != null) {
      setItems(data);
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
      <div className="loading">
        <ActivityIndicator size="large" />
      </div>
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
              <DataTable.Row key={item.AssetId}>
                <DataTable.Cell>{item.AssetId}</DataTable.Cell>
                <DataTable.Cell numeric>{item.Description}</DataTable.Cell>
                <DataTable.Cell style={tablestyles.cell}>
                  <TableModalComponent></TableModalComponent>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${items.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={"Rows per page"}
            />
          </DataTable>
          <Button
            style={tablestyles.button}
            icon="camera"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            klik
          </Button>
        </PaperProvider>
      </ScrollView>
    );
  }
};

export default TableComponent;
