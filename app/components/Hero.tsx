import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-white lg:grid lg:place-content-center">
      <div className="mx-auto w-screen max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <div className="mx-auto max-w-prose text-center">
          <p className="text-xs text-pretty text-gray-700 sm:text-lg/relaxed uppercase tracking-wider">
            Independent Videographer
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 sm:text-5xl mt-4 md:mt-5">
            Good stories deserve
            <strong className="text-blue-500"> great films. </strong>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            For your brand, your big day, and everything worth remembering.
          </p>

          <div className="mt-4 flex flex-col md:flex-row justify-center gap-4 sm:mt-6">
            <a
              className="inline-block border border-blue-500 bg-blue-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-600"
              href="#"
            >
              Explore my work
            </a>

            <a
              className="flex justify-center items-center gap-x-3 px-5 py-3 font-medium text-blue-500 transition-colors hover:text-blue-900"
              href="#"
            >
              Start a project
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
