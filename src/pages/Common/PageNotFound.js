import React, { useContext } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/styles";
import { Svg404 } from "./SvgProvide";
import CustomButton from "../../component/CustomButton";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../provider/UserContext";

export default function PageNotFound() {
  const theme = useTheme();
  let Navigate = useNavigate();
  const {
    AuthState: { userType },
  } = useContext(UserContext);

  const NavigateToHome = () => {
    if (userType === "emp") {
      Navigate("/emp/homepage");
    } else if (userType === "admin") {
      Navigate("/admin/homepage");
    } else if (userType === "user") {
      Navigate("/client/homepage");
    } else {
      Navigate("/client/homepage");
    }
  };

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      className="flex-column"
      style={{ height: "calc( 100% - 64px )" }}
      sx={{ padding: "20px" }}
    >
      <Svg404 color={theme.palette.primary.main} />
      <CustomButton label="Back To Homepage" onClick={() => NavigateToHome()} />
    </Box>
  );
}
