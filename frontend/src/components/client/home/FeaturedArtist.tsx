/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Link from "next/link";
import { IArtists } from "@/common/models/interfaces";
import Image from "next/image";

type Props = {
  data: [IArtists];
};

const FeaturedArtist: FC<Props> = ({ data }) => {
  return (
    <section className="w-full mx-auto mt-10 flex flex-col justify-center items-center px-5">
      <h2 className="text-xl text-black font-semibold self-start">
        Top Artists
      </h2>
      <div className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-10 gap-6 mt-6 mb-20 font-Poppins">
        {data.map((item) => (
          <div key={item.id} className="">
            <Link href={`${"/artist/" + item.id}`}>
              <div className="relative w-20 h-20 md:w-24 md:h-24 ">
                <Image
                  src={item.url}
                  alt="artwork"
                  fill
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
    </section>
  );
};

export default FeaturedArtist;
