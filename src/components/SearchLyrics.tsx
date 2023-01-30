/* eslint-disable @next/next/no-img-element */
import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { AllSongsConfig } from "@/firebase/allSongs-config";
import Link from "next/link";

const SearchLyrics = () => {
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [wordEntered, setWordEntered] = useState("");
  const [allSongs] = AllSongsConfig();

  const handleFilter = (event: any) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allSongs.filter((value: any) => {
      return (
        value.trackName.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.artistName.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="w-full px-16 flex justify-between items-center py-4 sticky border-b-[.3px] border-b-lightGrey">
      <div className="relative w-2/5 group">
        <input
          className="w-full outline-none py-2 rounded-lg font-Crimson text-black bg-lightGrey dark:text-primary px-2 text-xs"
          placeholder="Search"
          value={wordEntered}
          onChange={handleFilter}
        />
        <RiSearchLine
          size={13}
          className="text-black font-light dark:text-primary text-xl capitalize absolute top-[28%] right-3"
        />
        <div className="hidden group-hover:block z-50">
          <div className="w-full px-3 h-auto max-h-72 mx-auto overflow-scroll flex flex-col font-Crimson gap-2 dark:text-primary dark:bg-black absolute bg-navbackground shadow-md rounded-lg">
            {filteredData &&
              filteredData.map((item: any, index) => (
                <Link key={item.id} href={`${"/lyrics/" + item.id}`}>
                  <div className="py-2 flex gap-2 items-center">
                    <div className="relative w-12">
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
                      <p className="text-xs text-lightBlack">
                        {item.artistName}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div>
        <FaUserCircle size={30} />
      </div>
    </div>
  );
};

export default SearchLyrics;
