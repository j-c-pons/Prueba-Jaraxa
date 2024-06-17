import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { OpenFDADrug } from "../types/type";

const DrugDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const drug = location.state?.drug as OpenFDADrug;

  const formatKey = (key: string): string => {
    return key
      .split("_")
      .map((word, index) =>
        index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
      )
      .join(" ");
  };

  const renderProperty = (key: string, value: any) => {
    const formattedKey = formatKey(key);
    if (Array.isArray(value)) {
      return (
        <List key={key} style={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            {formattedKey}:
          </Typography>
          {value.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              style={{ textAlign: "center" }}
            >
              <div style={{ margin: "auto" }}>
                {typeof item === "object" ? renderProperties(item) : item}{" "}
              </div>

              {/* <ListItemText
                style={{ textAlign: "center" }}
                primary={
                  typeof item === "object" ? renderProperties(item) : item
                }
              /> */}
            </ListItem>
          ))}
        </List>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <List key={key} style={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            {formattedKey}:
          </Typography>
          {renderProperties(value)}
        </List>
      );
    } else {
      return (
        <List key={key} disablePadding style={{ textAlign: "center" }}>
          {/* <Typography
            variant="body1"
            style={{ textAlign: "center" }}
          >{`${formattedKey}: ${value}`}</Typography> */}
          <Typography
            variant="h5"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            {formattedKey}:
            <ListItem key={key} disablePadding style={{ textAlign: "center" }}>
              <ListItemText style={{ textAlign: "center" }} primary={value} />
            </ListItem>
          </Typography>
        </List>
      );
    }
  };

  const renderProperties = (obj: any) => {
    return Object.entries(obj).map(([key, value]) =>
      renderProperty(key, value)
    );
  };

  if (!drug) {
    return (
      <Container>
        <Typography variant="h5">Drug not found</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ marginBottom: 2 }}
      >
        Go Back
      </Button>
      <Typography variant="h3" gutterBottom>
        {drug.openfda.brand_name ? drug.openfda.brand_name[0] : "Unknown Brand"}
      </Typography>
      <Typography variant="h6">
        Generic Name:{" "}
        {drug.openfda.generic_name ? drug.openfda.generic_name[0] : "Unknown"}
      </Typography>
      <Typography>General informations from the API:</Typography>
      {/* <Typography variant="body1">
        Purpose:{" "}
        {drug.purpose ? drug.purpose.join(", ") : "No information available"}
      </Typography>
      <Typography variant="body1">
        Warnings:{" "}
        {drug.warnings ? drug.warnings.join(", ") : "No information available"}
      </Typography>
      <Typography variant="body1">
        Manufacturer:{" "}
        {drug.openfda.manufacturer_name
          ? drug.openfda.manufacturer_name.join(", ")
          : "Unknown"}
      </Typography> */}
      <List>{renderProperties(drug)}</List>{" "}
    </Container>
  );
};

export default DrugDetailsPage;
