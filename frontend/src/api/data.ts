import { BaseURL } from "./api";
import axios from "axios";

export const getSongs = async () => {
  const resSongs = await axios(`${BaseURL}songs`);
  const data = resSongs.data;
  return data;
};

export const getArtists = async () => {
  const resSongs = await axios(`${BaseURL}artists`);
  const data = resSongs.data;
  return data;
};

export const getAlbums = async () => {
  const resSongs = await axios(`${BaseURL}albums`);
  const data = resSongs.data;
  return data;
};
