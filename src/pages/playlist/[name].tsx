import React, { FC } from "react";
import { getAllTracks } from "@/helpers/getFirebaseData";
import Layout from "@/components/Layout";
import RenderLyricsList from "@/components/RenderLyricsList";
import { ISong } from "@/libs/interfaces";

type Props = {
  playlist: [ISong];
  name: string;
};

const SinglePlaylist: FC<Props> = ({ playlist, name }) => {
  return (
    <Layout title={name + " " + "Playlist"}>
      <RenderLyricsList data={playlist} header={name} />
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
