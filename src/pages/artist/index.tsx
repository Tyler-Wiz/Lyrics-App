/* eslint-disable @next/next/no-img-element */
import React from "react";
import { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import { getAllArtists } from "@/helpers/getFirebaseData";
import { IArtists } from "@/libs/interfaces";
import Link from "next/link";

type Props = {
  data: [IArtists];
};

const Index: NextPage<Props> = ({ data }) => {
  return (
    <Layout title="All Artists">
      <>
        <h2 className="px-10 mt-10 text-xl text-black font-semibold">
          Top Artists
        </h2>
        <div className="w-full mx-auto grid grid-cols-5 gap-6 px-10 mt-6 font-Crimson dark:text-primary">
          {data.map((item) => (
            <div key={item.id} className="my-4">
              <Link href={`${"/artist/" + item.id}`}>
                <div className="w-48 h-48">
                  <img
                    src={item.url}
                    alt="artwork"
                    className="rounded-lg shadow-lg hover:scale-105 cursor-pointer object-cover h-full"
                  />
                </div>
              </Link>
              <p className="text-sm mt-4 font-medium text-black capitalize dark:text-primary">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </>
    </Layout>
  );
};

export default Index;

export async function getServerSideProps() {
  const data = await getAllArtists();

  return {
    props: {
      data,
    },
  };
}
