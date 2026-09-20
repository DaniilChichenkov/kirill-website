import Wedding from "~/src/wedding-example.jpg";
import Car from "~/src/car.jpg";

const WorksVideosList = () => {
  return (
    <section className="mt-5">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-4 md:space-y-8">
          <div className="flex flex-col gap-y-10 lg:grid lg:grid-cols-2 lg:gap-x-10">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksVideosList;
