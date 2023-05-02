import React from "react";

const Tags = ({ tags }) => {
  return (
    <div>
      <div className="flex flex-wrap px-1 rounded-lg dark:bg-gray-400 mb-[70px]">
        {tags?.map((tag, index) => (
          <p
            className="flex flex-wrap items-center justify-between py-2 pl-4 pr-4 m-1 text-sm font-medium text-gray-200 cursor-pointer rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 "
            key={index}
          >
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Tags;
