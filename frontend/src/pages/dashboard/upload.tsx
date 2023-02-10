import UploadForm from "@/components/admin/dashboard/UploadForm";
import AdminLayout from "@/components/admin/common/AdminLayout";
import React from "react";

type Props = {};

const Upload = (props: Props) => {
  return (
    <AdminLayout title="upload Songs">
      <UploadForm />
    </AdminLayout>
  );
};

export default Upload;
