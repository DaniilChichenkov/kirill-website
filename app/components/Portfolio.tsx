import { MoveUpRight } from "lucide-react";
import Wedding from "~/src/wedding-example.jpg";
import Car from "~/src/car.jpg";
import type { Route } from "../+types/root";
import { Link, useNavigate, useParams } from "react-router";

const supportedLanguages = ["ru", "et", "en"];

const Portfolio = () => {
  const { lang } = useParams();
  const nav = useNavigate();

  const handleNav = () => {
    if (!lang || !supportedLanguages.includes(lang)) {
      nav("/et/works");
    } else {
      nav(`/${lang}/works`);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-4 md:space-y-8">
          <div className="w-full">
            <p className="text-xs text-pretty text-gray-700 sm:text-lg/relaxed uppercase tracking-wider">
              The Portfolio
            </p>
            <div className="w-full flex justify-between items-center">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                Stores in motion.
              </h2>
              <button
                onClick={handleNav}
                className="lg:flex hidden cursor-pointer justify-center items-center gap-x-3 px-5 py-3 font-medium text-blue-500 transition-colors hover:text-blue-900"
              >
                View more films <MoveUpRight />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-y-10 lg:flex-row lg:gap-x-10">
            <div className="block">
              <button
                type="button"
                // onClick={openShowreel}
                aria-label="Watch showreel"
                aria-haspopup="dialog"
                className="group relative block w-full overflow-hidden rounded-lg
                   focus-visible:outline-4 focus-visible:outline-blue-600"
              >
                <img
                  src={Wedding}
                  alt=""
                  width={1280}
                  height={720}
                  className="aspect-video w-full object-cover"
                />

                <span
                  className="absolute inset-0 flex flex-col items-center
                     justify-center gap-3 bg-black/20"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-16 items-center justify-center rounded-full
                       bg-white text-2xl text-slate-950
                       group-hover:bg-blue-100"
                  >
                    ▶
                  </span>
                </span>
              </button>

              <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                Together, naturally.
              </h3>

              <p className="text-xs text-pretty text-gray-700 sm:text-lg/relaxed uppercase tracking-wider">
                Wedding film
              </p>
            </div>

            <div className="block lg:mt-10">
              <button
                type="button"
                // onClick={openShowreel}
                aria-label="Watch showreel"
                aria-haspopup="dialog"
                className="group relative block w-full overflow-hidden rounded-lg
                   focus-visible:outline-4 focus-visible:outline-blue-600"
              >
                <img
                  src={Car}
                  alt=""
                  width={1280}
                  height={720}
                  className="aspect-video w-full object-cover"
                />

                <span
                  className="absolute inset-0 flex flex-col items-center
                     justify-center gap-3 bg-black/20"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-16 items-center justify-center rounded-full
                       bg-white text-2xl text-slate-950
                       group-hover:bg-blue-100"
                  >
                    ▶
                  </span>
                </span>
              </button>

              <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                Coolest car in the world.
              </h3>

              <p className="text-xs text-pretty text-gray-700 sm:text-lg/relaxed uppercase tracking-wider">
                Vehicle review
              </p>
            </div>

            {/* More films link */}
            <button
              onClick={handleNav}
              className="flex lg:hidden cursor-pointer justify-center items-center gap-x-3 px-5 py-3 font-medium text-blue-500 transition-colors hover:text-blue-900"
            >
              View more films <MoveUpRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
