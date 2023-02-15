/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import React from "react";
import Layout from "@/components/client/common/Layout";
import { getAlbums, getSongs } from "@/api/data";
import { ISong } from "@/common/models/interfaces";
import ArtistLyrics from "@/components/client/lyrics/ArtistLyrics";

type Props = {
  album: any;
  albumSongs: [ISong];
};

const AlbumPage: NextPage<Props> = ({ album, albumSongs }) => {
  return (
    <Layout
      title={album[0].albumName}
      content={`Latest ${album[0].albumName} lyrics`}>
      <div className="text-xs px-10 mt-10 flex flex-col md:flex-row items-center font-Poppins gap-2">
        <div className="w-72 h-72">
          <img
            src={album[0].artwork}
            alt="artist Image"
            className="object-cover h-full"
          />
        </div>
        <div className="md:w-1/4 flex flex-col items-center md:items-start text-center md:text-justify capitalize text-lg">
          <p>{album[0].albumName}</p>
          <div className="my-2 gap-3">
            <p className="text-lg">
              {albumSongs.length}
              <span className="ml-2 text-sm text-lightBlack text-center">
                Songs
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="px-10 my-10">
        <ArtistLyrics data={albumSongs} />
      </div>
    </Layout>
  );
};

export default AlbumPage;

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const { id } = params;
  const data = await getSongs();
  const albumData = await getAlbums();

  const album = albumData.filter((item: any) => {
    if (item.id?.includes(id)) {
      return item;
    }
  });

  const albumSongs = data.filter((item: any) => {
    if (item.album?.includes(album[0].albumName)) {
      return item;
    }
  });

  return {
    props: {
      albumSongs,
      album,
    },
  };
};
