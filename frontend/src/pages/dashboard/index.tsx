import { getSongs } from "@/api/data";
import Songs from "@/components/admin/home/Songs";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import { ISong } from "@/libs/interfaces";
import { RootState } from "@/store/store";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  data: [ISong];
};

const Index: NextPage<Props> = ({ data }) => {
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

  return {
    props: { data },
  };
}
