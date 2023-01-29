import React, { FC } from "react";
import { ISong } from "@/libs/interfaces";
import RenderLyricsList from "./RenderLyricsList";

interface Props {
  data: [ISong];
}

const Trending: FC<Props> = ({ data }) => {
  return (
    <>
      <RenderLyricsList data={data} header="Trending Lyrics" />
    </>
  );
};

export default Trending;
