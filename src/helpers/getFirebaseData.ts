import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getAllArtists = async () => {
  let artists: any = [];
  const querySnapshot = await getDocs(collection(db, "Img"));
  querySnapshot.forEach((doc) => {
    artists.push({ id: doc.id, ...doc.data() });
  });
  return artists;
};

export const getAllTracks = async () => {
  let tracks: any = [];
  const querySnapshot = await getDocs(collection(db, "Songs"));
  querySnapshot.forEach((doc) => {
    tracks.push({ id: doc.id, ...doc.data() });
  });
  return tracks;
};

export const getAllAlbums = async () => {
  let albums: any = [];
  const querySnapshot = await getDocs(collection(db, "Albums"));
  querySnapshot.forEach((doc) => {
    albums.push({ id: doc.id, ...doc.data() });
  });
  return albums;
};
