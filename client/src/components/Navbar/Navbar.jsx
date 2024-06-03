import React from "react";
import Logo from "../../assets/rohit.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

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
  {
    id: 3,
    name: "Shop",
    link: "/shop",
  },

  {
    id: 3,
    name: "Category",
    link: "/shop",
  },

  {
    id: 5,
    name: "Contact",
    link: "/contact",
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

const Navbar = ({ handleOrderPopup }) => {
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="py-4">
        <div className="container flex justify-between items-center">
          <div>
            <Link to="/" className="font-bold text-2xl sm:text-3xl flex ">
              <img src={Logo} alt="Logo" className="w-40" />
            </Link>
          </div>


          <div data-aos="zoom-in" className="flex justify-center ">
            <ul className="sm:flex hidden items-center gap-4 font-medium">
              {Menu.map((data) => (
                <li key={data.id}>
                  <a
                    href={data.link}
                    className="inline-block px-4 hover:text-primary duration-200 "
                  >
                    {data.name}
                  </a>
                </li>
              ))}
              {/* Simple Dropdown and Links */}
              <li className="group relative cursor-pointer">
                <a href="#" className="flex items-center gap-[2px] py-2">
                  Trending Products
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                </a>
                <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                  <ul>
                    {DropdownLinks.map((data) => (
                      <li key={data.id}>
                        <a
                          href={data.link}
                          className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                        >
                          {data.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
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
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
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
                  <span className="absolute text-center -top-2 -right-3 bg-[#8e3e63] rounded-full h-5 w-5 top right p-0 m-0 text-white font-mono text-sm  leading-tight">
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
                  <span className="absolute text-center -top-2 -right-3 bg-[#8e3e63] rounded-full h-5 w-5 top right p-0 m-0 text-white font-mono text-sm  leading-tight">
                    0
                  </span>
                </Link>
              </li>
            </button>



          </div>
        </div>
      </div>
      {/* lower Navbar */}

    </div>
  );
};

export default Navbar;
