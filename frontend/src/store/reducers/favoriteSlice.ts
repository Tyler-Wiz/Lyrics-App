import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISong } from "@/common/models/interfaces";
import { toast } from "react-toastify";
import { getFromLocalStorage } from "@/common/hooks/useLocalStorage";

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
      const inititalProduct = { ...action.payload };
      state.items.push(inititalProduct);
      toast.success("Added to favorite", {
        position: "bottom-left",
      });
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    removeFavorite: (state, action: PayloadAction<ISong>) => {
      const itemIndex = state.items.findIndex(
        (x) => x.__id__ === action.payload.__id__
      );
      if (itemIndex >= 0) {
        const newCartItems = state.items.filter(
          (x) => x.__id__ !== action.payload.__id__
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
