/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { ISong } from "@/libs/interfaces";

interface Props {
  data: [ISong];
}

const Trending: FC<Props> = ({ data }) => {
  const trending = data.filter((item: any) => {
    if (item.tag.includes("trending")) {
      return item;
    }
  });

  return (
    <>
      <h2 className="px-10 mt-10 text-xl text-black font-semibold">
        Trending Lyrics
      </h2>
      <div className="w-full mx-auto grid grid-cols-5 gap-6 px-10 mt-6 font-Lato">
        {trending.map((item) => (
          <div key={item.id}>
            <img
              src={item.artwork}
              alt="artwork"
              className="rounded-lg shadow-lg"
            />
            <p className="text-sm my-2 font-bold text-black capitalize">
              {item.trackName}
            </p>
            <p className="text-sm my-2 text-lightBlack">{item.artistName}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Trending;
