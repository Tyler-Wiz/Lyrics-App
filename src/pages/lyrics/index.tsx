/* eslint-disable @next/next/no-img-element */
import React from "react";
import { NextPage } from "next";
import { ISong } from "@/libs/interfaces";
import Link from "next/link";
import { getAllTracks } from "@/helpers/getFirebaseData";
import Layout from "@/components/layout/Layout";
import RenderLyricsList from "@/components/UI/RenderLyricsList";

interface Props {
  newLyrics: [ISong];
}

const Index: NextPage<Props> = ({ newLyrics }) => {
  return (
    <Layout title="New Lyrics">
      <div className="mt-16">
        <RenderLyricsList data={newLyrics} header="New Lyrics" />
      </div>
    </Layout>
  );
};

export default Index;

export async function getServerSideProps() {
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
