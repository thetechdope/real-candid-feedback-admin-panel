import React from "react";
import "./index.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";

const CardComponent = ({ bgColor, varient, varientNum }) => {
  return (
    <>
      <Card className="card" color="primary" sx={{ maxWidth: 265 }}>
        <CardActionArea className="card-action">
          <InventoryIcon
            style={{ backgroundColor: bgColor, color: "white" }}
            sx={{ fontSize: "30px" }}
          />

          <CardContent className="card-content">
            <Typography
              className="typo-prim"
              gutterBottom
              variant="h5"
              component="div"
              color="primary"
            >
              {varientNum}
            </Typography>

            <Typography
              className="typo-sec"
              variant="body2"
              color="text.secondary"
            >
              {varient}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
export default CardComponent;
