import Layout from "@/components/Layout";
import NewSingle from "@/components/NewSingle";
import Trending from "@/components/Trending";
import { getAllTracks } from "@/helpers/getSongs";
import { ISong } from "@/libs/interfaces";
import { FC } from "react";

interface Iprops {
  trending: [ISong];
  newLyrics: [ISong];
}

const Home: FC<Iprops> = ({ newLyrics, trending }) => {
  return (
    <>
      <Layout title="home">
        <Trending data={trending} />
        <NewSingle data={newLyrics} />
      </Layout>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const data = await getAllTracks();
  const newLyrics = data.filter((item: any) => {
    if (item.category.includes("new")) {
      return item;
    }
  });
  const trending = data.filter((item: any) => {
    if (item.tag.includes("trending")) {
      return item;
    }
  });
  return {
    props: {
      newLyrics,
      trending,
    },
  };
}
