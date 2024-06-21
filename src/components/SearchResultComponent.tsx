import { ChangeEvent } from "react";
import { OpenFDADrug } from "../types/openFDA";
import {
  Typography,
  List,
  ListItemText,
  Pagination,
  ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface DrugListProps {
  results: OpenFDADrug[];
  page: number;
  totalPage: number;
  totalResult: number;
  handleSearch: any;
}

const SearchResultComponent: React.FC<DrugListProps> = ({
  results,
  page,
  totalPage,
  totalResult,
  handleSearch,
}) => {
  const navigate = useNavigate();

  const handleDrugClick = (drug: OpenFDADrug) => {
    navigate(`/drug/${encodeURIComponent(drug.openfda.brand_name[0])}`, {
      state: { drug },
    });
  };

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    handleSearch(value);
  };

  return (
    <>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        {totalResult} results found:
      </Typography>
      <List>
        {results.map((drug, index) => (
          <ListItemButton key={index} onClick={() => handleDrugClick(drug)}>
            <ListItemText
              primary={drug.openfda.brand_name}
              secondary={
                drug.openfda.generic_name[0].length <= 30
                  ? drug.openfda.generic_name
                  : drug.openfda.generic_name[0].slice(0, 30) + "..."
              }
            />
          </ListItemButton>
        ))}
      </List>
      <Pagination count={totalPage} page={page} onChange={handlePageChange} />
    </>
  );
};

export default SearchResultComponent;
