/* eslint-disable @next/next/no-img-element */
import { ISong } from "@/common/models/interfaces";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  data: ISong[];
  header: string;
}

const RenderLyricsList: FC<Props> = ({ data, header }) => {
  return (
    <>
      <h2 className="px-5 md:px-10 text-xl text-black dark:text-primary font-semibold font-Crimson capitalize">
        {header}
      </h2>
      <div className="w-full mx-auto grid grid-cols-2 sm:grid-cols-5 gap-6 px-5 md:px-10 mt-6 font-Crimson dark:text-primary">
        {data.map((item) => (
          <div key={item.__id__} className="my-4">
            <Link href={`${"/lyrics/" + item.__id__}`}>
              <img
                src={item.artwork}
                alt="artwork"
                className="rounded-lg shadow-lg hover:scale-105 w-auto h-auto object-cover cursor-pointer"
              />
            </Link>
            <p className="text-sm sm:text-xs md:text-sm  mt-4 font-medium text-black capitalize dark:text-primary">
              {item.trackName}
            </p>
            <p className="text-sm sm:text-xs md:text-sm  text-lightBlack">
              {item.artistName}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default RenderLyricsList;
