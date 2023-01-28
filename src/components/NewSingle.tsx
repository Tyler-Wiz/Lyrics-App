/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { ISong } from "@/libs/interfaces";

interface Props {
  data: [ISong];
}

const NewSingle: FC<Props> = ({ data }) => {
  const newLyrics = data.filter((item: any) => {
    if (item.category.includes("new")) {
      return item;
    }
  });

  return (
    <>
      <h2 className="px-10 mt-6 text-xl text-black font-semibold">
        New Lyrics
      </h2>
      <div className="w-full mx-auto grid grid-cols-4 gap-6 px-10 mt-6 font-Lato">
        {newLyrics.slice(0, 4).map((item: ISong) => (
          <div key={item.id}>
            <img
              src={item.artwork}
              alt="artwork"
              className="rounded-lg shadow-lg"
            />
            <p className="text-sm my-2 font-bold text-black">
              {item.trackName}
            </p>
            <p className="text-sm my-2 text-lightBlack">{item.artistName}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewSingle;
