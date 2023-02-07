import { getAlbums } from "@/api/data";
import Layout from "@/components/client/layout/Layout";
import RenderAlbumList from "@/components/client/ui/RenderAlbumList";
import { IAlbum } from "@/libs/interfaces";
import { NextPage } from "next";
import React from "react";

interface Props {
  albums: [IAlbum];
}

const Index: NextPage<Props> = ({ albums }) => {
  return (
    <Layout title="All Albums" content="All Albums">
      <RenderAlbumList
        data={albums}
        initialNumber={0}
        finalNumber={albums.length}
        title="All Albums"
      />
    </Layout>
  );
};

export default Index;

export async function getServerSideProps() {
  const albums = await getAlbums();

  return {
    props: {
      albums,
    },
  };
}
