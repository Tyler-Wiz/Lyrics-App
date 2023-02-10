/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Link from "next/link";
import { IArtists } from "@/common/models/interfaces";

type Props = {
  data: [IArtists];
};

const FeaturedArtist: FC<Props> = ({ data }) => {
  return (
    <>
      <h2 className="px-5 md:px-10 mt-10 text-xl text-black font-semibold">
        Top Artists
      </h2>
      <div className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-10 gap-6 px-5 md:px-10 mt-6 mb-20 font-Poppins">
        {data.map((item) => (
          <div key={item.id} className="">
            <Link href={`${"/artist/" + item.id}`}>
              <div className="w-20 h-auto md:w-auto md:h-auto">
                <img
                  src={item.url}
                  alt="artwork"
                  className="rounded-full shadow-lg hover:scale-105 cursor-pointer object-cover"
                />
              </div>
              <p className="text-[10px] mx-auto my-2 text-center text-black capitalize dark:text-primary">
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
