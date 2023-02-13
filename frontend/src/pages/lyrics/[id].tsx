/* eslint-disable @next/next/no-img-element */
import React from "react";
import { GetStaticProps, NextPage } from "next";
import Layout from "@/components/client/common/Layout";
import parse from "html-react-parser";
import Image from "next/image";
import banner600 from "@/assets/img/banner.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { AddFavorite } from "@/store/reducers/favoriteSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getSongs } from "@/api/data";
import { RootState } from "@/store/store";
import { ISong } from "@/common/models/interfaces";
import { shuffle } from "@/common/hooks/shuffleArray";
import RelatedPost from "@/components/common/RelatedPost";

type Props = {
  lyrics: ISong;
  related: [];
};

const LyricsPage: NextPage<Props> = ({ lyrics, related }) => {
  const preDescription = lyrics.lyrics.replace(/(<([^>]+)>)/gi, "");
  const metaDescription = preDescription.substring(0, 120);

  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.favorite.items);
  const ItemIndex = items.find((x) => x.id === lyrics.id);

  return (
    <Layout
      title={lyrics.trackName + " Lyrics " + " by " + lyrics.artistName}
      content={
        lyrics.artistName + " " + lyrics.trackName + " - " + metaDescription
      }>
      <div className="px-10 py-8 flex gap-2 shadow-sm font-Poppins">
        <div className="w-52 md:w-72 md:h-72">
          <img
            src={lyrics.artwork}
            alt="lyrics artwork"
            className="rounded-xl"
          />
        </div>
        <div>
          <div className="text-xs md:text-lg mb-2 font-semibold text-lightBlack">
            Lyrics
          </div>
          <p className="text-xs md:text-lg mb-2 font-semibold text-black dark:text-primary">
            {lyrics.trackName}
          </p>
          <p className="text-xs md:text-lg mb-2 font-semibold text-lightBlack ">
            {lyrics.artistName}
          </p>
          <div className="w-full mx-auto">
            {ItemIndex ? (
              <AiFillHeart size={25} className="my-3 text-accentColor" />
            ) : (
              <AiOutlineHeart
                size={25}
                onClick={() => dispatch(AddFavorite(lyrics))}
                className="cursor-pointer my-3 text-accentColor"
              />
            )}
          </div>
        </div>
      </div>
      <div className="md:grid md:grid-cols-6 gap-10 p-10 flex flex-col justify-center font-Poppins">
        <div className="lyrics font-Poppins text-center md:text-justify col-span-4">
          {parse(lyrics.lyrics)}
        </div>
        <div className="col-span-2">
          <RelatedPost data={related} />
        </div>
      </div>
    </Layout>
  );
};

export default LyricsPage;

export const getServerSideProps = async (context: any) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

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
