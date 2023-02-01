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
      <h2 className="px-5 md:px-10 mt-16 text-xl text-black font-semibold dark:text-primary">
        New Lyrics
      </h2>
      <div className="w-full mx-auto flex md:grid overflow-x-auto md:grid-cols-5 gap-6 px-5 md:px-10 mt-6 mb-20 font-Crimson">
        {data.slice(0, 5).map((item: ISong) => (
          <div key={item.id}>
            <Link href={`${"/lyrics/" + item.id}`}>
              <div className="w-40 h-auto md:w-auto md:h-auto">
                <img
                  src={item.artwork}
                  alt="artwork"
                  className="rounded-lg shadow-lg hover:scale-105 cursor-pointer"
                />
              </div>
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
