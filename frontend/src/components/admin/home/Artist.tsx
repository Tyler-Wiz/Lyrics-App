/* eslint-disable @next/next/no-img-element */
import { IArtists } from "@/libs/interfaces";
import React, { FC } from "react";
import { BiEditAlt } from "react-icons/bi";

type Props = {
  data: [IArtists];
};

const Artist: FC<Props> = ({ data }) => {
  return (
    <div className="w-2/5 mt-5 shadow-3xl font-Poppins text-sm">
      <div className="flex items-center text-md justify-between px-6 border-b-[.4px] py-6 bg-white">
        <p>Newly Added Artist</p>
        <p>View All</p>
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
              Edit Artist
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index: number) => (
              <>
                <tr
                  key={index}
                  className="bg-white border-b-[.4px]  last:border-0 hover:bg-dashHover  cursor-pointer">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap flex items-center">
                    <div className="relative h-11 w-10 mr-4">
                      <img src={item.url} className="mr-4" alt={item.name} />
                    </div>
                  </th>
                  <td className="px-6 py-2 font-medium">{item.name}</td>
                  <td className="px-6 py-2 text-right">
                    <BiEditAlt size={23} className=" text-error" />
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Artist;
