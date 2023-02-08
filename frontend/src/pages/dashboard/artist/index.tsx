import { getArtists, getSongs } from "@/api/data";
import { IArtists } from "@/common/models/interfaces";
import Artist from "@/components/admin/artist/Artist";
import AdminLayout from "@/components/admin/common/AdminLayout";
import React, { FC } from "react";

type Props = {
  data: [IArtists];
};

const artist: FC<Props> = ({ data }) => {
  return (
    <AdminLayout title="Artist">
      <Artist data={data} />
    </AdminLayout>
  );
};

export default artist;

export async function getServerSideProps() {
  const data = await getArtists();

  return {
    props: { data },
  };
}
