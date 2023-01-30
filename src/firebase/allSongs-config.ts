import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export const AllSongsConfig = () => {
  const [allSongs, setAllSongs] = useState<string[]>([]);

  const colRef = collection(db, "Songs");

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      const trackAll: any = [];
      snapshot.docs.forEach((doc) => {
        trackAll.push({ id: doc.id, ...doc.data() });
      });
      setAllSongs([...trackAll]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [allSongs];
};
