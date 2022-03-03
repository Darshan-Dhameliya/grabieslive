import React from "react";
import { Typography } from "@mui/material";
export default function ErrorMesage(props) {
  return (
    <Typography variant="p" color="#f44336" fontSize={14}>
      {props.children}
    </Typography>
  );
}
