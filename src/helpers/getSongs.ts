import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getAllTracks = async () => {
  let tracks: any = [];
  const querySnapshot = await getDocs(collection(db, "Songs"));
  querySnapshot.forEach((doc) => {
    tracks.push({ id: doc.id, ...doc.data() });
  });
  return tracks;
};
