import { HeaderSlider } from ".";

const Feedback = () => {
  return (
    <>
      <section className="bg-white lg:grid lg:place-content-center">
        <div className="mx-auto w-screen max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-prose text-center">
            <p className="text-xs text-pretty text-gray-700 sm:text-lg/relaxed uppercase tracking-wider">
              Client stories
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Kind words.
              <strong className="text-blue-500"> Real stories. </strong>
            </h2>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Hear what its like to create a film together.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="w-full">
            <HeaderSlider />
          </div>
        </div>
      </section>
    </>
  );
};

export default Feedback;
