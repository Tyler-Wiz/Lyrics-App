import { getAlbums } from "@/api/data";
import { IAlbum } from "@/common/models/interfaces";
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
  const pages = await getAlbums();
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 ${pages
   .map((page: IAlbum) => {
     return `
    <url>
    <loc>https://plug.tooxclusive.com/album/${page.__id__}</loc>
    <lastmod>${page.updatedAt ? page.updatedAt : "2023-02-16"}</lastmod>
    <changefreq>Hourly</changefreq>
    <priority>1.0</priority>
  </url>`;
   })
   .join("")}
</urlset>`;
};
