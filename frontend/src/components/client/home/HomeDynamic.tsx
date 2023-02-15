import dynamic from "next/dynamic";
import { FC } from "react";
import { IAlbum, IPlaylist, ISong } from "../../../common/models/interfaces";

const DynamicComponent = dynamic(
  () => import("@/components/client/home/NewSingle")
);

type Props = {
  data: [ISong];
};

const HomeDynamic: FC<Props> = ({ data }) => {
  return (
    <div>
      <DynamicComponent data={data} />
    </div>
  );
};

export default HomeDynamic;
