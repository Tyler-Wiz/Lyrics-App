import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );
  return res.status(200).json({ success: true });
}
