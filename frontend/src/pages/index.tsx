import { GetServerSideProps, NextPage } from "next";
import type { NextApiRequest, NextApiResponse } from "next";
import Layout from "@/components/client/common/Layout";
import NewSingle from "@/components/client/home/NewSingle";
import Trending from "@/components/client/home/Trending";
import FeaturedArtist from "@/components/client/home/FeaturedArtist";
import FeaturedAlbum from "@/components/client/home/FeaturedAlbum";
import Playlist from "@/components/client/home/Playlist";
import { getAlbums, getArtists, getPlaylist, getSongs } from "@/api/data";
import { IAlbum, IArtists, IPlaylist, ISong } from "@/common/models/interfaces";

interface Iprops {
  trending: [ISong];
  newLyrics: [ISong];
  featuredArtist: [IArtists];
  featuredAlbums: [IAlbum];
  playlistData: [IPlaylist];
}

const Home: NextPage<Iprops> = ({
  newLyrics,
  trending,
  featuredArtist,
  featuredAlbums,
  playlistData,
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
        <Playlist data={playlistData} />
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
  const artists = await getArtists();
  const albums = await getAlbums();
  const playlistData = await getPlaylist();

  const lyricsData = data.reverse();

  const newLyrics = lyricsData.filter((item: any) => {
    if (item.category?.includes("new")) {
      return item;
    }
  });
  const trending = lyricsData.filter((item: any) => {
    if (item.tag?.includes("trending")) {
      return item;
    }
  });
  const featuredArtist = artists.filter((item: any) => {
    if (item.tag?.includes("trending")) {
      return item;
    }
  });

  const featuredAlbums = albums.filter((item: any) => {
    if (item.tag?.includes("featured")) {
      return item;
    }
  });

  return {
    props: {
      newLyrics,
      trending,
      featuredArtist,
      featuredAlbums,
      playlistData,
    },
  };
};
