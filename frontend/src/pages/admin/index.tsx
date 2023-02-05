import AdminLayout from "@/components/admin/layout/AdminLayout";
import { getUser } from "@/store/reducers/authSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {};

const Index = (props: Props) => {
  const { token, name } = useSelector((state: RootState) => state.auth);

  let router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token, router]);

  return <AdminLayout title="Admin Dashboard"></AdminLayout>;
};

export default Index;
