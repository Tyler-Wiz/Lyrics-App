/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Link from "next/link";
import { ISong } from "@/common/models/interfaces";
import Image from "next/image";

interface Props {
  data: [ISong];
}

const NewSingle: FC<Props> = ({ data }) => {
  return (
    <>
      <h2 className="px-5 md:px-10 mt-16 text-xl text-black font-semibold dark:text-primary">
        New Lyrics
      </h2>
      <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-6 sm:grid-cols-3 gap-6 px-5 md:px-10 mt-6 mb-20 font-Crimson">
        {data.slice(0, 6).map((item: ISong) => (
          <div key={item.id}>
            <Link href={`${"/lyrics/" + item.id}`}>
              <div className="relative w-52 h-52 md:w-40 md:h-40 sm:w-44 sm:h-44">
                <Image
                  src={item.artwork}
                  alt="artwork"
                  fill
                  className="rounded-lg shadow-lg hover:scale-105 w-full h-full object-cover cursor-pointer"
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
