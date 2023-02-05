import Image from "next/image";
import React from "react";
import { RxPerson } from "react-icons/rx";
import {
  RiMusic2Line,
  RiAlbumLine,
  RiHeartLine,
  RiDashboardFill,
  RiUploadCloud2Line,
} from "react-icons/ri";
import { MdQueueMusic } from "react-icons/md";
import Link from "next/link";

const NavData = [
  { icon: <RiDashboardFill />, path: "/" },
  { icon: <RiMusic2Line />, path: "/lyrics" },
  { icon: <RxPerson />, path: "/artist" },
  { icon: <RiAlbumLine />, path: "/album/" },
  { icon: <MdQueueMusic />, path: "/playlist" },
  { icon: <RiUploadCloud2Line />, path: "/favorite" },
];

const Nav = () => {
  return (
    <nav className="h-screen shadow-xl md:flex flex-col py-12 bg-black dark:bg-lightGrey dark:text-primary justify-between font-Crimson px-4">
      <div>
        <ul className="flex flex-col gap-8">
          {NavData.map((item, index) => (
            <Link href={item.path} key={index}>
              <li className="gap-4 cursor-pointer font-Crimson">
                <p className="text-primary font-regular text-2xl capitalize">
                  {item.icon}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div></div>
    </nav>
  );
};

export default Nav;
