import React from "react";

const Tags = ({ tags }) => {
  return (
    <>
      <div className="flex flex-wrap px-1 rounded-lg  mb-[70px]">
        {tags?.map((tag, i) => (
          <p
            className="flex flex-wrap items-center justify-between ml-6 text-sm font-medium cursor-pointer text-slate-950"
            key={i}
          >
            {tag}
          </p>
        ))}
      </div>
    </>
  );
};

export default Tags;
