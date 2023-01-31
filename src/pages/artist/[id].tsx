/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import {
  getAllTracks,
  getAllAlbums,
  getAllArtists,
} from "@/helpers/getFirebaseData";
import React, { FC } from "react";
import { ISong, IArtists, IAlbum } from "@/libs/interfaces";
import ArtistLyrics from "@/components/UI/ArtistLyrics";
import RenderAlbumList from "@/components/UI/RenderAlbumList";

type Props = {
  artist: [IArtists];
  artistSongs: [ISong];
  artistAlbums: [IAlbum];
};

const ArtistPage: NextPage<Props> = ({ artist, artistSongs, artistAlbums }) => {
  return (
    <Layout title={artist[0].name} content={`Latest ${artist[0].name} lyrics`}>
      <div className="px-10 mt-10 flex items-center font-Crimson w-full gap-2">
        <div className="w-72 h-72">
          <img
            src={artist[0].url}
            alt="artist Image"
            className="rounded-full object-cover h-full"
          />
        </div>
        <div className="w-3/4">
          <p className="text-3xl">{artist[0].name}</p>
          <div className="my-2 flex items-center gap-3">
            <p className="text-lg">
              {artistSongs.length}
              <span className="ml-2 text-sm text-lightBlack">Songs</span>
            </p>
            <span> - </span>
            {artistAlbums.length > 0 ? (
              <p className="text-lg">
                {artistAlbums.length}
                <span className="ml-2 text-sm text-lightBlack">Albums</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="px-10 my-10">
        <h2 className="text-lg my-2">Popular {artist[0].name} Songs</h2>
        <ArtistLyrics data={artistSongs} />
      </div>
      <div>
        {artistAlbums.length > 0 ? (
          <RenderAlbumList data={artistAlbums} />
        ) : null}
      </div>
    </Layout>
  );
};

export default ArtistPage;

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const { id } = params;
  const data = await getAllTracks();
  const albumData = await getAllAlbums();
  const artistData = await getAllArtists();

  const artist = artistData.filter((item: any) => {
    if (item.id?.includes(id)) {
      return item;
    }
  });
  const artistSongs = data.filter((item: any) => {
    if (item.artistName?.includes(artist[0].name)) {
      return item;
    }
  });

  const artistAlbums = albumData.filter((item: any) => {
    if (item[0].artistName?.includes(artist[0].name)) {
      return item;
    }
  });

  return {
    props: {
      artistSongs,
      artist,
      artistAlbums,
    },
  };
};
