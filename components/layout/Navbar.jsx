import Link from "next/link";
import useAuthStore from "@/stores/auth";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const [productName, setProductName] = useState("");
  const router = useRouter();

  const onlogout = () => {
    if (isAccountOpen) setIsAccountOpen(false);
    logout();
    localStorage.removeItem("items");
    router.push("/");
    router.reload()
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productName === "") {
      router.push("/list-product");
      return;
    }
    const updatedQuery = { name: productName };

    router.push({
      pathname: "/list-product",
      query: updatedQuery,
    });
  };

  const toggleAccountMenu = () => {
    setIsAccountOpen(!isAccountOpen);
    if (isProductOpen) setIsProductOpen(false);
  };

  const handleChange = (e) => {
    setProductName(e.target.value);
  };

  return (
    <nav className="bg-white fixed w-full z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-2 md:justify-start md:space-x-10">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          {user?.role == "admin" && (
            <label
              htmlFor="my-drawer"
              className="btn bg-transparent border-none max-w-20 text-black hover:bg-orange-500 font-bold drawer-button hover:text-white"
            >
              Sidebar Admin
            </label>
          )}
          <div className="flex">
            <Link href="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-20 w-auto sm:h-20"
                src="/assets/logo.jpg"
                alt=""
              />
            </Link>
          </div>
          <div className="flex-none md:hidden xl:hidden lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side md:hidden xl:hidden lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="menu p-4 w-80 min-h-full bg-white text-base-content">
              <div className="flex justify-center items-center flex-col text-black">
                <Link href="/">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-20 w-auto sm:h-20"
                    src="/assets/logo.jpg"
                    alt=""
                  />
                </Link>
              </div>

              <div className="flex flex-col gap-5 mt-8 text-black">
                <Link
                  className="hover:bg-gray-300 px-4 py-3 rounded-lg"
                  href="/"
                >
                  <span className="text-lg font-semibold">Home</span>
                </Link>
                <Link
                  className="hover:bg-gray-300 px-4 py-3 rounded-lg"
                  href="/list-product"
                >
                  <span className="text-lg font-semibold">Product</span>
                </Link>
                {!user ? (
                  <>
                    <Link
                      className="mx-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-gray-100"
                      href="/login"
                    >
                      <span className="text-lg font-semibold">Sign In</span>
                    </Link>
                    <Link
                      className="mx-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
                      href="/register"
                    >
                      <span className="text-lg font-semibold">Sign Up</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      className="hover:bg-gray-300 px-4 py-3 rounded-lg"
                      href="/user/display"
                    >
                      <span className="text-lg font-semibold">
                        {user.email}
                      </span>
                    </Link>
                    <Link
                      className="hover:bg-gray-300 px-4 py-3 rounded-lg"
                      onClick={onlogout}
                      href="/"
                    >
                      <span className="text-lg font-semibold">Logout</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link
              href="/"
              className="text-xl font-medium text-gray-500 hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              href="/list-product"
              className="text-xl font-medium text-gray-500 hover:text-gray-900"
            >
              Product
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <form className="group relative" onSubmit={handleSubmit}>
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                />
              </svg>
              <input
                className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
                type="text"
                name="filter"
                aria-label="Filter Product"
                placeholder="Filter Product..."
                value={productName}
                onChange={handleChange}
              />
            </form>

            <Link
              className="pl-3 inline-block no-underline ml-7 hover:text-black"
              href="/keranjang"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8c0.4,0,0.762-0.238,0.919-0.606l3-7 c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9h11.112L17.341,14z" />
                <circle cx="10.5" cy="18.5" r="1.5" />
                <circle cx="17.5" cy="18.5" r="1.5" />
              </svg>
            </Link>
            <Link
              className=" inline-block no-underline mx-7 hover:text-black"
              href="/wishlist"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M11.5 21H8.574a3 3 0 0 1-2.965-2.544l-1.255-8.152A2 2 0 0 1 6.331 8H17.67a2 2 0 0 1 1.977 2.304c-.057.368-.1.644-.127.828" />
                  <path d="M9 11V6a3 3 0 0 1 6 0v5m3 11l3.35-3.284a2.143 2.143 0 0 0 .005-3.071a2.242 2.242 0 0 0-3.129-.006l-.224.22l-.223-.22a2.242 2.242 0 0 0-3.128-.006a2.143 2.143 0 0 0-.006 3.071z" />
                </g>
              </svg>
            </Link>

            {!user && (
              <Link
                href="/login"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sign in
              </Link>
            )}
            {!user && (
              <Link
                href="/register"
                className="mx-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
              >
                Sign up
              </Link>
            )}
            {user && (
              <div className="relative ">
                <button
                  onClick={toggleAccountMenu}
                  className="text-xl font-medium text-gray-500 hover:text-gray-900 focus:outline-none"
                >
                  {user.email}
                </button>
                {isAccountOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <Link
                        href="/user/display"
                        onClick={() => {
                          isAccountOpen
                            ? setIsAccountOpen(false)
                            : setIsAccountOpen(true);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Profile
                      </Link>
                      <Link
                        href=""
                        onClick={onlogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
