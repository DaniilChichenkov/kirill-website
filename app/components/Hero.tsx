import { ArrowRight } from "lucide-react";
import Car from "~/src/car.jpg";

const Hero = () => {
  return (
    <section className="bg-white lg:grid lg:place-content-center">
      <div className="mx-auto w-screen max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 pb-16 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-prose text-center">
          <p className="text-xs text-pretty text-gray-700 sm:text-lg/relaxed uppercase tracking-wider">
            Independent Videographer
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 sm:text-5xl mt-4 md:mt-5">
            Your story. A film
            <strong className="text-blue-500"> they will remember. </strong>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Wedding, brands and event films - from the first idea to the final
            edit.
          </p>
        </div>

        {/* Showreel */}
        <div className="block mt-10">
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
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 lg:items-start lg:mt-5">
          <div className="lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-5 lg:w-11/12">
              You bring the story. I take care of the film.
            </h2>
            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed lg:w-11/12">
              From the planning and filming to the final edit, I create a film
              that feels like you - and connects with the people who matter.
            </p>
          </div>
          <div className="">
            <a
              className="flex items-center justify-center gap-2 mt-5 border border-blue-500 bg-blue-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-600"
              href="#"
            >
              Lets plan your film <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// <div className="mt-4 flex flex-col md:flex-row justify-center gap-4 sm:mt-6">
// <a
//   className="inline-block border border-blue-500 bg-blue-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-600"
//   href="#"
// >
//   Explore my work
// </a>

//   <a
//     className="flex justify-center items-center gap-x-3 px-5 py-3 font-medium text-blue-500 transition-colors hover:text-blue-900"
//     href="#"
//   >
//     Start a project
//     <ArrowRight />
//   </a>
// </div>

export default Hero;
