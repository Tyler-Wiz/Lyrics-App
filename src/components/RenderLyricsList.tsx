/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { FC } from "react";
import { ISong } from "@/libs/interfaces";

interface Props {
  data: [ISong];
  header: string;
}

const RenderLyricsList: FC<Props> = ({ data, header }) => {
  return (
    <>
      <h2 className="px-10 mt-6 text-xl text-black dark:text-primary font-semibold font-Crimson capitalize">
        {header}
      </h2>
      <div className="w-full mx-auto grid grid-cols-5 gap-6 px-10 mt-6 font-Crimson dark:text-primary">
        {data.map((item) => (
          <div key={item.id} className="my-4">
            <Link href={`${"/lyrics/" + item.id}`}>
              <img
                src={item.artwork}
                alt="artwork"
                className="rounded-lg shadow-lg hover:scale-105 cursor-pointer"
              />
            </Link>
            <p className="text-sm mt-4 font-medium text-black capitalize dark:text-primary">
              {item.trackName}
            </p>
            <p className="text-sm text-lightBlack">{item.artistName}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default RenderLyricsList;
