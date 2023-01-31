/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout/Layout";
import { getLyricsFromAlbum } from "@/helpers/getFirebaseData";
import { NextPage } from "next";
import React from "react";
import parse from "html-react-parser";
import banner600 from "@/assets/img/banner.jpeg";
import Image from "next/image";

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
        </div>
      </div>
    </Layout>
  );
};

export default AlbumLyrics;

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const { album, id } = params;
  const getdata = await getLyricsFromAlbum(album);

  let data: any = [];
  getdata.forEach((lyrics) => {
    data.push({ id: lyrics.id, ...lyrics.data() });
  });
  const lyricsIni = data?.find((item: any) => item.id === id);
  const lyrics = lyricsIni[0];

  return {
    props: {
      lyrics,
    },
  };
};
