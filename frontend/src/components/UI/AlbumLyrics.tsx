/* eslint-disable @next/next/no-img-element */
import { ISong } from "@/libs/interfaces";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineHeart, AiOutlineMore } from "react-icons/ai";

type Props = {
  data: [ISong];
  id: string;
};

const AlbumLyrics: FC<Props> = ({ data, id }) => {
  return (
    <div>
      <div className="flex my-10 items-center gap-4">
        <div className="w-72 h-72">
          <img src={data[0].artwork} alt="Album image" />
        </div>
        <div className="font-Crimson capitalize">
          <p className="text-2xl">Album Name: {data[0].album} </p>
          <p>Songs: {data.length}</p>
          <p>release Date: 2022 </p>
        </div>
      </div>
      <div className="mb-20">
        {data.map((item, index) => {
          let number = index + 1;
          return (
            <Link key={index} href={`${`/album/lyrics/${id}/` + item.id}`}>
              <div className="flex gap-2 items-center py-1">
                <p className="w-[2%] text-sm text-lightBlack">{number}</p>
                <div className="flex w-[5%]">
                  <div className="w-12 h-12">
                    <img src={item.artwork} alt="artist Image" />
                  </div>
                </div>
                <div className="w-[40%]">
                  <p className="text-sm">{item.trackName}</p>
                </div>
                <div className="w-[40%]">
                  <p className="text-sm">{item.artistName}</p>
                </div>
                <div className="w-[13%] flex gap-2">
                  <AiOutlineHeart />
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
