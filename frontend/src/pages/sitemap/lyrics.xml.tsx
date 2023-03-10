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

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let xmlDate = `${year}-${month}-${day}`;

console.log(xmlDate);

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
    <lastmod>${xmlDate}</lastmod>
    <changefreq>Hourly</changefreq>
    <priority>1.0</priority>
  </url>`;
   })
   .join("")}
</urlset>`;
};
