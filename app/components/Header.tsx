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

export default Header;
