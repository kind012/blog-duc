import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../filebase";
import Tags from "../components/Tags";
import Footer from "../components/Footer";

const Detail = ({ setActive }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getBlogsData = async () => {
      const blogRef = collection(db, "blogs");
      const blogs = await getDocs(blogRef);
      let tags = [];
      blogs.docs.map((doc) => tags.push(...doc.get("tags")));
      let uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
    };

    getBlogsData();
  }, []);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
    setActive(null);
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
        <Tags tags={tags} />
      </div>
      <div className="border-b-2 border-spacing-36"></div>
    </div>
  );
};

export default Detail;
