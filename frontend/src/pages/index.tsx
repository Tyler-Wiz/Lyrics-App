import { GetServerSideProps, NextPage } from "next";
import Layout from "@/components/client/common/Layout";
import Trending from "@/components/client/home/Trending";
import { getSongs } from "@/api/data";
import { ISong } from "@/common/models/interfaces";
import HomeDynamic from "@/components/client/home/HomeDynamic";
import React, { Suspense } from "react";

interface Iprops {
  trending: [ISong];
  newLyrics: [ISong];
}

const Home: NextPage<Iprops> = ({ newLyrics, trending }) => {
  return (
    <>
      <Layout
        title="Latest Music Lyrics"
        content="tooXclusive Lyrics Website Provides the Latest Lyrics from Wizkid, Burna Boy, Asake, Ayra Starr, Black Sherif, Davido and Other Afrobeats">
        <Trending data={trending} />
        <Suspense fallback={<div>Loading...</div>}>
          <HomeDynamic data={newLyrics} />
        </Suspense>
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<{}> = async ({
  req,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const data = await getSongs();
  const lyricsData = data.reverse();

  const newLyrics = lyricsData.filter((item: any) => {
    if (item.category?.includes("new")) {
      return item;
    }
  });
  const trendingdata = lyricsData.filter((item: any) => {
    if (item.tag?.includes("trending")) {
      return item;
    }
  });

  const trending = trendingdata.slice(0, 10);
  return {
    props: {
      newLyrics,
      trending,
    },
  };
};
