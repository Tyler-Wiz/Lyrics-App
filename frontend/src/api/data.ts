import { BaseURL, clientURL, serverURL } from "./api";
import axios from "axios";

export const getSongs = async () => {
  const resSongs = await axios.get(`${serverURL}songs`);
  const data = resSongs.data;
  return data;
};

export const getArtists = async () => {
  const resSongs = await axios.get(`${serverURL}artists`);
  const data = resSongs.data;
  return data;
};

export const getAlbums = async () => {
  const resSongs = await axios.get(`${serverURL}albums`);
  const data = resSongs.data;
  return data;
};
