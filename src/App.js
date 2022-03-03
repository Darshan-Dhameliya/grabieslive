import React, { useEffect, useReducer, useMemo } from "react";
import {
  themeReducer,
  initialState,
  ThemeContext,
} from "./provider/themeContext";
import {
  AuthReducer,
  AuthStateProvider,
  UserContext,
} from "./provider/UserContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AOS from "aos";
import { ToastContainer } from "react-toastify";
import Router from "./Router";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "aos/dist/aos.css";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const [AuthState, AuthDispatch] = useReducer(AuthReducer, AuthStateProvider);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          button: {
            textTransform: "none",
          },
          h3: {
            "@media (max-width:600px)": {
              fontSize: "1.5rem",
            },
          },
        },
        palette: {
          primary: {
            main: state.color,
          },
          mode: state.darkMode ? "dark" : "light",
        },
      }),
    [state.darkMode, state.color]
  );

  useMemo(
    () =>
      (document.body.style.backgroundColor = state.darkMode
        ? "#0D1117"
        : "#F5F5F5"),
    [state.darkMode]
  );

  useEffect(() => {
    AOS.init({
      duration: 1000,
      disable: window.innerWidth < 1024 ? true : false,
    });
  }, []);

  return (
    <>
      <UserContext.Provider value={{ AuthState, AuthDispatch }}>
        <ThemeContext.Provider value={{ state, dispatch }}>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </ThemeContext.Provider>
      </UserContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        limit={3}
        pauseOnHover
      />
    </>
  );
}

export default App;
