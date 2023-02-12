import { getAlbums } from "@/api/data";
import Layout from "@/components/client/common/Layout";
import RenderAlbumList from "@/components/client/album/RenderAlbumList";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { IAlbum } from "@/common/models/interfaces";

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

export const getServerSideProps: GetServerSideProps<{}> = async ({
  req,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const albums = await getAlbums();

  return {
    props: {
      albums,
    },
  };
};
