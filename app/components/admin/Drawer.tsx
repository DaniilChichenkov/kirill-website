import { ArrowUpRight, Bot, Lock, LogOut, Menu, Play, X } from "lucide-react";
import React, { useRef } from "react";
import { Form, Link, NavLink, useParams } from "react-router";

const Drawer = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams();
  const formRef = useRef<HTMLFormElement | null>(null);
  const drawerRef = useRef<HTMLInputElement | null>(null);

  const handleDrawerBtnClick = () => {
    if (drawerRef.current?.checked) {
      drawerRef.current.checked = false;
    }
  };

  return (
    <div className="drawer">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle lg:hidden"
        ref={drawerRef}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-white w-full">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost drawer-button"
            >
              <Menu size={30} />
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            {" "}
            <a className="flex items-center justify-start gap-x-3" href="#">
              <span className="sr-only">Home</span>
              <Play
                fill="oklch(62.3% 0.214 259.815)"
                color="oklch(62.3% 0.214 259.815)"
              />
              <span className="font-bold text-lg uppercase">Videographer</span>
              <div className="badge badge-primary bg-blue-100 text-blue-500 rounded-md uppercase font-semibold border-none">
                admin
              </div>
            </a>
          </div>
        </div>
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-0 [--menu-active-bg:transparent] [--menu-active-fg:inherit] flex-nowrap">
          {/* Logo */}
          <li>
            <div className="w-full flex justify-between items-center border-b border-gray-300 p-4 hover:bg-transparent">
              <a className="flex items-center justify-start gap-x-3" href="#">
                <span className="sr-only">Home</span>
                <Play
                  fill="oklch(62.3% 0.214 259.815)"
                  color="oklch(62.3% 0.214 259.815)"
                />
                <span className="font-bold text-lg uppercase">
                  Videographer
                </span>
              </a>
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="btn btn-square btn-ghost drawer-button"
              >
                <span className="sr-only">Toggle menu</span>
                <X size={30} />
              </label>
            </div>
          </li>

          <li className="mt-5">
            <p className="font-semibold text-gray-600 text-sm uppercase px-4 hover:bg-transparent">
              workspace
            </p>
          </li>

          <li onClick={handleDrawerBtnClick}>
            <NavLink
              to={`/${lang}/dashboard/change-password`}
              end
              className={({ isActive }) =>
                `py-3 hover:bg-blue-100 w-11/12 mx-auto ${isActive && "bg-blue-50 text-blue-500 font-semibold"}`
              }
            >
              <Lock /> Change password
            </NavLink>
          </li>

          <li onClick={handleDrawerBtnClick}>
            <NavLink
              to={`/${lang}/dashboard`}
              end
              className={({ isActive }) =>
                `py-3 hover:bg-blue-100 w-11/12 mx-auto ${isActive && "bg-blue-50 text-blue-500 font-semibold"}`
              }
            >
              <Bot /> Bot
            </NavLink>
          </li>

          <li>
            <Link to={"/"} className="py-3 hover:bg-blue-100 w-11/12 mx-auto">
              <ArrowUpRight /> View website
            </Link>
          </li>

          <li
            onClick={() => formRef.current?.submit()}
            className="mt-auto border-t border-gray-400"
          >
            <Form
              ref={formRef}
              action={`/${lang}/logout`}
              method="POST"
              className="py-6 hover:bg-blue-100 w-full mx-auto h-full"
            >
              <button className="flex justify-start items-center gap-3 cursor-pointer">
                <LogOut /> Log out
              </button>
            </Form>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
