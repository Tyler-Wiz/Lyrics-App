/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { ISong } from "@/libs/interfaces";
import Link from "next/link";
import { getAllTracks } from "@/helpers/getFirebaseData";
import Layout from "@/components/Layout";
import RenderLyricsList from "@/components/RenderLyricsList";

interface Props {
  newLyrics: [ISong];
}

const Trending: FC<Props> = ({ newLyrics }) => {
  return (
    <Layout title="New Lyrics">
      <div className="mt-16">
        <RenderLyricsList data={newLyrics} header="New Lyrics" />
      </div>
    </Layout>
  );
};

export default Trending;

export async function getStaticProps() {
  const data = await getAllTracks();

  const newLyrics = data.filter((item: any) => {
    if (item.category.includes("new")) {
      return item;
    }
  });

  return {
    props: {
      newLyrics,
    },
  };
}
