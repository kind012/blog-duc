import React from "react";
import logo from "../assets/Image/logo-black.svg";
const Footer = () => {
  return (
    <div>
      <div className="flex gap-[150px] mt-[40px]">
        <div className="">
          <img src={logo} alt="" className="w-[120px]" />
          <p className="text-[20px] font-medium leading-7 w-[395px] text-[#151619]">
            A minimal, functional theme for running a paid-membership
            publication on Ghost.
          </p>
        </div>
        <div className="grid grid-cols-5 gap-[118px]">
          <div>
            <ul>
              <p className="text-[18px] font-bold leading-[21px] mb-[23px]">
                Social
              </p>
              <li>
                <a
                  href="#"
                  className="text-[17px] font-medium leading-[25px] text-[#151619] hover:underline mb-2"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[17px] font-medium leading-[25px] text-[#151619] hover:underline mb-2"
                >
                  Youtube
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[17px] font-medium leading-[25px] text-[#151619] hover:underline mb-2"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <ul>
              <p className="text-[18px] font-bold leading-[21px] mb-[23px]">
                About
              </p>
              <li>
                <a
                  href="#"
                  className="text-[17px] font-medium leading-[25px] text-[#151619] hover:underline mb-2"
                >
                  Style Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[17px] font-medium leading-[25px] text-[#151619] hover:underline mb-2"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[17px] font-medium leading-[25px] text-[#151619] hover:underline mb-2"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[17px] font-medium leading-[25px] text-[#151619] hover:underline mb-2"
                >
                  404
                </a>
              </li>
            </ul>
          </div>

          <div>
            <ul>
              <p className="text-[18px] font-bold leading-[21px] mb-[23px]">
                Features
              </p>
              <li>
                <a
                  href="#"
                  className="text-[17px] font-medium leading-[25px] text-[#151619] hover:underline mb-2"
                >
                  Blog & News
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[17px] font-medium leading-[25px] text-[#151619] hover:underline mb-2"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[17px] font-medium leading-[25px] text-[#151619] hover:underline mb-2"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <ul>
              <p className="text-[18px] font-bold leading-[21px] mb-[23px]">
                Orther
              </p>
              <li>
                <a
                  href="#"
                  className="text-[17px] font-medium leading-[25px] text-[#151619] hover:underline mb-2"
                >
                  Create
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[17px] font-medium leading-[25px] text-[#151619] hover:underline mb-2"
                >
                  Tags
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[17px] font-medium leading-[25px] text-[#151619] hover:underline mb-2"
                >
                  Subscribe
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pt-[85px] mb-[20px] text-[14px] leading-[21px]">
        <p>© Bloger 2023. Publish by tran thien duc.</p>
      </div>
    </div>
  );
};

export default Footer;
