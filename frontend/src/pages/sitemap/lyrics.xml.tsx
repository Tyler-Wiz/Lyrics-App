import { getArtists, getSongs } from "@/api/data";
import { IArtists, ISong } from "@/common/models/interfaces";
import { GetServerSideProps } from "next";

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps<{}> = async (ctx: any) => {
  ctx.res.setHeader("Content-Type", "text/xml");
  const xml = await generateLyricsSitemap();
  ctx.res.write(xml);
  ctx.res.end();

  return {
    props: {},
  };
};

const generateLyricsSitemap = async () => {
  const data = await getSongs();
  const pages = data.reverse();
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 ${pages
   .map((page: ISong) => {
     return `
    <url>
    <loc>https://plug.tooxclusive.com/lyrics/${page.id}</loc>
    <lastmod>${page.updatedAt ? page.updatedAt : "2023-02-10"}</lastmod>
    <changefreq>Hourly</changefreq>
    <priority>1.0</priority>
  </url>`;
   })
   .join("")}
</urlset>`;
};
