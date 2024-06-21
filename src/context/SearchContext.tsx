import React, { createContext, useContext, useState, ReactNode } from "react";
import { OpenFDADrug } from "../types/openFDA";

interface SearchContextProps {
  brandName: string;
  manufacturer: string;
  substance: string;
  results: OpenFDADrug[];
  currentPage: number;
  totalPages: number;
  totalResult: number;
  setResults: (results: OpenFDADrug[]) => void;
  setBrandName: (brandName: string) => void;
  setManufacturer: (manufacturer: string) => void;
  setSubstance: (substance: string) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalResult: (totalResult: number) => void;
  setTotalPages: (totalPages: number) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [brandName, setBrandName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [substance, setSubstance] = useState("");
  const [results, setResults] = useState<OpenFDADrug[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResult, setTotalResult] = useState<number>(0);

  return (
    <SearchContext.Provider
      value={{
        brandName,
        manufacturer,
        substance,
        results,
        currentPage,
        totalPages,
        totalResult,
        setTotalResult,
        setBrandName,
        setManufacturer,
        setSubstance,
        setCurrentPage,
        setResults,
        setTotalPages,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
