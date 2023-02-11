/* eslint-disable @next/next/no-img-element */
import { IAlbum } from "@/common/models/interfaces";
import React, { FC } from "react";
import RenderAlbumList from "../album/RenderAlbumList";

interface Props {
  data: [IAlbum];
}

const FeaturedAlbum: FC<Props> = ({ data }) => {
  return (
    <section>
      <RenderAlbumList
        data={data}
        initialNumber={0}
        finalNumber={4}
        title="New Albums"
      />
    </section>
  );
};

export default FeaturedAlbum;
