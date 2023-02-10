import AlbumUploadForm from "@/components/admin/album/AlbumForm";
import AdminLayout from "@/components/admin/common/AdminLayout";
import React from "react";

type Props = {};

const upload = (props: Props) => {
  return (
    <AdminLayout title="Album">
      <AlbumUploadForm />
    </AdminLayout>
  );
};

export default upload;
