import React, { FC, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "@/common/models/IForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { SongSchema } from "@/common/validations/song";
import axios from "axios";
import { serverURL } from "@/api/api";

const UploadForm: FC = () => {
  const [image, setImage] = useState<any>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(SongSchema),
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

  const onSubmit: SubmitHandler<IFormInput> = async (data, e: any) => {
    const newData = { ...data, artwork: image };
    try {
      const updated = await axios.post(`${serverURL}songs`, {
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
    <div className="">
      <div>
        <p className="text-xl my-2">Upload New Lyrics</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6 mt-12">
        <div className="w-2/3">
          <input
            id="trackName"
            type="text"
            {...register("trackName", { required: true })}
            placeholder="TrackName"
            className="edit_input"
          />
          {errors.trackName && (
            <span className="error">This field is required</span>
          )}
          <input
            id="artistName"
            type="text"
            placeholder="ArtistName"
            className="edit_input"
            {...register("artistName", { required: true })}
          />
          {errors.artistName && (
            <span className="error">This field is required</span>
          )}
          <input
            id="id"
            type="text"
            placeholder="Id"
            className="edit_input"
            {...register("id", { required: true })}
          />
          {errors.id && <span className="error">This field is required</span>}
          <textarea
            id="lyrics"
            placeholder="Lyrics"
            className="edit_input h-[450px]"
            minLength={100}
            {...register("lyrics", { required: true })}></textarea>
        </div>
        <div className="w-1/3">
          <input
            type="file"
            multiple
            name="myImage"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleImageSubmit}
            required
            className="mb-6 mt-1"
          />
          <div className="flex gap-6 w-[96%]">
            <select
              {...register("playlist", { required: true })}
              className="edit_input">
              <option value="">Playlist</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Workout">Workout</option>
              <option value="Street">Street</option>
              <option value="Choplife">Choplife</option>
              <option value="Piano">Piano</option>
              <option value="office">Office</option>
              <option value="Motivational">Motivational</option>
              <option value="Drive">Drive</option>
              <option value="Reggae">Reggae</option>
            </select>
            {errors.playlist && (
              <span className="error">This field is required</span>
            )}
            <select
              {...register("category", { required: true })}
              className="edit_input">
              <option value="">Category</option>
              <option value="new">New</option>
            </select>
            {errors.category && (
              <span className="error">This field is required</span>
            )}
          </div>
          <div className="flex gap-2 w-[96%]">
            <select
              {...register("tag", { required: true })}
              className="edit_input w-1/2">
              <option value="">Tag</option>
              <option value="trending">Trending</option>
            </select>
            {errors.tag && (
              <span className="error">This field is required</span>
            )}
            <div>
              <input
                id="duration"
                type="text"
                placeholder="duration"
                className="edit_input placeholder:capitalize"
                {...register("duration", { required: true })}
              />
              {errors.duration && (
                <span className="error">This field is required</span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <input
                id="youtube"
                type="text"
                placeholder="youtube"
                className="edit_input placeholder:capitalize"
                {...register("youtube", { required: true })}
              />
              {errors.youtube && (
                <span className="error">This field is required</span>
              )}
            </div>
            <div>
              <input
                id="album"
                type="text"
                placeholder="album"
                className="edit_input placeholder:capitalize"
                {...register("album", { required: true })}
              />
              {errors.album && (
                <span className="error">This field is required</span>
              )}
            </div>
          </div>
          <div className="w-auto h-[330px] bg-white rounded-lg flex item items-center justify-center overflow-hidden">
            {!image ? (
              <p>Image preview</p>
            ) : (
              <Image src={image} width={330} height={280} alt="image" />
            )}
          </div>
          <button
            type="submit"
            className="bg-violet-600 w-[100%] text-white bg-accentColor py-3 my-4 font-display uppercase font-semibold">
            Send Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
