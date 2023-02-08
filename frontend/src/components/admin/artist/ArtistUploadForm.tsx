import React, { FC, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { IArtistForm } from "@/common/models/IForm";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { serverURL } from "@/api/api";
import { artistSchema } from "@/common/validations/artistSchema";

const ArtistUploadForm: FC = () => {
  const [image, setImage] = useState<any>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IArtistForm>({
    resolver: yupResolver(artistSchema),
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

  const onSubmit: SubmitHandler<IArtistForm> = async (data, e: any) => {
    const newData = { ...data, url: image };
    console.log(newData);
    try {
      const updated = await axios.post(`${serverURL}artists`, {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6 mt-20">
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
          id="id"
          type="text"
          placeholder="id"
          className="edit_input"
          {...register("id", { required: true })}
        />
        {errors.id && <span className="error">This field is required</span>}
        <div className="flex gap-2">
          <select
            {...register("tag", { required: true })}
            className="edit_input w-1/2">
            <option value="">Tag</option>
            <option value="trending">trending</option>
          </select>
          {errors.tag && <span className="error">This field is required</span>}
        </div>
      </div>
      <div className="w-1/3">
        <input
          type="file"
          multiple
          name="myImage"
          accept="image/jpeg"
          onChange={handleImageSubmit}
          required
          className="mb-6 mt-1"
        />
        <div className="w-[350px] h-[330px] bg-gray-200 rounded-lg flex item items-center justify-center overflow-hidden">
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
  );
};

export default ArtistUploadForm;
