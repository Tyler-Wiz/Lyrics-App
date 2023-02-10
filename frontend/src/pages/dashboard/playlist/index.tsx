import { getPlaylist } from "@/api/data";
import AdminLayout from "@/components/admin/common/AdminLayout";
import React, { FC } from "react";
import { IPlaylist } from "@/common/models/interfaces";
import Playlist from "@/components/admin/playlist/Playlist";

type Props = {
  data: [IPlaylist];
};

const playlist: FC<Props> = ({ data }) => {
  return (
    <AdminLayout title="Playlist">
      <Playlist data={data} />
    </AdminLayout>
  );
};

export default playlist;

export async function getServerSideProps() {
  const data = await getPlaylist();

  return {
    props: { data },
  };
}
