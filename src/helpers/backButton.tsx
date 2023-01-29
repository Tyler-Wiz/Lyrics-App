import React from "react";
import Router from "next/router";
import { IoReturnUpBack } from "react-icons/io5";

const BackButton = () => {
  return (
    <div
      className="cursor-pointer px-1 py-0.5 text-2xl text-white bg-lightBlack inline-block rounded-lg"
      onClick={() => Router.back()}>
      <IoReturnUpBack />
    </div>
  );
};

export default BackButton;
