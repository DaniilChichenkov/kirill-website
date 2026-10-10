import { ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
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

        <div className="md:flex flex-1 items-center justify-end hidden">
          <Link
            to={"/"}
            className="flex justify-end items-center gap-2 text-blue-500"
          >
            Back to website <ArrowUpRight />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
