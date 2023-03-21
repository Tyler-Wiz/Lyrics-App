import Head from "next/head";
import React, { FC } from "react";
import TopNav from "./TopNav";
import { year } from "@/common/hooks/getYear";
import Nav from "./Nav";
import Footer from "./Footer";
import { Adsense } from "@ctrl/react-adsense";

type Props = {
  title: string;
  children: React.ReactNode;
  content: string;
};

const Layout: FC<Props> = ({ title, children, content }) => {
  return (
    <>
      <Head>
        <title className="capitalize">{`${title} « tooXclusive`}</title>
        <meta name="description" content={`${content} ${year} « tooXclusive`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex gap-2">
        <header
          className="md:w-[18%] md:fixed md:block hidden h-screen"
          style={{ zIndex: 999 }}>
          <Nav />
        </header>
        <div className="md:w-[82%] md:left-[18%] w-full relative dark:bg-black dark:text-primary">
          <section className="flex justify-center items-center">
            <TopNav />
          </section>
          <main className="z-50">{children}</main>
          <Adsense
            client="ca-pub-1115876871453816"
            slot="1282142215"
            style={{ display: "block" }}
            layout="in-article"
            format="fluid"
          />
          <footer></footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
