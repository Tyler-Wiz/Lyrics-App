import { getArtists } from "@/api/data";
import { IArtists } from "@/common/models/interfaces";
import { GetServerSideProps } from "next";

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps<{}> = async (ctx: any) => {
  ctx.res.setHeader("Content-Type", "text/xml");
  const xml = await generateArtistSitemap();
  ctx.res.write(xml);
  ctx.res.end();

  return {
    props: {},
  };
};

const generateArtistSitemap = async () => {
  const pages = await getArtists();
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 ${pages
   .map((page: IArtists) => {
     return `
    <url>
    <loc>https://plug.tooxclusive.com/artist/${page.id}</loc>
    <lastmod>${page.updatedAt ? page.updatedAt : "2023-02-10"}</lastmod>
    <changefreq>Hourly</changefreq>
    <priority>1.0</priority>
  </url>`;
   })
   .join("")}
</urlset>`;
};
