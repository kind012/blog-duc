import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../components/firebase/filebase";

const Detail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
  };
  return (
    <div className="container">
      <div className="items-center justify-center ">
        <div className="pt-[30px] mb-[50px] text-center">
          <h1 className="text-black ">{blog?.title}</h1>
        </div>
        <div>
          <img
            src={blog?.imgUrl}
            alt={blog?.title}
            className="w-[880px] h-[403px] rounded-2xl m-auto mb-[30px]"
          />
        </div>
        <div>
          <p
            className="first-letter:text-5xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left max-w-[800px] m-auto mb-[70px] leading-5"
          >
            {blog?.description}
          </p>
        </div>
      </div>
      <div className="border-b-2 border-spacing-36"></div>
    </div>
  );
};

export default Detail;
