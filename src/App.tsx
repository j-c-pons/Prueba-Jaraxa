// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchComponent from "./components/SearchComponent";
import DrugComponent from "./components/DrugComponent";
import { SearchProvider } from "./context/SearchContext";

const App: React.FC = () => {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<SearchComponent />} />
        <Route path="/drug/:drugName" element={<DrugComponent />} />
      </Routes>
    </SearchProvider>
  );
};

export default App;
