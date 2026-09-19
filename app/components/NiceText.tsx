const NiceText = () => {
  return (
    <section className="bg-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-blue-50">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start md:gap-8">
          <div>
            <div className="max-w-prose md:max-w-none">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 sm:text-3xl text-left">
                A good film starts with a good connection.
              </h2>
            </div>
          </div>

          <div className="mt-5 md:mt-0">
            <div className="flex items-start gap-8">
              <p className="text-blue-700 text-xl">01</p>

              <div>
                <h3 className="font-medium text-gray-900 sm:text-lg">
                  Your story understood
                </h3>

                <p className="mt-0.5 text-gray-700">
                  We start with what matters to you.
                </p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="flex items-start gap-8">
              <p className="text-blue-700 text-xl">02</p>

              <div>
                <h3 className="font-medium text-gray-900 sm:text-lg">
                  Care in every frame
                </h3>

                <p className="mt-0.5 text-gray-700">
                  From the first to the final edit.
                </p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="flex items-start gap-8">
              <p className="text-blue-700 text-xl">03</p>

              <div>
                <h3 className="font-medium text-gray-900 sm:text-lg">
                  A simple, clear process
                </h3>

                <p className="mt-0.5 text-gray-700">
                  You will know what happens next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NiceText;
