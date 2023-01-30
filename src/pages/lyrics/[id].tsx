/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { getAllTracks } from "@/helpers/getFirebaseData";
import Layout from "@/components/Layout";
import { ISong } from "@/libs/interfaces";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import RelatedPost from "@/components/RelatedPost";
import { shuffle } from "@/helpers/shuffleArray";
import banner600 from "@/assets/img/banner.jpeg";

type Props = {
  lyrics: ISong;
  related: [];
};

const LyricsPage: FC<Props> = ({ lyrics, related }) => {
  return (
    <Layout title={lyrics.trackName + " Lyrics " + " by " + lyrics.artistName}>
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

export default LyricsPage;

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const { id } = params;
  const data = await getAllTracks();
  const lyrics = data?.find((item: any) => item.id === id);

  const relatedData = data.filter((item: any) => {
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
