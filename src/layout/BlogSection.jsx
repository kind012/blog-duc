import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { excerpt } from "../utils/index";
const BlogSection = ({ handleDelete, filteredBlog }) => {
  return (
    <div className="mb-[20px]">
      <div className="w-[450px] ">
        <h2 className="py-2 mb-4 text-[60px] text-[#151619] font-light leading-[72px]">
          See what we’ve <br />
          <strong className="text-[60px] font-bold">written lately</strong>
        </h2>
      </div>
      <div className="flex flex-wrap gap-4 ">
        {filteredBlog?.map((item) => (
          <div
            className="flex-wrap rounded-lg shadow-md w-widths "
            key={item.id}
          >
            <div className="relative max-w-xs overflow-hidden bg-no-repeat bg-cover rounded-3xl">
              <Link to={`/detail/${item.id}`}>
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="object-cover w-[328px] h-[393px]  transition duration-300 ease-in-out hover:scale-110 shrink-0"
                />
              </Link>
            </div>
            <div>
              <div className="pt-[30px] py-[15px] px-[15px]">
                <div className="flex flex-wrap items-center justify-between mb-[]">
                  <p className="text-[15px] text-gray-400 italic  mb-4  ">
                    {item.category}
                  </p>
                  <span className="italic text-gray-400 ">
                    {item.timestamp.toDate().toDateString()}
                  </span>
                </div>
                <a href="#" className=" text-[#151619] text-[22px] font-bold  ">
                  {item.title}
                </a>
              </div>
              <div className="px-4 mb-5 flex-1 min-h-[100px] line-clamp-4 font-Inter pt-[10px]">
                {excerpt(item.description, 120)}
              </div>
            </div>
            <div className="px-4 h-[50px]">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon
                  icon={["fa", "trash"]}
                  onClick={() => handleDelete(item.id)}
                />
                <Link to={`/update/${item.id}`}>
                  <FontAwesomeIcon icon={["fa", "edit"]} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
