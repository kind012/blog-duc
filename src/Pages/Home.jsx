import React, { useEffect, useMemo, useState } from "react";
import Footer from "../layout/Footer";
import { collection, deleteDoc, onSnapshot, doc } from "firebase/firestore";
import { db } from "../components/firebase/filebase";
import BlogSection from "../layout/BlogSection";
import { toast } from "react-toastify";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [filterWord, setFilterWord] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState([]);

  const filteredBlog = useMemo(() => {
    return filterWord.length > 0
      ? blogs.filter((blog) => {
          return filterWord.every((filter) => blog.tags.includes(filter));
        })
      : blogs;
  }, [filterWord]);

  const filterLabel = (tag, index) => {
    if (selectedIdx.includes(index)) {
      setSelectedIdx(selectedIdx.filter((id) => id !== index));
      setFilterWord(filterWord.filter((filter) => filter !== tag.innerText));
    } else {
      setSelectedIdx([...selectedIdx, index]);
      setFilterWord([...filterWord, tag.innerText]);
    }
  };

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
        <div>
          <div className="pt-[15px]">
            {blogs ? (
              <BlogSection
                filteredBlog={filteredBlog}
                tags={setTags}
                handleDelete={handleDelete}
              />
            ) : (
              filteredBlog
            )}
          </div>

          <div className="flex flex-col items-center mt-12">
            <div className="flex gap-3 mb-12">
              {tags.map((tag, index) => {
                return (
                  <button
                    className={`${
                      selectedIdx.includes(index)
                        ? "label  transition-all duration-300 "
                        : "label-selected  transition-all duration-300 "
                    }`}
                    key={index}
                    onClick={(e) => filterLabel(e.target, index)}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
