/* eslint-disable @next/next/no-img-element */
import { ISong } from "@/common/models/interfaces";
import { AddFavorite } from "@/store/reducers/favoriteSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
import React, { FC } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMore } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  data: [ISong];
  id: string;
  albumName: string;
  albumArtwork: string;
};

const AlbumLyrics: FC<Props> = ({ data, id, albumName, albumArtwork }) => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.favorite.items);

  return (
    <div>
      <div className="flex my-5 gap-4">
        <div className="w-72 h-72">
          <img src={albumArtwork} alt="Album image" />
        </div>
        <div className="font-Crimson capitalize">
          <p className="text-xl md:text-xl">Album Name: {albumName} </p>
          <p>Songs: {data.length}</p>
          <p>release Date: 2022 </p>
        </div>
      </div>
      <div className="mb-20">
        {data.map((item, index) => {
          const ItemIndex = items.find((x) => x.id === item.id);
          let number = index + 1;
          return (
            <Link key={index} href={`${`/album/lyrics/${id}/` + item.id}`}>
              <div className="flex gap-2 items-center py-1">
                <p className="w-[2%] text-sm text-lightBlack">{number}</p>
                <div className="flex w-[13%] md:w-[5%]">
                  <div className="md:w-12 md:h-12 h-12 w-12">
                    <img src={albumArtwork} alt="artist Image" />
                  </div>
                </div>
                <div className="w-[40%]">
                  <p className="text-xs md:text-sm">{item.trackName}</p>
                </div>
                <div className="w-[40%]">
                  <p className="text-xs md:text-sm">{item.artistName}</p>
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
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumLyrics;
