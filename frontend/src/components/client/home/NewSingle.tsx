/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Link from "next/link";
import { ISong } from "@/common/models/interfaces";

interface Props {
  data: [ISong];
}

const NewSingle: FC<Props> = ({ data }) => {
  return (
    <section>
      <h2 className="px-5 md:px-10 mt-16 text-xl text-black font-semibold dark:text-primary">
        New Lyrics
      </h2>
      <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-6 gap-6 px-5 md:px-10 mt-6 mb-20 font-Crimson">
        {data.slice(0, 6).map((item: ISong) => (
          <div key={item.id}>
            <Link href={`${"/lyrics/" + item.id}`}>
              <div className="md:w-40 md:h-40 w-auto h-48 ">
                <img
                  src={item.artwork}
                  alt="artwork"
                  className="rounded-lg shadow-lg hover:scale-105 w-full h-full object-cover cursor-pointer"
                />
              </div>
            </Link>
            <p className="text-sm my-2 font-medium text-black dark:text-primary capitalize">
              {item.trackName}
            </p>
            <p className="text-sm my-2 text-lightBlack ">{item.artistName}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewSingle;
