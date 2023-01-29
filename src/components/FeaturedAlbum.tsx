/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { IAlbum } from "@/libs/interfaces";

interface Props {
  data: [];
}

const FeaturedAlbum: FC<Props> = ({ data }) => {
  return (
    <>
      <h2 className="px-10 mt-16 text-xl text-black font-semibold">
        New Albums
      </h2>
      <div className="w-full mx-auto grid grid-cols-4 gap-6 px-10 mt-6 mb-6 font-Lato">
        {data.slice(0, 5).map((item: IAlbum, index) => (
          <div key={index}>
            <img
              src={item[0].artwork}
              alt="artwork"
              className="rounded-lg shadow-lg hover:scale-95 cursor-pointer"
            />
            <p className="text-sm my-2 font-bold text-black">
              {item[0].AlbumName}
            </p>
            <p className="text-sm my-2 text-lightBlack">{item[0].artistName}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedAlbum;
