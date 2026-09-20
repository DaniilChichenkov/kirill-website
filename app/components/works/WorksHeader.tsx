const WorksHeader = () => {
  return (
    <section className="bg-white lg:grid lg:place-content-center">
      <div className="mx-auto w-screen max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-center">
          <p className="text-xs text-pretty text-gray-700 sm:text-lg/relaxed uppercase tracking-wider mt-10">
            the portfolio
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 sm:text-5xl mt-4 md:mt-5">
            Stores in
            <strong className="text-blue-500"> motion. </strong>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Wedding days, bold brands, and moments worth keeping.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorksHeader;
