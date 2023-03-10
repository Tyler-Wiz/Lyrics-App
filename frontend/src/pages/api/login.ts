import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
      path: "/",
    })
  );
  return res.status(200).json({ success: true });
}
