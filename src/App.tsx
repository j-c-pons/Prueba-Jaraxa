// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchComponent from "./components/SearchComponent";
import DrugDetailsPage from "./components/DrugDetailsPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchComponent />} />
      <Route path="/drug/:drugName" element={<DrugDetailsPage />} />
    </Routes>
  );
};

export default App;
