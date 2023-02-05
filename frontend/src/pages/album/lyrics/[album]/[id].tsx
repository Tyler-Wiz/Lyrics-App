/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import React from "react";
import parse from "html-react-parser";
import banner600 from "@/assets/img/banner.jpeg";
import Image from "next/image";
import { getAlbums, getSongs } from "@/api/data";
import { shuffle } from "@/helpers/shuffleArray";
import RelatedPost from "@/components/ui/RelatedPost";

type Props = {
  lyrics: any;
  related: [];
};

const AlbumLyrics: NextPage<Props> = ({ lyrics, related }) => {
  const preDescription = lyrics.lyrics.replace(/(<([^>]+)>)/gi, "");
  const metaDescription = preDescription.substring(0, 120);

  return (
    <Layout
      title={lyrics.trackName + " Lyrics " + " by " + lyrics.artistName}
      content={
        lyrics.artistName + " " + lyrics.trackName + " - " + metaDescription
      }>
      <div className="px-10 py-8 flex gap-4 shadow-sm font-Crimson">
        <div className="w-72 h-72">
          <img
            src={lyrics.artwork}
            alt="lyrics artwork"
            className="rounded-xl"
          />
        </div>
        <div className="py-10">
          <div className="text-xl mb-2 font-semibold text-lightBlack">
            Lyrics
          </div>
          <p className="text-2xl mb-2 font-semibold text-black dark:text-primary">
            {lyrics.trackName}
          </p>
          <p className="text-lg mb-2 font-semibold text-lightBlack ">
            {lyrics.artistName}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-6 p-10">
        <div className="lyrics font-Crimson col-span-4">
          {parse(lyrics.lyrics)}
        </div>
        <div className="col-span-2 sticky">
          <div className="relative w-[300px] h-[600px]">
            <Image src={banner600} fill alt="lyrics artwork" />
          </div>
          <RelatedPost data={related} />
        </div>
      </div>
    </Layout>
  );
};

export default AlbumLyrics;

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const { album, id } = params;

  const data = await getAlbums();
  const selectedAlbum = data?.find((x: any) => x.id === album);
  const lyrics = selectedAlbum.songs?.find((item: any) => item.id === id);

  const allSongs = await getSongs();

  const relatedData = allSongs.filter((item: any) => {
    if (item.artistName?.includes(lyrics.artistName)) {
      return item;
    }
  });

  const related = shuffle(relatedData);

  return {
    props: {
      lyrics,
      related,
    },
  };
};
