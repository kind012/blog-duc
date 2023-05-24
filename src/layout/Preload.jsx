import React from "react";
const Preload = () => {
  return (
    <div className="absolute flex flex-wrap transform top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4">
      <div className="items-center justify-center rounded-full w-14 h-14 bg-gradient-to-tr animate-spin bg-black">
        <div className="h-9 w-9 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default Preload;
