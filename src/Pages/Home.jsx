import React, { useEffect, useState } from "react";
import Footer from "../layout/Footer";
import { collection, deleteDoc, onSnapshot, doc } from "firebase/firestore";
import { db } from "../components/firebase/filebase";
import BlogSection from "../layout/BlogSection";
import { toast } from "react-toastify";
import Tags from "../layout/Tags";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlogs(list);
      },
      (err) => {
        console.log(err);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "blogs", id));
      toast.success("Blog delete successfully");

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="container mt-[80px]">
        <div className="pb-[130px]">
          <h1 className="max-w-[1381px] text-[92px] font-light leading-[110px]">
            <strong className="w-[760px] text-[92px] font-bold">
              Hey, we're Bloger
            </strong>
            .Let see Stories
          </h1>
        </div>
        <div className="border-b-2 border-spacing-36"></div>
        <div className="">
          <div className="pt-[15px]">
            {loading && (
              <BlogSection
                blogs={blogs}
                tags={setTags}
                handleDelete={handleDelete}
              />
            )}
          </div>

          <div className="flex flex-row pt-5">
            Tag:
            <Tags tags={tags} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
