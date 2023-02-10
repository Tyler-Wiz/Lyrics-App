/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Layout from "@/components/client/common/Layout";
import React from "react";
import ArtistLyrics from "@/components/client/lyrics/ArtistLyrics";
import RenderAlbumList from "@/components/client/album/RenderAlbumList";
import { getAlbums, getArtists, getSongs } from "@/api/data";
import { IAlbum, IArtists, ISong } from "@/common/models/interfaces";

type Props = {
  artist: [IArtists];
  artistSongs: [ISong];
  artistAlbums: [IAlbum];
};

const ArtistPage: NextPage<Props> = ({ artist, artistSongs, artistAlbums }) => {
  return (
    <Layout title={artist[0].name} content={`Latest ${artist[0].name} lyrics`}>
      <div className="px-10 mt-10 flex flex-col md:flex-row md:text-justify text-center items-center font-Crimson w-full gap-2">
        <div className="w-72 h-72">
          <img
            src={artist[0].url}
            alt="artist Image"
            className="object-cover h-full"
          />
        </div>
        <div className="md:w-3/4">
          <p className="text-3xl">{artist[0].name}</p>
          <div className="my-2 flex items-center gap-3">
            <p className="text-lg">
              {artistSongs.length}
              <span className="ml-2 text-sm text-lightBlack">Songs</span>
            </p>

            {artistAlbums.length > 0 ? (
              <>
                <span> - </span>
                <p className="text-lg">
                  {artistAlbums.length}
                  <span className="ml-2 text-sm text-lightBlack">Albums</span>
                </p>
              </>
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
          <RenderAlbumList
            data={artistAlbums}
            initialNumber={0}
            finalNumber={artistAlbums.length}
            title="Albums"
          />
        ) : null}
      </div>
    </Layout>
  );
};

export default ArtistPage;

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const { id } = params;

  const data = await getSongs();
  const artistData = await getArtists();
  const albumData = await getAlbums();

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
    if (item.artistName?.includes(artist[0].name)) {
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
