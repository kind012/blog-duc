import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
const Preload = () => {
  return (
    <div className="flex flex-col px-5 py-5 m-[120px]">
      <PacmanLoader color="#36d7b7" className="block m-auto " />
    </div>
  );
};

export default Preload;
