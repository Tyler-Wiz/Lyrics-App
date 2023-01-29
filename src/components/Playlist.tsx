import Link from "next/link";
import React from "react";

type Props = {};

const playlists = [
  { name: "Bedroom" },
  { name: "Workout" },
  { name: "Street" },
  { name: "Choplife" },
  { name: "Piano" },
  { name: "office" },
  { name: "female" },
  { name: "Motivational" },
  { name: "Drive" },
  { name: "Reggae" },
];

const Playlist = () => {
  return (
    <>
      <h2 className="px-10 text-xl text-black font-semibold font-Lato">
        Playlist
      </h2>
      <div className="px-10 grid grid-cols-5 gap-6 text-center mt-6 mb-20">
        {playlists.map((item, index) => (
          <div key={index}>
            <Link href={`${"/playlist/" + item.name}`}>
              <p className=" bg-lightGrey py-2 capitalize rounded-lg cursor-pointer">
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
