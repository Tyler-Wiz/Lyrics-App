import { getUser, logOutUser } from "@/store/reducers/authSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { MdEditNote, MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const TopNav = (props: Props) => {
  const { name, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  let router = useRouter();
  useEffect(() => {
    dispatch(getUser());
  }, [router, dispatch]);

  console.log(token);

  const flexBetween = "flex justify-between items-center";

  return (
    <div
      className={`${flexBetween} gap-3 w-full bg-black text-white font-Poppins py-3 text-xs`}>
      <div className={`${flexBetween} gap-3 px-10`}>
        <FaHome size={15} />
        <Link href="/">Visit Website</Link>
      </div>
      <div className="relative px-10 group">
        <div className={`${flexBetween} gap-3 cursor-pointer`}>
          <p>Howdy, {name}</p>
          <FaUserAlt size={15} />
        </div>
        <div className="absolute top-full w-[400px] py-5 px-4 z-50 bg-black hidden group-hover:block overflow-hidden">
          <div className="flex items-center gap-2">
            <MdEditNote size={20} />
            <p className="my-5">Edit profile </p>
          </div>

          <div className="flex items-center gap-2">
            <MdLogout size={20} />
            <p
              className="cursor-pointer text"
              onClick={() => dispatch(logOutUser())}>
              logOut
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
