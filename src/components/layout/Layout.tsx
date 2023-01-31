import Head from "next/head";
import React, { FC } from "react";
import Nav from "../Nav";
import SearchLyrics from "../SearchLyrics";
import { year } from "@/helpers/getYear";

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
        <header className="w-[18%] fixed h-screen">
          <Nav />
        </header>
        <div className="w-[82%] relative left-[18%] dark:bg-black dark:text-primary">
          <section className="flex justify-center items-center">
            <SearchLyrics />
          </section>
          <main className="z-50">{children}</main>
          <footer></footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
