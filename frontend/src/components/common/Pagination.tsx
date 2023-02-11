import React, { Dispatch, SetStateAction, FC } from "react";
import { MdOutlineArrowBack, MdOutlineArrowForward } from "react-icons/md";

type Props = {
  data: [] | any;
  productPerPage: number;
  currentPage: number;
  setcurrentPage: Dispatch<SetStateAction<number>>;
};

const Pagination: FC<Props> = ({
  data,
  productPerPage,
  currentPage,
  setcurrentPage,
}) => {
  const totalNumerOfPages = Math.ceil(data.length / productPerPage);
  const pages = [...Array(totalNumerOfPages + 1).keys()].slice(1);

  const handleNextPage = () => {
    if (currentPage !== totalNumerOfPages) {
      setcurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage !== 1) {
      setcurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex mt-12 justify-center font-display text-sm">
      <span
        className="flex items-center  mx-2 md:px-3 px-1 shadow-lg border-2 cursor-pointer rounded-md"
        onClick={handlePreviousPage}>
        <MdOutlineArrowBack size={25} />
      </span>
      {pages.map((page) => (
        <span
          className={`mr-2 md:py-2 md:px-4 py-1 px-2 shadow-lg border-2 cursor-pointer rounded-md ${
            currentPage === page ? "bg-black text-white" : ""
          } `}
          key={page}
          onClick={() => setcurrentPage(page)}>
          {page}
        </span>
      ))}
      <span
        className="flex items-center mx-2 md:px-3 px-1 shadow-lg border-2 cursor-pointer rounded-md"
        onClick={handleNextPage}>
        <MdOutlineArrowForward size={25} />
      </span>
    </div>
  );
};

export default Pagination;
