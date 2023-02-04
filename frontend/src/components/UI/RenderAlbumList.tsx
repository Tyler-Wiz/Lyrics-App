/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IAlbum } from "@/libs/interfaces";
import { FC } from "react";
import Link from "next/link";

type Props = {
  data: [IAlbum];
  finalNumber: number;
  initialNumber: number;
  title: string;
};

const RenderAlbumList: FC<Props> = ({
  data,
  initialNumber,
  finalNumber,
  title,
}) => {
  return (
    <>
      <h2 className="px-5 md:px-10 mt-16 text-xl text-black font-semibold dark:text-primary">
        {title}
      </h2>
      <div className="w-full mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 px-5 md:px-10 mt-6 font-Crimson dark:text-primary">
        {data.slice(initialNumber, finalNumber).map((item: IAlbum, index) => (
          <Link key={index} href={`${"/album/" + item.id}`}>
            <div>
              <img
                src={item.artwork}
                alt="artwork"
                className="rounded-lg shadow-lg hover:scale-95 cursor-pointer"
              />
              <p className="text-sm my-2 font-medium text-black dark:text-primary">
                {item.albumName}
              </p>
              <p className="text-sm my-2 text-lightBlack">{item.artistName}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RenderAlbumList;
