import Image from "next/image";
import React from "react";
import { RxPerson } from "react-icons/rx";
import {
  RiCompassDiscoverLine,
  RiMusic2Line,
  RiAlbumLine,
  RiLoginBoxLine,
  RiSettings5Line,
  RiHeartLine,
} from "react-icons/ri";
import { MdQueueMusic } from "react-icons/md";
import playStore from "@/assets/img/playStore.png";
import Link from "next/link";
import ThemeSwitcher from "@/theme/ThemeSwitcher";

const NavData = [
  { name: "discover", icon: <RiCompassDiscoverLine />, path: "/" },
  { name: "new lyrics", icon: <RiMusic2Line />, path: "/lyrics" },
  { name: "artists", icon: <RxPerson />, path: "/artist" },
  { name: "albums", icon: <RiAlbumLine />, path: "/album/" },
  { name: "Playlist", icon: <MdQueueMusic />, path: "/playlist" },
  { name: "Favorite", icon: <RiHeartLine />, path: "/favorite" },
];

const userData = [
  { name: "Preference", icon: <RiSettings5Line /> },
  { name: "login", icon: <RiLoginBoxLine /> },
];

const Nav = () => {
  return (
    <nav className="h-screen shadow-xl md:flex flex-col py-12 bg-navbackground dark:bg-lightGrey dark:text-primary justify-between font-Crimson px-6">
      <div>
        <p className="text-sm my-8 text-lightBlack">Music</p>
        <ul className="flex flex-col gap-6">
          {NavData.map((item, index) => (
            <Link href={item.path} key={index}>
              <li className="flex items-center gap-2 cursor-pointer font-Crimson">
                <p className="text-black font-regular text-xl capitalize dark:text-primary">
                  {item.icon}
                </p>
                <p className="text-black text-[15px] font-regular font-lato capitalize dark:text-primary ">
                  {item.name}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sm my-8 text-lightBlack">Settings</p>
        <ul className="flex flex-col gap-4 font-Crimson mb-8">
          {userData.map((item, index) => (
            <li className="flex items-center gap-2 cursor-pointer" key={index}>
              <p className="text-black font-regular text-xl capitalize dark:text-primary">
                {item.icon}
              </p>
              <p className="text-black text-[15px] font-regular capitalize dark:text-primary">
                {item.name}
              </p>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <p className=" text-black dark:text-primary">Dark Theme</p>
        </div>
      </div>
      <div className="relative w-48 h-auto cursor-pointer self-center">
        <Image src={playStore} alt="playLogo" />
      </div>
    </nav>
  );
};

export default Nav;
