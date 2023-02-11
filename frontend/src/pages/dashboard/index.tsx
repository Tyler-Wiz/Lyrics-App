import { getArtists, getSongs } from "@/api/data";
import { IArtists, ISong } from "@/common/models/interfaces";
import Songs from "@/components/admin/dashboard/Songs";
import AdminLayout from "@/components/admin/common/AdminLayout";
import { RootState } from "@/store/store";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  data: [ISong];
  artist: [IArtists];
};

const Index: NextPage<Props> = ({ data, artist }) => {
  const { token } = useSelector((state: RootState) => state.auth);

  let router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token, router]);

  return (
    <AdminLayout title="Admin Dashboard">
      <Songs data={data} />
    </AdminLayout>
  );
};

export default Index;

export async function getServerSideProps() {
  const data = await getSongs();
  const newdata = data.reverse().slice(0, 100);

  return {
    props: { data: newdata },
  };
}
