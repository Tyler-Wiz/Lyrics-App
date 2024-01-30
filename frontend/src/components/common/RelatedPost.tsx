/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Link from "next/link";
import { ISong } from "@/common/models/interfaces";

type Props = {
  data: [];
};

const RelatedPost: FC<Props> = ({ data }) => {
  return (
    <div className="md:pr-20 mt-20">
      <h2 className="text-lg text-black dark:text-primary font-semibold mb-4 font-Crimson capitalize ">
        Related Post
      </h2>
      <div className="w-full mx-auto flex flex-col font-Crimson gap-2 dark:text-primary ">
        {data?.slice(0, 5).map((item: ISong) => (
          <Link key={item.id} href={`${"/lyrics/" + item.__id__}`}>
            <div className="py-2 flex gap-2 border-b-[.3px] items-center">
              <div className="relative w-16">
                <img
                  src={item.artwork}
                  alt="artwork"
                  className="rounded-lg shadow-lg hover:scale-105 cursor-pointer"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-black capitalize dark:text-primary">
                  {item.trackName}
                </p>
                <p className="text-xs text-lightBlack">{item.artistName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPost;
