import { useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, Globe, Menu, Play, X } from "lucide-react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import normalizeLanguage from "~/utils/normalizeLanguage";

import locale from "~/translations/Client/navigation";

type NavigationProps = {
  children: ReactNode;
};

const Navigation = ({ children }: NavigationProps) => {
  const { pathname } = useLocation();
  const { lang } = useParams();
  const nav = useNavigate();
  const drawerRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDetailsElement | null>(null);
  const [isDropdownOpen, setDropdownState] = useState(false);
  const normalizedLang = normalizeLanguage(lang!);

  // Mobile language dropdown
  const mobilePopoverRef = useRef<HTMLUListElement | null>(null);
  const [isMobileDropdownOpen, setMobileDropdownState] = useState(false);

  const isOnRoot = () => {
    const result = pathname.replace(`/${lang}`, "");
    // Not on a root page
    if (result.length > 0) {
      return false;
    }
    return true;
  };

  const redirectToLanguage = (selectedLanguage: string) => {
    const normalizedLanguage = normalizeLanguage(selectedLanguage);
    const result = pathname.replace(`/${lang}`, `/${normalizedLanguage}`);
    return result;
  };

  const closeDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.open = false;
    }
  };

  const handlePopoverClick = () => {
    if (mobilePopoverRef.current) {
      if (mobilePopoverRef.current.matches(":popover-open")) {
        setMobileDropdownState(false);
      } else {
        setMobileDropdownState(true);
      }
    }
  };

  const handleDropdownClick = () => {
    if (dropdownRef.current) {
      if (dropdownRef.current.open) {
        setDropdownState(false);
      } else {
        setDropdownState(true);
      }
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
        <header className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="md:flex md:items-center md:gap-12">
                <Link
                  className="flex items-center justify-start gap-x-3"
                  to="/"
                >
                  <span className="sr-only">Home</span>
                  <Play
                    fill="oklch(62.3% 0.214 259.815)"
                    color="oklch(62.3% 0.214 259.815)"
                  />
                  <span className="font-bold text-lg uppercase">
                    {locale.videographer[normalizedLang]}
                  </span>
                </Link>
              </div>

              <div className="hidden lg:block">
                <nav aria-label="Global">
                  <ul className="flex items-center gap-6 text-sm">
                    <li>
                      <button
                        onClick={() => {
                          if (!isOnRoot()) {
                            nav(`/${lang}`, {
                              state: { scrollTo: "#portfolio" },
                            });
                          } else {
                            document
                              .querySelector("#portfolio")
                              ?.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              });
                          }
                        }}
                        className="text-gray-500 transition hover:text-gray-500/75 cursor-pointer"
                      >
                        {locale.work[normalizedLang]}
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={() => {
                          if (!isOnRoot()) {
                            nav(`/${lang}`, {
                              state: { scrollTo: "#whyMe" },
                            });
                          } else {
                            document.querySelector("#whyMe")?.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                          }
                        }}
                        className="text-gray-500 transition hover:text-gray-500/75 cursor-pointer"
                      >
                        {locale.whyMe[normalizedLang]}
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={() => {
                          document.querySelector("#quiz")?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                        }}
                        className="text-gray-500 transition hover:text-gray-500/75 cursor-pointer"
                      >
                        {locale.pricing[normalizedLang]}
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden lg:flex md:gap-x-5">
                  {/* Language selector */}
                  <details
                    ref={dropdownRef}
                    className="dropdown dropdown-center"
                  >
                    <summary
                      onClick={handleDropdownClick}
                      className="btn btn-ghost uppercase"
                    >
                      {lang}{" "}
                      <span
                        className={`transition-transform duration-200 ${isDropdownOpen && "rotate-180"}`}
                      >
                        <ChevronDown />
                      </span>
                    </summary>
                    <ul className="menu dropdown-content rounded-none bg-base-100 rounded-box z-1 w-40 p-0 shadow-sm">
                      <li>
                        <NavLink
                          to={redirectToLanguage("et")}
                          onClick={() => {
                            handleDropdownClick();
                            closeDropdown();
                          }}
                          className={({ isActive }) =>
                            `w-full shadow-none rounded-none p-3 flex justify-between items-center ${isActive && "bg-blue-100 text-blue-500"}`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span className="font-bold">Eesti</span>
                              {isActive ? (
                                <Check size={16} />
                              ) : (
                                <span className="uppercase text-gray-600">
                                  et
                                </span>
                              )}
                            </>
                          )}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={redirectToLanguage("en")}
                          onClick={() => {
                            handleDropdownClick();
                            closeDropdown();
                          }}
                          className={({ isActive }) =>
                            `w-full shadow-none rounded-none p-3 flex justify-between items-center ${isActive && "bg-blue-100 text-blue-500"}`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span className="font-bold">English</span>
                              {isActive ? (
                                <Check size={16} />
                              ) : (
                                <span className="uppercase text-gray-600">
                                  en
                                </span>
                              )}
                            </>
                          )}
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to={redirectToLanguage("ru")}
                          onClick={() => {
                            handleDropdownClick();
                            closeDropdown();
                          }}
                          className={({ isActive }) =>
                            `w-full shadow-none rounded-none p-3 flex justify-between items-center ${isActive && "bg-blue-100 text-blue-500"}`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span className="font-bold">Русский</span>
                              {isActive ? (
                                <Check size={16} />
                              ) : (
                                <span className="uppercase text-gray-600">
                                  ru
                                </span>
                              )}
                            </>
                          )}
                        </NavLink>
                      </li>
                    </ul>
                  </details>

                  <button
                    onClick={() => {
                      document.querySelector("#quiz")?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                    className="border border-blue-500 bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:outline-none cursor-pointer"
                  >
                    {locale.letsTalk[normalizedLang]}
                  </button>
                </div>

                <div className="block lg:hidden">
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
        <ul className="menu menu-xl bg-base-200 min-h-full w-11/12 sm:w-80 p-4 gap-y-3 [--menu-active-bg:transparent] [--menu-active-fg:inherit]">
          {/* Sidebar content here */}
          <li>
            <div className="w-full flex justify-between items-center p-4 hover:bg-transparent">
              <a className="flex items-center justify-start gap-x-3" href="#">
                <span className="sr-only">Home</span>
                <Play
                  fill="oklch(62.3% 0.214 259.815)"
                  color="oklch(62.3% 0.214 259.815)"
                />
                <span className="font-bold text-lg uppercase">
                  {locale.videographer[normalizedLang]}
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
          <div className="divider p-0 m-0"></div>
          <li>
            <button
              onClick={() => {
                if (drawerRef.current) {
                  drawerRef.current.checked = false;
                }

                if (!isOnRoot()) {
                  nav(`/${lang}`, {
                    state: { scrollTo: "#portfolio" },
                  });
                } else {
                  document.querySelector("#portfolio")?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
            >
              {" "}
              {locale.work[normalizedLang]}
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                if (drawerRef.current) {
                  drawerRef.current.checked = false;
                }

                if (!isOnRoot()) {
                  nav(`/${lang}`, {
                    state: { scrollTo: "#whyMe" },
                  });
                } else {
                  document.querySelector("#whyMe")?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
            >
              {" "}
              {locale.whyMe[normalizedLang]}
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                if (drawerRef.current) {
                  drawerRef.current.checked = false;
                }

                document.querySelector("#quiz")?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              {" "}
              {locale.pricing[normalizedLang]}
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                if (drawerRef.current) {
                  drawerRef.current.checked = false;
                }

                document.querySelector("#quiz")?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
              className="border border-blue-500 bg-blue-500 text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:outline-none cursor-pointer"
            >
              {locale.letsTalk[normalizedLang]}
            </button>
          </li>

          {/* Language selector */}
          <div className="divider"></div>
          <li>
            <button
              onClick={handlePopoverClick}
              className="btn flex justify-between items-center p-8"
              popoverTarget="popover-1"
              style={{ anchorName: "--anchor-1" }}
            >
              <span className="flex items-center justify-start gap-3 uppercase">
                <Globe /> {lang}
              </span>
              <span
                className={`transition-transform duration-200 ${isMobileDropdownOpen && "rotate-180"}`}
              >
                <ChevronDown />
              </span>
            </button>

            <ul
              className="dropdown dropdown-start menu w-full rounded-box bg-base-100 shadow-sm m-0 mt-2 rounded-none [position-try-fallbacks:flip-block]"
              popover="auto"
              ref={mobilePopoverRef}
              id="popover-1"
              style={{
                positionAnchor: "--anchor-1",
                width: "anchor-size(width)",
              }}
            >
              <li>
                <NavLink
                  to={redirectToLanguage("et")}
                  onClick={() => {
                    handlePopoverClick();
                    mobilePopoverRef.current?.hidePopover();
                  }}
                  className={({ isActive }) =>
                    `w-full shadow-none rounded-none p-3 flex justify-between items-center ${isActive && "bg-blue-100 text-blue-500"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="font-bold">Eesti</span>
                      {isActive ? (
                        <Check size={16} />
                      ) : (
                        <span className="uppercase text-gray-600">et</span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={redirectToLanguage("en")}
                  onClick={() => {
                    handlePopoverClick();
                    mobilePopoverRef.current?.hidePopover();
                  }}
                  className={({ isActive }) =>
                    `w-full shadow-none rounded-none p-3 flex justify-between items-center ${isActive && "bg-blue-100 text-blue-500"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="font-bold">English</span>
                      {isActive ? (
                        <Check size={16} />
                      ) : (
                        <span className="uppercase text-gray-600">en</span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={redirectToLanguage("ru")}
                  onClick={() => {
                    handlePopoverClick();
                    mobilePopoverRef.current?.hidePopover();
                  }}
                  className={({ isActive }) =>
                    `w-full shadow-none rounded-none p-3 flex justify-between items-center ${isActive && "bg-blue-100 text-blue-500"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="font-bold">Русский</span>
                      {isActive ? (
                        <Check size={16} />
                      ) : (
                        <span className="uppercase text-gray-600">ru</span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
