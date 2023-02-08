import * as Yup from "yup";

export const SongSchema = Yup.object().shape({
  album: Yup.string(),
  artistName: Yup.string().required("Username is required"),
  id: Yup.string().required("Username is required"),
  category: Yup.string(),
  lyrics: Yup.string().required("Username is required"),
  playlist: Yup.string(),
  trackName: Yup.string().required("Username is required"),
  youtube: Yup.string(),
  tag: Yup.string(),
  duration: Yup.string(),
});
