import React, { FC, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { serverURL } from "@/api/api";
import { IPlaylistForm } from "@/common/models/IForm";
import { playlistSchema } from "@/common/validations/playlistSchema";

const PlaylistUploadForm: FC = () => {
  const [image, setImage] = useState<any>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPlaylistForm>({
    resolver: yupResolver(playlistSchema),
  });

  const handleImageSubmit = (e: any) => {
    const file = e.target.files[0];
    convert2base64(file);
  };

  const convert2base64 = (file: any) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  const onSubmit: SubmitHandler<IPlaylistForm> = async (data, e: any) => {
    const newData = { ...data, artwork: image };
    try {
      const updated = await axios.post(`${serverURL}playlists`, {
        data: newData,
      });
      if (updated.data === "successful") {
        toast.success("Lyrics Updated On Database", {
          position: "bottom-left",
        });
      }
    } catch (error: any) {
      if (error) {
        toast.error("An Error Occured", {
          position: "bottom-left",
        });
      }
    }
    e.target.reset();
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6 my-52">
      <div className="w-2/3">
        <input
          id="name"
          type="text"
          {...register("name", { required: true })}
          placeholder="Artist Name"
          className="edit_input"
        />
        {errors.name && <span className="error">This field is required</span>}
        <input
          type="file"
          multiple
          name="myImage"
          accept="image/jpeg, image/png"
          onChange={handleImageSubmit}
          required
          className="mb-6 mt-1"
        />
        <button
          type="submit"
          className="bg-violet-600 w-[100%] text-white bg-accentColor py-3 my-4 font-display uppercase font-semibold">
          Publish Playlist
        </button>
      </div>
      <div className="w-1/3">
        <div className="w-auto h-[330px] bg-white rounded-lg flex item items-center justify-center overflow-hidden">
          {!image ? (
            <p>Image preview</p>
          ) : (
            <Image src={image} width={330} height={280} alt="image" />
          )}
        </div>
      </div>
    </form>
  );
};

export default PlaylistUploadForm;
