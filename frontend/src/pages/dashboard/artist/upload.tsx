import React from "react";
import ArtistUploadForm from "@/components/admin/artist/ArtistUploadForm";
import AdminLayout from "@/components/admin/common/AdminLayout";

const Upload = () => {
  return (
    <AdminLayout title="upload Songs">
      <ArtistUploadForm />
    </AdminLayout>
  );
};

export default Upload;
