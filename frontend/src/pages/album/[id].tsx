import { getLyricsFromAlbum } from "@/helpers/getFirebaseData";
import { NextPage } from "next";
import React from "react";
import { IAlbumLyrics } from "@/libs/interfaces";
import Layout from "@/components/layout/Layout";
import AlbumLyrics from "@/components/UI/AlbumLyrics";

type Props = {
  data: [IAlbumLyrics];
  id: string;
};

const AlbumPage: NextPage<Props> = ({ data, id }) => {
  return (
    <Layout
      title={`${data[0][0].album} | ${data[0][0].artistName}`}
      content={`${data[0][0].album} | ${data[0][0].artistName}`}>
      <div className="px-20 mt-10">
        <AlbumLyrics data={data} id={id} />
      </div>
    </Layout>
  );
};

export default AlbumPage;

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const { id } = params;
  const getdata = await getLyricsFromAlbum(id);

  let data: any = [];
  getdata.forEach((lyrics) => {
    data.push({ id: lyrics.id, ...lyrics.data() });
  });

  return {
    props: {
      data,
      id,
    },
  };
};
