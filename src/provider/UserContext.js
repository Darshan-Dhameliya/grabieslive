import { createContext } from "react";

export const UserContext = createContext();

const LocalData = JSON.parse(localStorage.getItem("Logininfo"));
const LocalCartData = JSON.parse(localStorage.getItem("cartItemData"));

export const AuthStateProvider = {
  isLoggedIn: LocalData ? LocalData.isLoggedIn : false,
  userType: LocalData ? LocalData.userType : "default",
  cartData: LocalCartData ? LocalCartData : {},
  userData: LocalData ? LocalData.userData : {},
  appoiMentdata: {},
};

export const AuthReducer = (state = AuthStateProvider, action) => {
  switch (action.type) {
    case "isLoggedIn":
      const SetLocalData = {
        isLoggedIn: true,
        userType: action.userType,
        userData: action.userData,
      };
      localStorage.setItem("Logininfo", JSON.stringify(SetLocalData));
      return {
        ...state,
        ...SetLocalData,
      };
    case "isNotLoggedIn":
      localStorage.removeItem("Logininfo");
      localStorage.removeItem("cartItemData");
      return {
        ...state,
        isLoggedIn: false,
        userType: "default",
        cartData: [],
        userData: [],
      };

    case "addItemCart":
      localStorage.setItem("cartItemData", JSON.stringify(action.item));

      return { ...state, cartData: action.item };

    case "setAppoData":
      return { ...state, appoiMentdata: action.item };

    default:
      return state;
  }
};
