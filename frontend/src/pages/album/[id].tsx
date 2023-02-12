import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Layout from "@/components/client/common/Layout";
import { getAlbums } from "@/api/data";
import AlbumLyrics from "@/components/client/album/AlbumLyrics";
import { IAlbumContent } from "@/common/models/interfaces";

type Props = {
  selectedAlbum: IAlbumContent;
  id: string;
};

const AlbumPage: NextPage<Props> = ({ selectedAlbum, id }) => {
  const data = selectedAlbum?.songs;
  const albumName = selectedAlbum?.albumName;
  const albumArtwork = selectedAlbum?.artwork;

  return (
    <Layout
      title={`${selectedAlbum.albumName} | ${selectedAlbum.artistName}`}
      content={`${selectedAlbum.albumName} | ${selectedAlbum.artistName}`}>
      <div className="mx-auto px-10">
        <AlbumLyrics
          data={data}
          id={id}
          albumName={albumName}
          albumArtwork={albumArtwork}
        />
      </div>
    </Layout>
  );
};

export default AlbumPage;

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const { id } = params;

  const data = await getAlbums();

  const selectedAlbum = data.find((x: any) => x.id === id);

  return {
    props: {
      id,
      selectedAlbum,
    },
  };
};
