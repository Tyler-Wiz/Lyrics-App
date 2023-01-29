import Layout from "@/components/Layout";
import NewSingle from "@/components/NewSingle";
import Trending from "@/components/Trending";
import { ISong } from "@/libs/interfaces";
import { FC } from "react";
import { IArtists } from "@/libs/interfaces";
import FeaturedArtist from "@/components/FeaturedArtist";
import {
  getAllAlbums,
  getAllArtists,
  getAllTracks,
} from "@/helpers/getFirebaseData";
import FeaturedAlbum from "@/components/FeaturedAlbum";
import Playlist from "@/components/Playlist";

interface Iprops {
  trending: [ISong];
  newLyrics: [ISong];
  featuredArtist: [IArtists];
  featuredAlbums: [];
}

const Home: FC<Iprops> = ({
  newLyrics,
  trending,
  featuredArtist,
  featuredAlbums,
}) => {
  return (
    <>
      <Layout title="Home">
        <FeaturedArtist data={featuredArtist} />
        <Trending data={trending} />
        <NewSingle data={newLyrics} />
        <FeaturedAlbum data={featuredAlbums} />
        <Playlist />
      </Layout>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const data = await getAllTracks();
  const artistData = await getAllArtists();
  const albumData = await getAllAlbums();

  const newLyrics = data.filter((item: any) => {
    if (item.category?.includes("new")) {
      return item;
    }
  });
  const trending = data.filter((item: any) => {
    if (item.tag?.includes("trending")) {
      return item;
    }
  });
  const featuredArtist = artistData.filter((item: any) => {
    if (item.tag?.includes("trending")) {
      return item;
    }
  });

  const featuredAlbums = albumData.filter((item: any) => {
    if (item[0].tag?.includes("featured")) {
      return item;
    }
  });

  return {
    props: {
      newLyrics,
      trending,
      featuredArtist,
      featuredAlbums,
    },
  };
}
