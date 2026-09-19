import type { ReactNode } from "react";
import { Menu, Play } from "lucide-react";

type NavigationProps = {
  children: ReactNode;
};

const Navigation = ({ children }: NavigationProps) => {
  return (
    <div className="drawer">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle lg:hidden"
      />
      <div className="drawer-content flex flex-col">
        <header className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="md:flex md:items-center md:gap-12">
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
              </div>

              <div className="hidden md:block">
                <nav aria-label="Global">
                  <ul className="flex items-center gap-6 text-sm">
                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="#"
                      >
                        {" "}
                        Work{" "}
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="#"
                      >
                        {" "}
                        Why me{" "}
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="#"
                      >
                        {" "}
                        Contact{" "}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex">
                  <button className="border border-blue-500 bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:outline-none cursor-pointer">
                    Lets talk
                  </button>
                </div>

                <div className="block md:hidden">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost drawer-button"
                  >
                    <span className="sr-only">Toggle menu</span>
                    <Menu size={30} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu menu-xl bg-base-200 min-h-full w-10/12 sm:w-80 p-4 gap-y-3">
          {/* Sidebar content here */}
          <li>
            <a>Work</a>
          </li>
          <li>
            <a>Why me</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
          <li>
            <a className="border border-blue-500 bg-blue-500 text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:outline-none cursor-pointer">
              Lets talk
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
