/* eslint-disable @next/next/no-img-element */
import React from "react";
import { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import { ISong } from "@/libs/interfaces";
import parse from "html-react-parser";
import Image from "next/image";
import RelatedPost from "@/components/UI/RelatedPost";
import { shuffle } from "@/helpers/shuffleArray";
import banner600 from "@/assets/img/banner.jpeg";
import { useDispatch } from "react-redux";
import { AddFavorite } from "@/store/reducers/favoriteSlice";
import { AiOutlineHeart } from "react-icons/ai";
import { getSongs } from "@/api/data";

type Props = {
  lyrics: ISong;
  related: [];
};

const LyricsPage: NextPage<Props> = ({ lyrics, related }) => {
  const preDescription = lyrics.lyrics.replace(/(<([^>]+)>)/gi, "");
  const metaDescription = preDescription.substring(0, 120);

  const dispatch = useDispatch();

  return (
    <Layout
      title={lyrics.trackName + " Lyrics " + " by " + lyrics.artistName}
      content={
        lyrics.artistName + " " + lyrics.trackName + " - " + metaDescription
      }>
      <div className="px-10 py-8 flex flex-col items-center md:flex-row gap-4 shadow-sm font-Crimson">
        <div className="w-72 h-72">
          <img
            src={lyrics.artwork}
            alt="lyrics artwork"
            className="rounded-xl"
          />
        </div>
        <div className="py-10 text-center md:text-justify">
          <div className="text-xl mb-2 font-semibold text-lightBlack">
            Lyrics
          </div>
          <p className="text-2xl mb-2 font-semibold text-black dark:text-primary">
            {lyrics.trackName}
          </p>
          <p className="text-lg mb-2 font-semibold text-lightBlack ">
            {lyrics.artistName}
          </p>
          <AiOutlineHeart
            size={20}
            onClick={() => dispatch(AddFavorite(lyrics))}
            className="cursor-pointer my-3"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-6 md:p-10 p-5 md:text-justify ">
        <div className="lyrics font-Crimson text-center md:text-justify  col-span-4">
          {parse(lyrics.lyrics)}
        </div>
        <div className="col-span-2 ">
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
  const data = await getSongs();
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
