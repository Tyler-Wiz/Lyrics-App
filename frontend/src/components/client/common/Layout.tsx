import Head from "next/head";
import React, { FC } from "react";
import TopNav from "./TopNav";
import { year } from "@/common/hooks/getYear";
import Nav from "./Nav";
import Script from "next/script";
import Footer from "./Footer";

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
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=$G-L4JQYGRK70`}
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-L4JQYGRK70');
                `}
      </Script>
      <Script
        data-ad-client="ca-pub-1115876871453816"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></Script>
      <div className="flex gap-2">
        <header className="md:w-[18%] md:fixed md:block hidden h-screen">
          <Nav />
        </header>
        <div className="md:w-[82%] md:left-[18%] w-full relative dark:bg-black dark:text-primary">
          <section className="flex justify-center items-center">
            <TopNav />
          </section>
          <main className="z-50">{children}</main>
          <footer></footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
