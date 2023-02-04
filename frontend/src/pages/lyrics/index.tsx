/* eslint-disable @next/next/no-img-element */
import React from "react";
import { NextPage } from "next";
import { ISong } from "@/libs/interfaces";
import Layout from "@/components/layout/Layout";
import RenderLyricsList from "@/components/UI/RenderLyricsList";
import { getSongs } from "@/api/data";

interface Props {
  newLyrics: [ISong];
}

const Index: NextPage<Props> = ({ newLyrics }) => {
  return (
    <Layout title="New Lyrics" content="Latest Lyrics from Around The Africa">
      <div className="mt-16">
        <RenderLyricsList data={newLyrics} header="New Lyrics" />
      </div>
    </Layout>
  );
};

export default Index;

export async function getServerSideProps() {
  const data = await getSongs();

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
