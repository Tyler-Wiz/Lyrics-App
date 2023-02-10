import { serverURL } from "@/api/api";
import { IAlbumForm } from "@/common/models/IForm";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const AlbumUploadForm = () => {
  const [albumFields, setAlbumFields] = useState({
    albumName: "",
    artistName: "",
    tag: "",
    id: "",
  });
  const [formFields, setFormFields] = useState([
    {
      artistName: "",
      id: "",
      lyrics: "",
      trackName: "",
      duration: "",
    },
  ]);
  const [image, setImage] = useState<any>("");

  const addFields = () => {
    let object: IAlbumForm = {
      artistName: "",
      id: "",
      lyrics: "",
      trackName: "",
      duration: "",
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index: number) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

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

  const handleFormChange = (event: any, index: number) => {
    let data: any = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submit = async (e: any) => {
    e.preventDefault();
    const newData = { ...albumFields, artwork: image, songs: formFields };
    try {
      const updated = await axios.post(`${serverURL}albums`, {
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
    setImage("");
    setAlbumFields({
      albumName: "",
      artistName: "",
      tag: "",
      id: "",
    });
    setFormFields([
      {
        artistName: "",
        id: "",
        lyrics: "",
        trackName: "",
        duration: "",
      },
    ]);
  };

  return (
    <div className="w-full">
      <form onSubmit={submit} className="w-full gap-10">
        <section className="flex gap-10 mt-20">
          <div className="w-3/4">
            <input
              name="albumName"
              placeholder="albumName"
              onChange={(e) =>
                setAlbumFields({
                  ...albumFields,
                  albumName: e.target.value,
                })
              }
              value={albumFields.albumName}
              className="edit_input"
              required
            />
            <input
              name="artistName"
              placeholder="artistName"
              onChange={(e) =>
                setAlbumFields({
                  ...albumFields,
                  artistName: e.target.value,
                })
              }
              value={albumFields.artistName}
              className="edit_input"
              required
            />
            <input
              name="tag"
              placeholder="tag"
              onChange={(e) =>
                setAlbumFields({
                  ...albumFields,
                  tag: e.target.value,
                })
              }
              value={albumFields.tag}
              className="edit_input"
              required
            />
            <input
              name="id"
              placeholder="id"
              onChange={(e) =>
                setAlbumFields({
                  ...albumFields,
                  id: e.target.value,
                })
              }
              value={albumFields.id}
              className="edit_input"
              required
            />
            <div className="w-2/3">
              <button
                onClick={addFields}
                className="mt-6 bg-accentColor text-white px-4 py-2 rounded-md mb-3">
                Add More Track
              </button>
              {formFields.map((form, index) => {
                return (
                  <div key={index} className="mb-10 rounded-md ">
                    <input
                      name="trackName"
                      placeholder="trackName"
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.trackName}
                      className="edit_input"
                      required
                    />
                    <input
                      name="artistName"
                      placeholder="artistName"
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.artistName}
                      className="edit_input"
                      required
                    />
                    <input
                      name="id"
                      placeholder="id"
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.id}
                      className="edit_input"
                      required
                    />
                    <input
                      name="duration"
                      placeholder="duration"
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.duration}
                      className="edit_input"
                      required
                    />
                    <textarea
                      name="lyrics"
                      placeholder="lyrics"
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.lyrics}
                      className="edit_input h-[400px]"
                      required></textarea>
                    <button
                      className="mt-6 bg-accentColor text-white px-4 py-2 rounded-md mx-2 "
                      onClick={() => removeFields(index)}>
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-1/4">
            <input
              type="file"
              multiple
              name="myImage"
              accept="image/jpeg, image/png"
              onChange={handleImageSubmit}
              required
              className="mb-6 mt-1"
            />
            <div>
              <div className="w-full h-[330px] bg-white rounded-lg flex item items-center justify-center overflow-hidden">
                {!image ? (
                  <p>Image preview</p>
                ) : (
                  <Image src={image} width={330} height={280} alt="image" />
                )}
              </div>
            </div>
            <button className="mt-6 bg-accentColor text-white px-4 py-2 rounded-md mx-2 mb-3">
              Submit
            </button>
          </div>
        </section>
        <section className="w-1/2"></section>
      </form>
    </div>
  );
};

export default AlbumUploadForm;
