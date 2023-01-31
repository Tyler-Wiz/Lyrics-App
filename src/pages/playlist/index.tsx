/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import React from "react";
import { playlistsData } from "@/data/data";
import Link from "next/link";
import Image from "next/image";

type Props = {};

const Index: NextPage = (props: Props) => {
  return (
    <Layout title="Playlist" content="All Playlist">
      <>
        <h2 className="px-10 mt-20 text-xl text-black font-semibold font-Crimson dark:text-primary">
          All Playlist
        </h2>
        <div className="px-10 grid grid-cols-4 gap-6 text-center mt-6 mb-20">
          {playlistsData.map((item, index) => (
            <div key={index}>
              <Link href={`${"/playlist/" + item.name}`}>
                <Image
                  src={item.icon}
                  alt="playlist image"
                  className="rounded-lg shadow-lg hover:scale-95 cursor-pointer"
                />
                <p className="py-2 capitalize">{item.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </>
    </Layout>
  );
};

export default Index;
