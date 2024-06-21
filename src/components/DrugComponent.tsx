import { useLocation, useNavigate } from "react-router-dom";
import { DrugDetailComponent } from "./DrugDetailsComponent";
import {
  Container,
  Typography,
  Button,
  List,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { OpenFDADrug } from "../types/openFDA";

const DrugDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const drug = location.state?.drug as OpenFDADrug;

  if (!drug) {
    return (
      <Container>
        <Typography variant="h5">Drug not found</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ marginBottom: 2 }}
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
      <Card sx={{ marginTop: "15px" }}>
        <CardHeader
          title="Drug Details"
          sx={{ backgroundColor: "#3f51b5", color: "#fff" }}
        />
        <CardContent>
          <List>{<DrugDetailComponent drug={drug} />}</List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DrugDetailsPage;
