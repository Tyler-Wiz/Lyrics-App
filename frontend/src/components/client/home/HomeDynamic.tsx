import dynamic from "next/dynamic";
import { FC } from "react";
import { IAlbum, IPlaylist, ISong } from "../../../common/models/interfaces";

const DynamicComponent = dynamic(
  () => import("@/components/client/home/NewSingle")
);

const DynamicAlbum = dynamic(
  () => import("@/components/client/home/FeaturedAlbum")
);

const DynamicPlaylist = dynamic(
  () => import("@/components/client/home/Playlist")
);

type Props = {
  data: [ISong];
  album: [IAlbum];
  playlist: [IPlaylist];
};

const HomeDynamic: FC<Props> = ({ data, album, playlist }) => {
  return (
    <div>
      <DynamicComponent data={data} />
      <DynamicAlbum data={album} />
      <DynamicPlaylist data={playlist} />
    </div>
  );
};

export default HomeDynamic;
