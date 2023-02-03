import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISong } from "@/libs/interfaces";
import { toast } from "react-toastify";
import { getFromLocalStorage } from "@/helpers/useLocalStorage";

type FavoriteState = {
  items: ISong[];
};

const initialState: FavoriteState = {
  items: getFromLocalStorage("items")
    ? JSON.parse(getFromLocalStorage("items")!)
    : [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    AddFavorite: (state, action: PayloadAction<ISong>) => {
      const itemIndex = state.items.findIndex(
        (x) => x.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].itemQuantity += 1;
        toast.success("Already Added to Favorite", {
          position: "bottom-left",
        });
      } else {
        const inititalProduct = { ...action.payload, itemQuantity: 1 };
        state.items.push(inititalProduct);
        toast.success("Added to favorite", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    removeFavorite: (state, action: PayloadAction<ISong>) => {
      const itemIndex = state.items.findIndex(
        (x) => x.id === action.payload.id
      );
      if (itemIndex >= 0) {
        const newCartItems = state.items.filter(
          (x) => x.id !== action.payload.id
        );
        state.items = newCartItems;
        localStorage.setItem("items", JSON.stringify(state.items));
        toast.error("Removed From favorite", {
          position: "bottom-left",
        });
      }
    },
  },
});

export const { AddFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
