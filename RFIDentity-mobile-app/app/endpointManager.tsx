export const areasFetch = async () => {
  let result = null;
  try {
    const response = await fetch(
      "http://localhost:8080/api/dashboard/listLocationsWithAssets?page=0&size=20&sort=location",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("areasFetch response was not ok");
    }

    result = await response.json();
  } catch (err) {
    console.error("areasFetch error:", err);
  }

  // Return the result directly, assuming it contains the correct data structure
  return result;
};

export const tableFetch = async (room: string) => {
  let result;
  try {
    const response = await fetch(
      `http://localhost:8080/api/locations/locationsToRoomsPage?location=${room}&page=0&size=1&sort=itemStatus`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("tableFetch fetch response was not ok");
    }
    result = await response.json();
    console.log("result");
    console.log(result);
  } catch (err) {
    console.error("tableFetch error:", err);
  }
  return result;
};
export const insideLocationFetch = async (location: string) => {
  let result;
  try {
    const response = await fetch(
      `http://localhost:8080/api/locations/insideLocation?location=${location}&page=0&size=20&sort=assetId`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("insideLocationFetch fetch response was not ok");
    }
    result = await response.json();
    console.log("result");
    console.log(result);
  } catch (err) {
    console.error("insideLocationFetch error:", err);
  }
  return result;
};

export const updateArea = async (updatedAreaData: string) => {
  let result = null;
  try {
    const response = await fetch("http://192.168.0.192:4000/api/updateArea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assets: updatedAreaData }),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error(
        "Network response was not ok:",
        response.status,
        errorResponse
      );
      throw new Error("Network response was not ok");
    }

    result = await response.json();
  } catch (err) {
    console.error("Fetch error:", err);
  }
  return result;
};
