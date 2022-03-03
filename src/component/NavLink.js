import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/styles";

export default function NavLink(props) {
  const theme = useTheme();

  return (
    <Typography
      variant="span"
      //   component="div"
      color={theme.palette.primary.main}
      className="mt-1 cursor-pointer"
      onClick={props.onClick}
    >
      {props.title}
    </Typography>
  );
}
