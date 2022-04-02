import { createContext } from "react";

export const ThemeContext = createContext();

export const initialState = {
  darkMode: localStorage.getItem("prefermode")
    ? localStorage.getItem("prefermode") === "true"
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  color: localStorage.getItem("prefercolor") || "#0d6efd",
};

export const themeReducer = (state, action) => {
  switch (action.mode) {
    case "light":
      localStorage.setItem("prefermode", false);
      return { ...state, darkMode: false };
    case "dark":
      localStorage.setItem("prefermode", true);
      return { ...state, darkMode: true };
    case "changecolor":
      localStorage.setItem("prefercolor", action.color);
      return { ...state, color: action.color };
    default:
      return state;
  }
};
