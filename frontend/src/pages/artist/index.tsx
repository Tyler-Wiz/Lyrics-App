/* eslint-disable @next/next/no-img-element */
import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "@/components/client/common/Layout";
import Link from "next/link";
import { getArtists } from "@/api/data";
import { IArtists } from "@/common/models/interfaces";

type Props = {
  artists: [IArtists];
};

const Index: NextPage<Props> = ({ artists }) => {
  return (
    <Layout title="All Artists" content="All Latest Artists And Lyrics">
      <>
        <h2 className="px-5 md:px-10 mt-10 text-xl text-black font-semibold">
          Top Artists
        </h2>
        <div className="w-full mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 px-5 md:px-10 mt-6 font-Crimson dark:text-primary">
          {artists.map((item) => (
            <div key={item.id} className="my-4">
              <Link href={`${"/artist/" + item.__id__}`}>
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

export const getServerSideProps: GetServerSideProps<{}> = async ({
  req,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const artists = await getArtists();

  return {
    props: {
      artists,
    },
  };
};
