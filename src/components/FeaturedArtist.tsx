/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { IArtists } from "@/libs/interfaces";
import Image from "next/image";

type Props = {
  data: [IArtists];
};

const FeaturedArtist: FC<Props> = ({ data }) => {
  return (
    <>
      <h2 className="px-10 mt-10 text-xl text-black font-semibold">
        Top Artists
      </h2>
      <div className="w-full mx-auto grid grid-cols-12 gap-6 px-10 mt-6 mb-20 font-Lato">
        {data.map((item) => (
          <div key={item.id}>
            <img
              src={item.url}
              alt="artwork"
              className="rounded-full shadow-lg hover:scale-105 cursor-pointer"
            />
            <p className="text-xs my-2 font-bold text-black capitalize text-center">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedArtist;
