/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Layout from "@/components/client/common/Layout";
import Link from "next/link";
import { RxTrash, RxHeartFilled } from "react-icons/rx";
import { removeFavorite } from "@/store/reducers/favoriteSlice";

const Favorite = () => {
  const items = useSelector((state: RootState) => state.favorite.items);
  const dispatch = useDispatch();

  return (
    <Layout title="Favorite Lyrics" content="Favorite Lyrics">
      {items.length > 0 ? (
        <>
          <h2 className="px-5 md:px-10 mt-6 text-xl text-black dark:text-primary font-semibold font-Crimson capitalize">
            Favorite Lyrics
          </h2>
          <div className="w-full mx-auto grid grid-cols-2 sm:grid-cols-5 gap-6 px-5 md:px-10 mt-6 font-Crimson dark:text-primary">
            {items.map((item) => {
              return (
                <div key={item.__id__} className="my-4">
                  <Link href={`${"/lyrics/" + item.__id__}`}>
                    <img
                      src={item.artwork}
                      alt="artwork"
                      className="rounded-lg shadow-lg hover:scale-105 cursor-pointer"
                    />
                  </Link>
                  <div className="flex gap-4 items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-xs md:text-xs mt-4 font-medium text-black capitalize dark:text-primary">
                        {item.trackName}
                      </p>
                      <p className="text-xs sm:text-xs md:text-xs  text-lightBlack">
                        {item.artistName}
                      </p>
                    </div>
                    <div>
                      <RxTrash
                        size={20}
                        onClick={() => dispatch(removeFavorite(item))}
                        className="cursor-pointer my-3 text-accentColor"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <RxHeartFilled size={100} />
          No Love yet
        </div>
      )}
    </Layout>
  );
};

export default Favorite;
