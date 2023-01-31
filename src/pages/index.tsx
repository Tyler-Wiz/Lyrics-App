import { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import NewSingle from "@/components/home/NewSingle";
import Trending from "@/components/home/Trending";
import FeaturedArtist from "@/components/home/FeaturedArtist";
import FeaturedAlbum from "@/components/home/FeaturedAlbum";
import Playlist from "@/components/home/Playlist";
import { ISong, IArtists, IAlbum } from "@/libs/interfaces";
import {
  getAllAlbums,
  getAllArtists,
  getAllTracks,
} from "@/helpers/getFirebaseData";

interface Iprops {
  trending: [ISong];
  newLyrics: [ISong];
  featuredArtist: [IArtists];
  featuredAlbums: [IAlbum];
}

const Home: NextPage<Iprops> = ({
  newLyrics,
  trending,
  featuredArtist,
  featuredAlbums,
}) => {
  return (
    <>
      <Layout
        title="Latest Music Lyrics"
        content="tooXclusive Lyrics Website Provides the Latest Lyrics from Wizkid, Burna Boy, Asake, Ayra Starr, Black Sherif, Davido and Other Afrobeats">
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

export async function getServerSideProps() {
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
