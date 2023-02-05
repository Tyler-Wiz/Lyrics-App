import Link from "next/link";
import React from "react";
import { playlistsData } from "@/data/data";

const Playlist = () => {
  return (
    <>
      <h2 className="px-5 md:px-10 mt-10 text-xl text-black font-semibold font-Crimson">
        Playlist
      </h2>
      <div className="w-full mx-auto grid grid-cols-2 text-center sm:grid-cols-5 gap-6 px-5 md:px-10 my-10 font-Crimson dark:text-primary">
        {playlistsData.map((item, index) => (
          <div key={index}>
            <Link href={`${"/playlist/" + item.name}`}>
              <p className=" bg-lightGrey py-2 capitalize rounded-lg cursor-pointer hover:bg-lightBlack hover:text-white">
                {item.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Playlist;
