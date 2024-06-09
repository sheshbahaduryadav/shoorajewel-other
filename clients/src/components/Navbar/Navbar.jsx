import React from "react";
import Logo from "../../assets/rohit.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import styled from "styled-components";
import ring from "../../assets/category-img/ring.webp"
import trending from "../../assets/website/jewelry img.webp"
import diamond from "../../assets/category-img/diamond.webp"

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "About",
    link: "/about",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending Products",
    link: "/#",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "/#",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/#",
  },
];

const Category = [
  {
    id: 1,
    name: "Bracelet",
    link: "/#",
  },
  {
    id: 2,
    name: "Chain",
    link: "/#",
  },
  {
    id: 3,
    name: "Earrings",
    link: "/#",
  },
  {
    id: 1,
    name: "Bracelet",
    link: "/#",
  },
  {
    id: 2,
    name: "Chain",
    link: "/#",
  },
  {
    id: 3,
    name: "Earrings",
    link: "/#",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  return (
    <NavWrapper className="sticky top-0 z-[999]">
      <div className="shadow-md  bg-white  duration-200 relative z-40">
        {/* upper Navbar */}
        <div className="py-4">
          <div className="flex justify-between items-center px-10">
            <div>
              <Link to="/" className="font-bold text-2xl sm:text-3xl flex ">
                {/* <img src={Logo} alt="Logo" className="w-40" /> */}
                <span className="text-color text-4xl logo">Shoora Jewel</span>
              </Link>
            </div>
            <div className="flex justify-center ">
              <ul className="sm:flex hidden items-center gap-6 font-medium">
                {Menu.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block px-4 hover:text-color duration-200 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
                {/* Simple Dropdown and Links */}
                <li className="group relative cursor-pointer">
                  <a href="#" className="flex hover:text-color duration-200 items-center gap-[2px] py-2">
                    Category
                    <span>
                      <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a>
                  <div className="absolute -left-40 z-[9999] hidden group-hover:block w-[400px] rounded-md px-8 py-8 transition-all duration-700 bg-white p-2 text-black shadow-md">
                    <ul>
                      <div className="grid grid-cols-2">
                        <div>
                          {Category.map((data) => (
                            <li key={data.id}>
                              <a
                                href={data.link}
                                className="inline-block w-full rounded-md p-2 sub-menu "
                              >
                                {data.name}
                              </a>
                            </li>
                          ))}
                        </div>
                        <div>
                          <img src={ring} className="w-40" alt="" />

                        </div>
                      </div>
                    </ul>

                  </div>
                </li>
                <li className="group relative cursor-pointer">
                  <a href="#" className="flex hover:text-color duration-200 items-center gap-[2px] py-2">
                    Trending Collection
                    <span>
                      <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a>
                  <div className="absolute -left-40 z-[9999] hidden group-hover:block w-[400px] rounded-md px-8 py-8 transition-all duration-700 bg-white p-2 text-black shadow-md">
                    <ul>
                      <div className="grid grid-cols-2">
                        <div>
                          {DropdownLinks.map((data) => (
                            <li key={data.id}>
                              <a
                                href={data.link}
                                className="inline-block w-full rounded-md p-2  sub-menu "
                              >
                                {data.name}
                              </a>
                            </li>
                          ))}
                        </div>
                        <div>
                          <img src={trending} className="w-40" alt="" />
                        </div>
                      </div>
                    </ul>

                  </div>
                </li>
                <li className="group relative cursor-pointer">
                  <a href="#" className="flex hover:text-color duration-200 items-center gap-[2px] py-2">
                    Diamond
                    <span>
                      <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a>
                  <div className="absolute -left-40 z-[9999] hidden group-hover:block w-[400px] rounded-md px-8 py-8 transition-all duration-700 bg-white p-2 text-black shadow-md">
                    <ul>
                      <div className="grid grid-cols-2">
                        <div>
                          {DropdownLinks.map((data) => (
                            <li key={data.id}>
                              <a
                                href={data.link}
                                className="inline-block w-full rounded-md p-2 sub-menu "
                              >
                                {data.name}
                              </a>
                            </li>
                          ))}
                        </div>
                        <div>
                          <img src={diamond} className="w-40" alt="" />

                        </div>
                      </div>
                    </ul>

                  </div>
                </li>
                <li className="group relative cursor-pointer">
                  <a href="#" className="flex hover:text-color duration-200 items-center gap-[2px] py-2">
                    Collection
                    {/* <span>
                      <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                    </span> */}
                  </a>
                </li>
                <li className="group relative cursor-pointer">
                  <a href="#" className="flex hover:text-color duration-200 items-center gap-[2px] py-2">
                    Contact
                    {/* <span>
                      <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                    </span> */}
                  </a>
                </li>
              </ul>
            </div>




            {/* search bar */}
            <div className="flex justify-between items-center gap-4">
              {/* <div className="relative group hidden sm:block">
                <input
                  type="text"
                  placeholder="search"
                  className="w-[200px] sm:w-[200px]  transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
                />
                <IoMdSearch className="text-gray-500 group-hover:text-color absolute top-1/2 -translate-y-1/2 right-3" />
              </div> */}
              {/* order button */}
              <button
                onClick={() => handleOrderPopup()}
                className="transition-all duration-200  py-1 rounded-full flex items-center gap-3 group"
              >
                <li className="block lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                  <Link
                    to="/user-dashboard/my-cart"
                    role="button"
                    className="relative flex"
                  >
                    <FiUser className="text-2xl  drop-shadow-sm cursor-pointer" />

                  </Link>
                </li>
                <li className="block lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                  <Link
                    to="/user-dashboard/my-cart"
                    role="button"
                    className="relative flex"
                  >
                    <FiHeart className="text-2xl  drop-shadow-sm cursor-pointer" />
                    <span className="absolute text-center -top-2 -right-3 nav-strip rounded-full h-5 w-5 top right p-0 m-0 text-white font-mono text-sm  leading-tight">
                      0
                    </span>
                  </Link>
                </li>

                <li className="block lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                  <Link
                    to="/user-dashboard/my-cart"
                    role="button"
                    className="relative flex"
                  >
                    <FiShoppingCart className="text-2xl  drop-shadow-sm cursor-pointer" />
                    <span className="absolute text-center -top-2 -right-3 nav-strip rounded-full h-5 w-5 top right p-0 m-0 text-white font-mono text-sm  leading-tight">
                      0
                    </span>
                  </Link>
                </li>
              </button>



            </div>
          </div>
        </div >
        {/* lower Navbar */}

      </div >
    </NavWrapper >
  );
};

export default Navbar;

const NavWrapper = styled.div`
          .logo{
            font-family:  Papyrus, fantasy;
} `
