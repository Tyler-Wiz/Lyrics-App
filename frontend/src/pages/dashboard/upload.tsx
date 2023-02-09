/* eslint-disable @next/next/no-img-element */
import ArtistUploadForm from "@/components/admin/artist/ArtistUploadForm";
import UploadForm from "@/components/admin/dashboard/UploadForm";
import AdminLayout from "@/components/admin/common/AdminLayout";
import React, { useState } from "react";
import PlaylistUploadForm from "@/components/admin/playlist/PlaylistUploadForm";

type Props = {};

const Upload = (props: Props) => {
  const [isArtistForm, setIsArtistForm] = useState<boolean>(false);

  return (
    <AdminLayout title="upload Songs">
      <UploadForm />
      <button
        className="flex justify-between font-Poppins px-2 py-1 my-5 text-sm font-bold cursor-pointer bg-accentColor text-white"
        onClick={() => setIsArtistForm(!isArtistForm)}>
        Add Artist
      </button>
      <div className={`${isArtistForm ? "block" : "hidden"}`}>
        <ArtistUploadForm />
      </div>
      <PlaylistUploadForm />
    </AdminLayout>
  );
};

export default Upload;
