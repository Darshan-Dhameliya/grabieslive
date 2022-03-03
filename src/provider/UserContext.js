import { createContext } from "react";

export const UserContext = createContext();

const LocalData = JSON.parse(localStorage.getItem("Logininfo"));
const LocalCartData = JSON.parse(localStorage.getItem("cartItemData"));

export const AuthStateProvider = {
  isLoggedIn: LocalData ? LocalData.isLoggedIn : false,
  userType: LocalData ? LocalData.userType : "default",
  cartData: LocalCartData ? LocalCartData : [],
  userData: LocalData ? LocalData.userData : {},
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
      const CartJobTitle = state.cartData.length && state.cartData[0].jobtitle;

      if (CartJobTitle === action.item.jobtitle) {
        return { ...state, cartData: [...state.cartData, action.item] };
      } else {
        return { ...state, cartData: [action.item] };
      }
    case "removeItemCart":
      const afterRemove = state.cartData.filter(
        (item, index) => index !== action.id
      );
      return { ...state, cartData: afterRemove };

    default:
      return state;
  }
};
