import Layout from "@/components/layout/Layout";
import RenderAlbumList from "@/components/UI/RenderAlbumList";
import { getAllAlbums } from "@/helpers/getFirebaseData";
import { IAlbum } from "@/libs/interfaces";
import { NextPage } from "next";
import React from "react";

interface Props {
  data: [IAlbum];
}

const Index: NextPage<Props> = ({ data }) => {
  return (
    <Layout title="All Albums" content="All Albums">
      <RenderAlbumList
        data={data}
        initialNumber={0}
        finalNumber={data.length}
        title="All Albums"
      />
    </Layout>
  );
};

export default Index;

export async function getServerSideProps() {
  const data = await getAllAlbums();

  return {
    props: {
      data,
    },
  };
}
