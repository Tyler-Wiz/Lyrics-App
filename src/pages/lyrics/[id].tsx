import React, { FC } from "react";
import { getAllTracks } from "@/helpers/getFirebaseData";
import Layout from "@/components/Layout";
import { ISong } from "@/libs/interfaces";
import parse from "html-react-parser";
import Image from "next/image";
import BackButton from "@/helpers/backButton";
import Link from "next/link";

type Props = {
  lyrics: ISong;
};

const LyricsPage: FC<Props> = ({ lyrics }) => {
  return (
    <Layout
      title={
        lyrics.trackName +
        " Lyrics " +
        " by " +
        lyrics.artistName +
        "  |  " +
        "tooXclusive"
      }>
      <div className="flex item-center px-10 mt-10 gap-4">
        <BackButton />
        <div className="flex gap-2 font-Lato">
          <Link href="/">
            <p>Home «</p>
          </Link>
          <Link href="/lyrics">
            <p>Lyrics «</p>
          </Link>
          <p>{lyrics.trackName}</p>
        </div>
      </div>
      <div className="px-10 py-8 flex gap-4 shadow-sm">
        <div className="relative w-72 h-72">
          <Image
            src={lyrics.artwork}
            fill
            alt="lyrics artwork"
            className="rounded-xl"
          />
        </div>
        <div className="py-10">
          <div className="text-xl mb-2 font-semibold text-lightBlack">
            Lyrics
          </div>
          <p className="text-2xl mb-2 font-semibold text-black">
            {lyrics.trackName}
          </p>
          <p className="text-lg mb-2 font-semibold text-lightBlack">
            {lyrics.artistName}
          </p>
        </div>
      </div>
      <div className="lyrics font-Lato p-10">{parse(lyrics.lyrics)}</div>
    </Layout>
  );
};

export default LyricsPage;

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const { id } = params;
  const data = await getAllTracks();
  const lyrics = data?.find((item: any) => item.id === id);

  return {
    props: {
      lyrics,
    },
  };
};
