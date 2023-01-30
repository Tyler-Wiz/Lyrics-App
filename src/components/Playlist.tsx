import Link from "next/link";
import React from "react";
import { playlistsData } from "@/data/data";

const Playlist = () => {
  return (
    <>
      <h2 className="px-10 text-xl text-black font-semibold font-Crimson">
        Playlist
      </h2>
      <div className="px-10 grid grid-cols-5 gap-6 text-center mt-6 mb-20 font-Crimson">
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
