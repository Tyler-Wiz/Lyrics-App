/* eslint-disable @next/next/no-img-element */
import { ISong } from "@/common/models/interfaces";
import Pagination from "@/components/common/Pagination";
import { useGetAllSongsQuery } from "@/store/reducers/songsApi";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiEditAlt } from "react-icons/bi";

type Props = {
  data: [ISong];
};

const Songs: FC<Props> = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [wordEntered, setWordEntered] = useState("");
  const searchData = useGetAllSongsQuery();

  const productPerPage = 50;
  const [currentPage, setcurrentPage] = useState<number>(1);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;

  const handleFilter = (event: any) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter: any = searchData.data.filter((value: ISong) => {
      return (
        value.trackName.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.artistName.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.category.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.tag.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (searchWord === "") {
      setFilteredData(filteredData);
    } else {
      setFilteredData(newFilter);
    }
  };

  console.log(filteredData.length);

  const pageProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="w-full mt-5 shadow-3xl font-Poppins text-sm">
      <div className="flex mb-10 gap-6 items-center justify-between">
        <div className="flex gap-6 items-center">
          <p className="text-2xl">Songs</p>
          <Link href="/dashboard/upload">
            <button
              type="submit"
              className=" bg-accentColor text-white px-2 py-1 text-xs">
              Add New
            </button>
          </Link>
        </div>
        <input
          className="w-2/5 outline-none py-2 rounded-lg font-Crimson text-black bg-lightGrey dark:text-primary px-2 text-xs"
          placeholder="Search"
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      <table className="w-full text-sm text-left font-medium bg-white">
        <thead className="text-sm capitalize border-b-[.4px] ">
          <tr>
            <th scope="col" className="px-6 py-4">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Artist
            </th>
            <th scope="col" className="px-6 py-3">
              duration
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Playlist
            </th>
            <th scope="col" className="px-6 py-3">
              tag
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {pageProducts.map((item, index: number) => (
            <tr
              key={index}
              className="bg-white key={index} border-b-[.4px] last:border-0 hover:bg-secondary cursor-pointer">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap flex items-center text">
                <p>{item.trackName}</p>
              </th>
              <td className="px-6 py-2 font-medium">{item.artistName}</td>
              <td className="px-6 py-2 font-medium">
                <p>{item.duration}</p>
              </td>
              <td className="px-6 py-2 font-medium">{item.category}</td>
              <td className="px-6 py-2 font-medium">{item.playlist}</td>
              <td className="px-6 py-2 font-medium">{item.tag}</td>
              <td className="px-6 py-2 text-right">
                <Link href={`${"/dashboard/edit/" + item._id}`}>
                  <BiEditAlt size={23} className=" text-error" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        data={filteredData}
        productPerPage={productPerPage}
        currentPage={currentPage}
        setcurrentPage={setcurrentPage}
      />
    </div>
  );
};

export default Songs;
