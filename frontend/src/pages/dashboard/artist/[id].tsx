/* eslint-disable @next/next/no-img-element */
import { serverURL } from "@/api/api";
import { getArtists } from "@/api/data";
import { IArtists } from "@/common/models/interfaces";
import AdminLayout from "@/components/admin/common/AdminLayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  artist: IArtists;
};

const EditSong: FC<Props> = ({ artist }) => {
  const [tempArtist, setTempArtist] = useState(artist);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  let router = useRouter();
  useEffect(() => {
    if (success === "successful") {
      router.push("/dashboard/artist");
    }
  }, [router, success]);

  const onSubmit = async () => {
    try {
      const updated = await axios.put(`${serverURL}artists`, {
        data: tempArtist,
      });
      if (updated.data === "successful") {
        toast.success("Artist Updated On Database", {
          position: "bottom-left",
        });
      }
      setSuccess(updated.data);
    } catch (error: any) {
      if (error) {
        toast.error("An Error Occured", {
          position: "bottom-left",
        });
      }
      console.log(error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <AdminLayout title="edit">
      <div className="font-lato flex w-full gap-6 mb-10">
        <div className="w-4/5">
          <div className="flex gap-6 m-6 items-center">
            <p className="text-2xl">Edit Song</p>
            <button
              type="submit"
              className=" bg-accentColor text-white px-2 py-1 text-xs">
              Add New
            </button>
            <div>
              {errorMessage === "" ? null : (
                <p className=" text-error">{errorMessage}</p>
              )}
            </div>
          </div>
          <input
            type="text"
            value={tempArtist.name}
            className="edit_input mb-3"
            onChange={(e) => {
              setTempArtist({
                ...tempArtist,
                name: e.target.value,
              });
            }}
          />
          <input
            type="text"
            value={tempArtist.id}
            className="edit_input mb-2"
            onChange={(e) => {
              setTempArtist({
                ...tempArtist,
                id: e.target.value,
              });
            }}
          />
        </div>
        <div className="w-2/5 mt-14">
          <div className="flex gap-10">
            <div>
              <p className="mb-2 text-xs">Tag</p>
              <input
                type="text"
                value={tempArtist.tag}
                className="edit_input mb-4"
                onChange={(e) => {
                  setTempArtist({
                    ...tempArtist,
                    tag: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex gap-10 mt-10"></div>
          <input type="file" className="mb-6 text-xs" />
          <div className="w-[75%] h-2/4 bg-white flex items-center justify-center overflow-hidden">
            <div className="relative w-80 h-auto">
              <img
                src={tempArtist.url}
                alt="edit artwork"
                className=" object-cover"
              />
            </div>
          </div>
          <button
            className=" bg-accentColor px-6 py-3 rounded-md my-3 text-white w-full"
            type="submit"
            onClick={() => onSubmit()}>
            Publish
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditSong;

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const { id } = params;
  const data = await getArtists();
  const artist = data?.find((item: any) => item._id === id);

  return {
    props: {
      artist,
    },
  };
};
