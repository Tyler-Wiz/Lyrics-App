/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, NextPage } from "next";
import Layout from "@/components/client/common/Layout";
import React from "react";
import Link from "next/link";
import { getPlaylist } from "@/api/data";
import { IPlaylist } from "@/common/models/interfaces";

type Props = {
  data: [IPlaylist];
};

const Index: NextPage<Props> = ({ data }) => {
  return (
    <Layout title="Playlist" content="All Playlist">
      <>
        <h2 className="px-10 mt-20 text-xl text-black font-semibold font-Crimson dark:text-primary">
          All Playlist
        </h2>
        <div className="text-center mt-6 mb-20 px-5 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <div key={index}>
              <Link href={`${"/playlist/" + item.name}`}>
                <img
                  src={item.imageUrl}
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

export const getServerSideProps: GetServerSideProps<{}> = async ({
  req,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const data = await getPlaylist();

  return {
    props: {
      data,
    },
  };
};
