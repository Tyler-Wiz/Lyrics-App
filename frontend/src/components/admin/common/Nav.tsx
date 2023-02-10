/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { RxPerson } from "react-icons/rx";
import {
  RiMusic2Line,
  RiAlbumLine,
  RiSearchLine,
  RiDashboardFill,
  RiUploadCloud2Line,
} from "react-icons/ri";
import { MdQueueMusic } from "react-icons/md";
import Link from "next/link";

const NavData = [
  { icon: <RiDashboardFill />, path: "/dashboard" },
  { icon: <RxPerson />, path: "/dashboard/artist" },
  { icon: <RiAlbumLine />, path: "/album/" },
  { icon: <MdQueueMusic />, path: "/dashboard/playlist" },
  { icon: <RiUploadCloud2Line />, path: "/dashboard/upload" },
];

const Nav = () => {
  return (
    <nav className="h-screen shadow-xl md:flex flex-col bg-black dark:bg-lightGrey dark:text-primary justify-between font-Crimson px-4">
      <div>
        <Link href="/dashboard">
          <div className=" w-12 h-auto mx-auto my-4">
            <img src="/logo.png" alt="main Logo" />
          </div>
        </Link>
        <ul className="flex flex-col gap-8 mt-10">
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
