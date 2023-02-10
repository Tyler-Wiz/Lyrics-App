import React from "react";
import AdminLayout from "@/components/admin/common/AdminLayout";
import PlaylistUploadForm from "@/components/admin/playlist/PlaylistUploadForm";

const Upload = () => {
  return (
    <AdminLayout title="upload Songs">
      <PlaylistUploadForm />
    </AdminLayout>
  );
};

export default Upload;
