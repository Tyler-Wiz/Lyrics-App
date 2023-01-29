import Image from "next/image";
import React from "react";
import { RxPerson } from "react-icons/rx";
import {
  RiCompassDiscoverLine,
  RiFireLine,
  RiMusic2Line,
  RiAlbumLine,
  RiSearchLine,
  RiLoginBoxLine,
  RiSettings5Line,
  RiToggleLine,
} from "react-icons/ri";
import playStore from "@/assets/img/playStore.png";
import Link from "next/link";

const NavData = [
  { name: "discover", icon: <RiCompassDiscoverLine />, path: "/" },
  { name: "trending", icon: <RiFireLine />, path: "/" },
  { name: "new lyrics", icon: <RiMusic2Line />, path: "/lyrics" },
  { name: "artist", icon: <RxPerson />, path: "/" },
  { name: "album", icon: <RiAlbumLine />, path: "/" },
];

const userData = [
  { name: "login", icon: <RiLoginBoxLine /> },
  { name: "settings", icon: <RiSettings5Line /> },
];

const Nav = () => {
  return (
    <nav className="h-screen shadow-xl flex flex-col py-12 bg-navbackground justify-between font-Lato px-6">
      <div>
        <div className="relative">
          <input
            className="w-full outline-none bg-transparent py-2 rounded-lg text-black px-2 border border-secondary"
            placeholder="Search"
          />
          <RiSearchLine
            size={20}
            className="text-black font-light text-xl capitalize absolute top-[25%] right-2"
          />
        </div>
        <p className="text-sm my-8 text-lightBlack">Music</p>
        <ul className="flex flex-col gap-6">
          {NavData.map((item, index) => (
            <Link href={item.path} key={index}>
              <li className="flex items-center gap-2 cursor-pointer">
                <p className="text-black font-regular text-xl capitalize">
                  {item.icon}
                </p>
                <p className="text-black text-[15px] font-regular capitalize ">
                  {item.name}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <ul className="flex flex-col gap-4">
        {userData.map((item, index) => (
          <li className="flex items-center gap-2 cursor-pointer" key={index}>
            <p className="text-black font-regular text-xl capitalize">
              {item.icon}
            </p>
            <p className="text-black text-[15px] font-regular capitalize ">
              {item.name}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <RiToggleLine size={30} className="cursor-pointer" />
        <p>Dark Theme</p>
      </div>
      <div className="relative w-48 h-auto cursor-pointer self-center">
        <Image src={playStore} alt="playLogo" />
      </div>
    </nav>
  );
};

export default Nav;
