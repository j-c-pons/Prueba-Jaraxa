import { useState } from "react";
import SearchResultComponent from "./SearchResultComponent";
import { useSearchContext } from "../context/SearchContext";
import { searchDrugs } from "../services/ApiService";

import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

import "../App.css";

const SearchComponent: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const {
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
  } = useSearchContext();

  const handleSearch = async (newPage: number = 1) => {
    setLoading(true);
    setError("");
    setCurrentPage(newPage);
    try {
      const data = await searchDrugs(
        brandName,
        manufacturer,
        substance,
        (newPage - 1) * 10,
        10
      );
      setResults(data.results);
      setTotalPages(Math.ceil(data.meta.results.total / 10));
      setTotalResult(data.meta.results.total);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        OpenFDA Drug Search
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <TextField
          label="Brand name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ maxWidth: 300 }}
        />
        <TextField
          label="Manufacturer"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ maxWidth: 300 }}
        />
        <TextField
          label="Active Substance"
          value={substance}
          onChange={(e) => setSubstance(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ maxWidth: 300 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSearch()}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Search"}
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      )}

      {results.length > 0 && (
        <SearchResultComponent
          totalResult={totalResult}
          totalPage={totalPages}
          results={results}
          page={currentPage}
          handleSearch={handleSearch}
        />
      )}
    </Container>
  );
};

export default SearchComponent;
