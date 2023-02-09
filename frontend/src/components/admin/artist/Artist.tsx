/* eslint-disable @next/next/no-img-element */
import { IArtists } from "@/common/models/interfaces";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiEditAlt } from "react-icons/bi";

type Props = {
  data: [IArtists];
};

const Artist: FC<Props> = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [wordEntered, setWordEntered] = useState("");

  const productPerPage = 10;
  const [currentPage, setcurrentPage] = useState<number>(1);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;

  const handleFilter = (event: any) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter: any = data.filter((value: IArtists) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.tag.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (searchWord === "") {
      setFilteredData(filteredData);
    } else {
      setFilteredData(newFilter);
    }
  };

  const pageProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="w-full mt-5 shadow-3xl font-Poppins text-sm">
      <div className="flex mb-10 gap-6 items-center justify-between">
        <div className="flex gap-6 items-center">
          <p className="text-2xl">Artist</p>
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
              Artist Image
            </th>
            <th scope="col" className="px-6 py-3">
              Artist Name
            </th>
            <th scope="col" className="px-6 py-3">
              tag
            </th>
            <th scope="col" className="px-6 py-3">
              Edit Artist
            </th>
          </tr>
        </thead>
        <tbody>
          {pageProducts &&
            pageProducts.map((item, index: number) => (
              <>
                <tr
                  key={index}
                  className="bg-white border-b-[.4px]  last:border-0 hover:bg-dashHover  cursor-pointer">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap flex items-center">
                    <div className="h-11 w-10 mr-4">
                      <img src={item.url} className="mr-4" alt={item.name} />
                    </div>
                  </th>
                  <td className="px-6 py-2 font-medium">{item.name}</td>
                  <td className="px-6 py-2 font-medium">{item.tag}</td>
                  <td className="px-6 py-2 text-right">
                    <Link href={`${"/dashboard/artist/" + item._id}`}>
                      <BiEditAlt size={23} className=" text-error" />
                    </Link>
                  </td>
                </tr>
              </>
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

export default Artist;
