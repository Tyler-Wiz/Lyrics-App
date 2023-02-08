import * as Yup from "yup";

export const artistSchema = Yup.object().shape({
  id: Yup.string().required("Username is required"),
  name: Yup.string().required("Username is required"),
  tag: Yup.string(),
});
