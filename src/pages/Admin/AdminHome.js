import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AdminHomepage from "./AdminHomepage";
import EmpDashBoard from "./EmpDashBoard";
import AppoDashBoard from "./AppoDashBoard";
import { ThemeContext } from "../../provider/themeContext";
import DarkModeToggle from "react-dark-mode-toggle";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/styles";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "../Common/PageNotFound";
import { ListItemButton, Paper } from "@mui/material";
import AddAdmin from "./AddAdmin";
import { UserContext } from "../../provider/UserContext";
import { styled } from "@mui/material/styles";
import AdminChangePass from "./AdminChangePass";

const drawerWidth = 240;

const CustomizedListItemButton = styled(ListItemButton)(
  ({ selected, theme }) => ({
    background: selected && `${theme.palette.primary.main} !important`,
    color: selected && `#fff`,
    transition: "all .5s",
  })
);

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { state, dispatch } = useContext(ThemeContext);
  const theme = useTheme();
  let Navigate = useNavigate();
  const [activeIndex, setactiveIndex] = useState(0);
  const { AuthDispatch } = useContext(UserContext);

  const [allData, setAllData] = useState([
    { totalcount: 0, title: "Home", navigate: "homepage" },
    {
      totalcount: 0,
      title: "Total Employee",
      apiRoute: "emplist",
      navigate: "empdash",
    },
    {
      totalcount: 0,
      title: "Verified Employee",
      apiRoute: "Verifiedemplist",
      navigate: "empdash",
    },
    {
      totalcount: 0,
      title: "Unverified Employee",
      apiRoute: "unVerifiedemplist",
      navigate: "empdash",
    },
    {
      totalcount: 0,
      title: "Booked Appoiments",
      apiRoute: "bookAppo",
      navigate: "appodash",
    },
    {
      totalcount: 0,
      title: "Completed Appoiments",
      apiRoute: "completAppo",
      navigate: "appodash",
    },
    {
      totalcount: 0,
      title: "Uncompleted Appoiments",
      apiRoute: "unCompleteAppo",
      navigate: "appodash",
    },
    { totalcount: 0, title: "Total User" },
    { totalcount: 0, title: "Add admin", navigate: "addadmin" },
    { totalcount: 0, title: "Change Password", navigate: "changepass" },
  ]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const setIsDarkMode = () => {
    state.darkMode ? dispatch({ mode: "light" }) : dispatch({ mode: "dark" });
  };
  const changeColor = ({ target: { value } }) => {
    dispatch({ mode: "changecolor", color: value });
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <Divider />
        {allData.map((text, index) => (
          <>
            <CustomizedListItemButton
              key={index}
              onClick={() => {
                handleDrawerToggle();
                setactiveIndex(index);
                Navigate(`/admin/${text.navigate}`, {
                  state: text.apiRoute,
                });
              }}
              selected={index === activeIndex}
              divider
            >
              <ListItemText primary={text.title} />
            </CustomizedListItemButton>
          </>
        ))}
        <ListItemButton
          onClick={() => {
            AuthDispatch({ type: "isNotLoggedIn" });
            Navigate("/login");
          }}
          divider
        >
          <ListItemText primary={"Log Out"} />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <Box>
      <AppBar
        position="sticky"
        enableColorOnDark
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          // height: 64,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Paper className="cursor-pointer">
            <div className="logo"></div>
          </Paper>
          <Box sx={{ flexGrow: 1 }}></Box>
          <DarkModeToggle
            onChange={setIsDarkMode}
            checked={state.darkMode}
            speed={1.3}
            size={60}
          />
          <div className="mx-3 color-picker-wrapper">
            <AutoFixHighIcon color={theme.palette.primary.main} />
            <input
              type="color"
              id="color-picker"
              value={state.color}
              onChange={changeColor}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: { xs: "none", sm: 30 }, //30=248px
        }}
      >
        <Routes>
          <Route
            path="/homepage"
            element={
              <AdminHomepage
                allData={allData}
                setAllData={setAllData}
                setactiveIndex={setactiveIndex}
              />
            }
          />
          <Route path="/empdash" element={<EmpDashBoard />} />
          <Route path="/changePass" element={<AdminChangePass />} />
          <Route path="/appodash" element={<AppoDashBoard />} />
          <Route path="/addAdmin" element={<AddAdmin />} />
          <Route path="/" element={<Navigate replace to="/admin/homepage" />} />
          {/* <Route
            path="*"
            element={
              <Box
                className="container"
                style={{ height: `${window.innerHeight - 120}px` }}
              >
                <PageNotFound />
              </Box>
            }
          /> */}
        </Routes>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
