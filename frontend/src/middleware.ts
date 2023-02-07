import { NextRequest, NextResponse } from "next/server";
import { clientURL } from "./api/api";

export default function middleware(req: NextRequest) {
  let token = req.cookies.get("token");
  let url = req.url;
  if (!token && url.includes(`${clientURL}dashboard`)) {
    return NextResponse.redirect(`${clientURL}admin/login`);
  }
  if (token && url.includes(`${clientURL}admin`)) {
    return NextResponse.redirect(`${clientURL}dashboard`);
  }
}
