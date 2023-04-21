import React from "react";

const Tags = ({ tags }) => {
  return (
    <div>
      <div className="flex flex-wrap px-1 rounded-lg dark:bg-gray-400 mb-[70px]">
        {tags?.map((tag, index) => (
          <p
            className="flex flex-wrap items-center justify-between py-2 pl-4 pr-4 m-1 text-sm font-medium text-gray-200 bg-purple-500 cursor-pointer rounded-xl hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
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
