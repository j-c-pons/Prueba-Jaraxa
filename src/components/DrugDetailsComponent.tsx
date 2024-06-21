import { OpenFDADrug } from "../types/openFDA";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { formatKey, isHTML } from "../utils";
interface DrugDetailProps {
  drug: OpenFDADrug;
}

export const DrugDetailComponent: React.FC<DrugDetailProps> = ({ drug }) => {
  const renderProperties = (obj: OpenFDADrug, firstTitle?: Boolean) => {
    return Object.entries(obj).map(([key, value]) =>
      renderProperty(key, value, firstTitle)
    );
  };

  const renderProperty = (
    key: string,
    value: OpenFDADrug,
    firstTitle?: Boolean
  ) => {
    const formattedKey = formatKey(key);
    if (Array.isArray(value)) {
      return (
        <List
          key={key}
          sx={{ backgroundColor: "#f5f5f5", borderRadius: 2, p: 2, mb: 2 }}
        >
          <Typography
            variant={firstTitle ? "h5" : "inherit"}
            sx={{ fontWeight: "bold" }}
          >
            {formattedKey}:
          </Typography>
          {value.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ textAlign: "center" }}>
              <div style={{ margin: "auto" }}>
                {(() => {
                  if (typeof item === "object") {
                    renderProperties(item, false);
                  } else if (item === true) {
                    return "Yes";
                  } else if (item === false) {
                    return "No";
                  } else if (isHTML(item)) {
                    return <span dangerouslySetInnerHTML={{ __html: item }} />;
                  } else {
                    return item;
                  }
                })()}
              </div>
            </ListItem>
          ))}
        </List>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <List
          key={key}
          sx={{ backgroundColor: "#f5f5f5", borderRadius: 2, p: 2, mb: 2 }}
        >
          <Typography
            variant={firstTitle ? "h5" : "inherit"}
            sx={{ fontWeight: "bold" }}
          >
            {formattedKey}:
          </Typography>
          {renderProperties(value, false)}
        </List>
      );
    } else {
      return (
        <List
          key={key}
          disablePadding
          sx={{ backgroundColor: "#f5f5f5", borderRadius: 2, p: 2, mb: 2 }}
        >
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {formattedKey}:
            <ListItem key={key} disablePadding sx={{ textAlign: "center" }}>
              <ListItemText primary={value} />
            </ListItem>
          </Typography>
        </List>
      );
    }
  };

  return <List>{renderProperties(drug, true)}</List>;
};
