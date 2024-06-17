import { useState } from "react";
import { searchDrugs } from "../service/ApiService";
import { OpenFDADrug } from "../types/type";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Alert,
} from "@mui/material";

import "../App.css";

function SearchComponent() {
  // const classes = useStyles();
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<OpenFDADrug[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = async (newPage: number = 1) => {
    setLoading(true);
    setError("");
    setPage(newPage);
    try {
      const data = await searchDrugs(query, (newPage - 1) * 10, 10);
      setResults(data.results);
      setTotalPages(Math.ceil(data.meta.results.total / 10));
      console.log(results);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error instanceof Error) setError(error.message);
    }
    setLoading(false);
  };

  const handleDrugClick = (drug: OpenFDADrug) => {
    navigate(`/drug/${encodeURIComponent(drug.openfda.brand_name[0])}`, {
      state: { drug },
    });
  };

  const handlePageChange = (event: any, value: any) => {
    handleSearch(value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        OpenFDA Drug Search
      </Typography>
      <TextField
        label="Search for a drug (brand name)"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSearch()}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Search"}
      </Button>
      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      )}
      {results.length > 0 && (
        <>
          <List>
            {results.map((drug, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleDrugClick(drug)}
              >
                <ListItemText
                  primary={drug.openfda.brand_name}
                  secondary={
                    drug.openfda.generic_name[0].length <= 30
                      ? drug.openfda.generic_name
                      : drug.openfda.generic_name[0].slice(0, 30) + "..."
                  }
                />
              </ListItem>
            ))}
          </List>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
}

export default SearchComponent;
