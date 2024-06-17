import { OpenFDAResponse } from "../types/type";

const BASE_URL = "https://api.fda.gov/drug/label.json";

export const searchDrugs = async (
  query: string,
  skip: number = 0,
  limit: number = 10
): Promise<OpenFDAResponse> => {
  const response = await fetch(
    `${BASE_URL}?search=openfda.brand_name:*${query}*&skip=${skip}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("No result found");
  }
  return response.json();
};
