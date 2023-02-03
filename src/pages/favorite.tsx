import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type Props = {};

const Favorite = () => {
  const items = useSelector((state: RootState) => state.favorite.items);

  console.log(items);

  return <div>favorite</div>;
};

export default Favorite;
