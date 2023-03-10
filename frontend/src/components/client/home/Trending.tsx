import { ISong } from "@/common/models/interfaces";
import React, { FC } from "react";
import RenderLyricsList from "../lyrics/RenderLyricsList";

interface Props {
  data: [ISong];
}

const Trending: FC<Props> = ({ data }) => {
  return (
    <section className="my-14">
      <RenderLyricsList data={data} header="Trending Lyrics" />
    </section>
  );
};

export default Trending;
