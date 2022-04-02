import React, { useContext, useState } from "react";
import {
  Toolbar,
  Button,
  List,
  Box,
  AppBar,
  Badge,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Drawer,
  Paper,
} from "@mui/material";
import { ThemeContext } from "../../provider/themeContext";
import DarkModeToggle from "react-dark-mode-toggle";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/styles";
import { RiUserReceivedLine } from "react-icons/ri";
import { UserContext } from "../../provider/UserContext";

export default function Navbar() {
  const { state, dispatch } = useContext(ThemeContext);
  const { AuthState, userType, AuthDispatch } = useContext(UserContext);

  const theme = useTheme();
  let Navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [sideDrawerWidth, setSideDrawerWidth] = useState("0%");

  const ListItemSideBar = {
    user: [
      {
        title: "Home",
        onClick: () => {
          Navigate("/client/homepage");
          setSideDrawerWidth("0%");
        },
      },
      {
        title: "Booked Services",
        onClick: () => {
          Navigate("/client/bookedservice");
          setSideDrawerWidth("0%");
        },
      },
      {
        title: "Completed Services",
        onClick: () => {
          Navigate("/client/completedservice");
          setSideDrawerWidth("0%");
        },
      },
      {
        title: "Change Password",
        onClick: () => {
          Navigate("/client/ChangePassword");
          setSideDrawerWidth("0%");
        },
      },
      { title: "LogOut", onClick: () => LogOut() },
    ],
    emp: [
      {
        title: "Home",
        onClick: () => {
          Navigate("/emp/homepage");
          setSideDrawerWidth("0%");
        },
      },
      {
        title: "Completed Services",
        onClick: () => {
          Navigate("/emp/completeservice");
          setSideDrawerWidth("0%");
        },
      },
      {
        title: "Change Password",
        onClick: () => {
          Navigate("/emp/ChangePassword");
          setSideDrawerWidth("0%");
        },
      },
      { title: "LogOut", onClick: () => LogOut() },
    ],
    default: [
      { title: "Home", onClick: () => Navigate("/client/homepage") },
      { title: "Login/SignUp", onClick: () => Navigate("/login") },
      {
        title: "Login/Register As a professional",
        onClick: () => Navigate("/emp/login"),
      },
    ],
  };

  const LogOut = () => {
    setSideDrawerWidth("0%");
    AuthDispatch({ type: "isNotLoggedIn" });
    Navigate("/login");
  };

  const setIsDarkMode = () => {
    state.darkMode ? dispatch({ mode: "light" }) : dispatch({ mode: "dark" });
  };

  const changeColor = ({ target: { value } }) => {
    dispatch({ mode: "changecolor", color: value });
  };

  const MobileDrawer = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setopen(false)}
      onKeyDown={() => setopen(false)}
    >
      <Toolbar />
      <div className="d-flex flex-column">
        <List>
          {ListItemSideBar[AuthState.userType]?.map((text, index) => (
            <ListItem button key={index} onClick={text.onClick}>
              <ListItemText primary={text.title} />
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  );

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
      sx={{ flexGrow: 1 }}
      position={"sticky"}
      style={{ top: 0, left: 0, right: 0, zIndex: 12 }}
    >
      <AppBar position="sticky" enableColorOnDark color="primary">
        <Toolbar className="container">
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setopen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Paper className="cursor-pointer" onClick={() => NavigateToHome()}>
            <div className="logo"></div>
          </Paper>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box
            sx={{
              display: {
                xs: "none",
                md: AuthState.isLoggedIn ? "none" : "block",
              },
            }}
          >
            <Button
              color="inherit"
              onClick={() => Navigate("/login")}
              className="mx-3"
            >
              Login/SignUp
            </Button>
            <Button
              color="inherit"
              onClick={() => Navigate("/emp/login")}
              className="mx-3"
            >
              Login/Register As a professional
            </Button>
          </Box>
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
          <Box
            sx={{
              display: {
                xs: "none",
                md: AuthState.userType === "default" ? "none" : "block",
              },
            }}
          >
            <RiUserReceivedLine
              size={32}
              className="cursor-pointer me-2"
              onClick={() => setSideDrawerWidth("100%")}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setopen(false)}>
        {MobileDrawer()}
      </Drawer>
      {/* side menu */}
      <div id="myNav" className="overlay" style={{ width: sideDrawerWidth }}>
        <a
          className="closebtn cursor-pointer"
          onClick={() => setSideDrawerWidth("0%")}
        >
          &times;
        </a>
        <div className="overlay-content">
          {ListItemSideBar[AuthState.userType]?.map((item, index) => (
            <span key={index} onClick={item.onClick}>
              {item.title}
            </span>
          ))}
        </div>
      </div>
    </Box>
  );
}
