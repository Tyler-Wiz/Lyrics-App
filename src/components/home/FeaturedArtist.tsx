/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { IArtists } from "@/libs/interfaces";
import Link from "next/link";

type Props = {
  data: [IArtists];
};

const FeaturedArtist: FC<Props> = ({ data }) => {
  return (
    <>
      <h2 className="px-10 mt-10 text-xl text-black font-semibold">
        Top Artists
      </h2>
      <div className="w-full mx-auto grid md:grid-cols-10 gap-6 px-10 mt-6 mb-20 font-Crimson sm:grid-cols-3">
        {data.map((item) => (
          <div key={item.id} className="">
            <Link href={`${"/artist/" + item.id}`}>
              <img
                src={item.url}
                alt="artwork"
                className="rounded-full shadow-lg hover:scale-105 cursor-pointer object-cover"
              />
              <p className="text-xs my-2 text-center font-medium text-black capitalize dark:text-primary">
                {item.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedArtist;
