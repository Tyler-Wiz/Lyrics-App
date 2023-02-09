import * as Yup from "yup";

export const playlistSchema = Yup.object().shape({
  name: Yup.string().required("Username is required"),
  artwork: Yup.string(),
});
