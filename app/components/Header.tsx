import Wedding from "~/src/wedding-example.jpg";
import Car from "~/src/car.jpg";
import Nature from "~/src/nature.jpg";

import { HeaderSlider } from ".";

const Header = () => {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full">
          <HeaderSlider />
        </div>
      </div>
    </section>
  );
};

{
  /* From lg screens grid */
}
// <div className="hidden lg:grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8"></div>
{
  /* <div className="hidden lg:grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
  <div>
    <img
      src={Car}
      alt=""
      width={1280}
      height={720}
      className="aspect-video w-full h-full object-cover"
    />
  </div>
  <div className="lg:col-span-2">
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

        <span className="font-medium text-white">Watch showreel</span>
      </span>
    </button>
  </div>
  <div>
    <img
      src={Nature}
      alt=""
      width={1280}
      height={720}
      className="aspect-video w-full h-full object-cover"
    />
  </div>
</div>; */
}

export default Header;
