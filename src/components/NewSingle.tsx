/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { ISong } from "@/libs/interfaces";
import Link from "next/link";

interface Props {
  data: [ISong];
}

const NewSingle: FC<Props> = ({ data }) => {
  return (
    <>
      <h2 className="px-10 mt-16 text-xl text-black font-semibold dark:text-primary">
        New Lyrics
      </h2>
      <div className="w-full mx-auto grid grid-cols-5 gap-6 px-10 mt-6 font-Crimson">
        {data.slice(0, 5).map((item: ISong) => (
          <div key={item.id}>
            <Link href={`${"/lyrics/" + item.id}`}>
              <img
                src={item.artwork}
                alt="artwork"
                className="rounded-lg shadow-lg hover:scale-105 cursor-pointer"
              />
            </Link>
            <p className="text-sm my-2 font-medium text-black dark:text-primary">
              {item.trackName}
            </p>
            <p className="text-sm my-2 text-lightBlack ">{item.artistName}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewSingle;
