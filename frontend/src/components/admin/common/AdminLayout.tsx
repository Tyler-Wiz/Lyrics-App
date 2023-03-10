import Head from "next/head";
import React, { FC } from "react";
import Nav from "./Nav";
import TopNav from "./TopNav";

type Props = {
  title: string;
  children: React.ReactNode;
};

const AdminLayout: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title className="capitalize">{`${title} « tooXclusive`}</title>
        <meta name="description" content="Admin Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex gap-2">
        <header className="md:w-[4%] md:fixed md:block hidden h-screen">
          <Nav />
        </header>
        <div className="md:w-[96%] md:left-[4%]  w-full relative dark:bg-black dark:text-primary">
          <section className="flex justify-center items-center fixed md:w-[96%] md:left-[4%] w-full">
            <TopNav />
          </section>
          <main className="z-50 mt-10 p-5 bg-dashBackground">{children}</main>
          <footer></footer>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
