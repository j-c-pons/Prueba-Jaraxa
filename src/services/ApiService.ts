import { OpenFDAResponse } from "../types/openFDA";

const BASE_URL = "https://api.fda.gov/drug/label.json";

export const searchDrugs = async (
  brandName: string,
  manufacturer: string,
  substance: string,
  skip: number = 0,
  limit: number = 10
): Promise<OpenFDAResponse> => {
  let searchQuery = "";

  if (brandName != "") {
    searchQuery += `openfda.brand_name:*${brandName}*`;
  } else {
    searchQuery += `_exists_:openfda.brand_name`;
  }

  if (manufacturer != "") {
    searchQuery += searchQuery
      ? `+AND+openfda.manufacturer_name:*${manufacturer}*`
      : `openfda.manufacturer_name:*${manufacturer}*`;
  }

  if (substance != "") {
    searchQuery += searchQuery
      ? `+AND+openfda.substance_name:*${substance}*`
      : `openfda.substance_name:*${substance}*`;
  }
  const response = await fetch(
    `${BASE_URL}?search=${searchQuery}&skip=${skip}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("No result found");
  }
  return response.json();
};
