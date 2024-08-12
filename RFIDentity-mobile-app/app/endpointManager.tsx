export const getAreas = async () => {
  let result = null;
  try {
    const response = await fetch(
      "http://192.168.0.192:4000/api/getAssetsLocations",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    result = await response.json();
  } catch (err) {
    console.error("Fetch error:", err);
  }
  return result.areas;
};

export const testFetch = async () => {
  let result;
  try {
    const response = await fetch(
      "https://66b4810f9f9169621ea33918.mockapi.io/rfid/assets",
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("test fetch response was not ok");
    }
    result = await response.json();
    console.log("result");
    console.log(result);
  } catch (err) {
    console.log(err);
  }
  return result;
};

export const getArea = async (location: string) => {
  let result = null;
  try {
    const response = await fetch("http://192.168.0.192:4000/api/readArea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*", // Opcjonalne, w zależności od wymagań serwera
      },
      body: JSON.stringify({
        location: location,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    result = await response.json();
  } catch (err) {
    console.error("Fetch error:", err);
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
