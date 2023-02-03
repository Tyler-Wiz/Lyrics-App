import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
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
import Link from "next/link";
import ThemeSwitcher from "@/theme/ThemeSwitcher";
import Image from "next/image";
import playStore from "@/assets/img/playStore.png";

type Props = {};

const NavData = [
  { name: "discover", icon: <RiCompassDiscoverLine />, path: "/" },
  { name: "new lyrics", icon: <RiMusic2Line />, path: "/lyrics" },
  { name: "artists", icon: <RxPerson />, path: "/artist" },
  { name: "albums", icon: <RiAlbumLine />, path: "/album/" },
  { name: "Playlist", icon: <MdQueueMusic />, path: "/playlist" },
  { name: "Favorite", icon: <RiHeartLine />, path: "/playlist" },
];

const userData = [
  { name: "Preference", icon: <RiSettings5Line /> },
  { name: "login", icon: <RiLoginBoxLine /> },
];

const MobileNav = (props: Props) => {
  const [modalVisible, setModalVisible] = useState<Boolean>(false);

  return (
    <div className="md:hidden">
      <RxHamburgerMenu
        size={35}
        onClick={() => setModalVisible(true)}
        className="cursor-pointer"
      />
      <div
        className={`fixed w-full h-full bg-white top-0 z-[9998] duration-700 shadow-lg ${
          modalVisible ? "left-0" : "left-[-1000px]"
        } `}>
        <nav className="h-screen flex flex-col bg-navbackground dark:bg-black dark:text-primary px-10 py-5 justify-between font-Crimson">
          <div>
            <MdClose size={35} onClick={() => setModalVisible(false)} />
            <p className="text-md my-8 text-lightBlack">Music</p>
            <ul className="flex flex-col gap-2">
              {NavData.map((item, index) => (
                <Link href={item.path} key={index}>
                  <li className="flex items-center gap-2 cursor-pointer font-Crimson">
                    <p className="text-black font-regular text-2xl capitalize dark:text-primary">
                      {item.icon}
                    </p>
                    <p className="text-black text-[25px] font-regular font-lato capitalize dark:text-primary ">
                      {item.name}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm my-4 text-lightBlack">Settings</p>
            <ul className="flex flex-col gap-4 font-Crimson mb-8">
              {userData.map((item, index) => (
                <li
                  className="flex items-center gap-2 cursor-pointer"
                  key={index}>
                  <p className="text-black font-regular text-2xl capitalize dark:text-primary">
                    {item.icon}
                  </p>
                  <p className="text-black text-[25px] font-regular capitalize dark:text-primary">
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
          <div className="relative w-48 h-auto  cursor-pointer self-center">
            <Image src={playStore} alt="playLogo" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
