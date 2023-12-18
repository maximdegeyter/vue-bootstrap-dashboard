const token = "AfasToken " + btoa(import.meta.env.VITE_AFAS_TOKEN);

export const getOffers = async () => {
  try {
    const response = await fetch(
      "/api/profitrestservices/connectors/SYA_Ontvangsten",
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};

export const getOntvangstregels = async () => {
  try {
    const response = await fetch(
      "/api/profitrestservices/connectors/SYA_Ontvangstregels",
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};
