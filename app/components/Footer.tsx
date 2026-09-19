import { Play } from "lucide-react";

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row sm:flex sm:items-center sm:justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="flex items-center justify-start gap-x-3" href="#">
              <span className="sr-only">Home</span>
              <Play
                fill="oklch(62.3% 0.214 259.815)"
                color="oklch(62.3% 0.214 259.815)"
              />
              <span className="font-bold text-lg uppercase">Videographer</span>
            </a>
          </div>

          {/* Links */}
          <div className="w-full md:w-auto flex justify-start items-center mt-10 gap-x-5 md:mt-0">
            <a href="">Instagram</a>
            <a href="">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
