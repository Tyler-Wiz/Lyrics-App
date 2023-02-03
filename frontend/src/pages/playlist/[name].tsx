import { NextPage } from "next";
import React from "react";
import { getAllTracks } from "@/helpers/getFirebaseData";
import Layout from "@/components/layout/Layout";
import RenderLyricsList from "@/components/UI/RenderLyricsList";
import { ISong } from "@/libs/interfaces";

type Props = {
  playlist: [ISong];
  name: string;
};

const SinglePlaylist: NextPage<Props> = ({ playlist, name }) => {
  return (
    <Layout title={name + " " + "Playlist"} content={name + " " + "Playlist"}>
      <div className="mt-14">
        <RenderLyricsList data={playlist} header={name} />
      </div>
    </Layout>
  );
};

export default SinglePlaylist;

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const { name } = params;
  const data = await getAllTracks();

  const playlist = data.filter((item: any) => {
    if (item.playlist?.includes(name)) {
      return item;
    }
  });

  return {
    props: {
      playlist,
      name,
    },
  };
};
