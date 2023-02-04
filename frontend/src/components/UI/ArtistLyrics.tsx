/* eslint-disable @next/next/no-img-element */
import { ISong } from "@/libs/interfaces";
import Link from "next/link";
import React, { FC, useState } from "react";
import { AiOutlineHeart, AiOutlineMore, AiFillHeart } from "react-icons/ai";
import Pagination from "./Pagination";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { AddFavorite } from "@/store/reducers/favoriteSlice";

type Props = {
  data: [ISong];
};

const ArtistLyrics: FC<Props> = ({ data }) => {
  const productPerPage = 10;
  const [currentPage, setcurrentPage] = useState<number>(1);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;

  const newData = [...data];
  const sortedData = newData.reverse();
  const pageProducts = sortedData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.favorite.items);

  return (
    <div>
      {pageProducts.map((item, index) => {
        let number = index + 1;
        const ItemIndex = items.find((x) => x.id === item.id);
        return (
          <div key={item.id} className="flex gap-2 items-center py-1">
            <p className="w-[2%] text-sm text-lightBlack">{number}</p>
            <Link href={`${"/lyrics/" + item.id}`} className="flex w-[5%]">
              <div className="w-12 h-12">
                <img src={item.artwork} alt="artist Image" />
              </div>
            </Link>
            <div className="w-[40%]">
              <p className="text-sm">{item.trackName}</p>
            </div>
            <div className="w-[40%]">
              <p className="text-sm">{item.artistName}</p>
            </div>
            <div className="w-[13%] flex gap-2 items-center">
              {ItemIndex ? (
                <AiFillHeart className="my-3 text-accentColor" />
              ) : (
                <AiOutlineHeart
                  onClick={() => dispatch(AddFavorite(item))}
                  className="cursor-pointer my-3 text-accentColor"
                />
              )}
              <AiOutlineMore />
            </div>
          </div>
        );
      })}
      {data.length <= 10 ? null : (
        <Pagination
          data={newData}
          productPerPage={productPerPage}
          currentPage={currentPage}
          setcurrentPage={setcurrentPage}
        />
      )}
    </div>
  );
};

export default ArtistLyrics;