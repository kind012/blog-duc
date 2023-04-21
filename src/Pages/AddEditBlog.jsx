import React, { useEffect, useState } from "react";
import { db, storage } from "../filebase";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const initialState = {
  title: "",
  tags: [],
  category: "",
  description: "",
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Dev",
  "Sport",
  "Business",
  "Program Language",
];

const AddEditBlog = ({ setActive }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, category, description } = form;
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
          });
          toast.success("Blog create successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
          });
          toast.success("Blog create successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }
    navigate("/");
  };
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          console.log(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  return (
    <div className="container mb-4">
      <div className="text-center">
        <h2 className="text-[25px] font-Inter mb-8 italic font-bold ">
          {id ? "Update Blog" : "Create Blog"}
        </h2>
      </div>
      <div className="ml-[370px] w-[50%] items-center justify-center ">
        <form
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md "
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <ReactTagInput
              tags={tags}
              placeholder="Tags"
              onChange={handleTags}
            />
          </div>

          <div className="mb-6">
            <select
              value={category}
              onChange={onCategoryChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={categoryOption}>Choose a category</option>
              {categoryOption.map((option, index) => (
                <option value={option || ""} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <textarea
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your description"
              value={description}
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center w-full mb-6">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
              type="submit"
              disabled={(progress !== null) & (progress < 100)}
            >
              {id ? "Update" : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBlog;
