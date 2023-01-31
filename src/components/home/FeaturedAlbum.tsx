/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { IAlbum } from "@/libs/interfaces";
import RenderAlbumList from "../UI/RenderAlbumList";

interface Props {
  data: [IAlbum];
}

const FeaturedAlbum: FC<Props> = ({ data }) => {
  return (
    <>
      <RenderAlbumList
        data={data}
        initialNumber={0}
        finalNumber={4}
        title="New Albums"
      />
    </>
  );
};

export default FeaturedAlbum;
