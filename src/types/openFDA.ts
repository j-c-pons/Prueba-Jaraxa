export interface OpenFDADrug {
  openfda: {
    brand_name: string[];
    generic_name: string[];
    manufacturer_name: string[];
  };
  purpose: string[];
  warnings: string[];
}

export interface OpenFDAResponse {
  results: OpenFDADrug[];
  meta: {
    results: {
      total: number;
    };
  };
}
