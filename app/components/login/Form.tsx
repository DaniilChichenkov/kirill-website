import { ArrowRight, Lock } from "lucide-react";
import { Form } from "react-router";

const LoginForm = ({
  error,
  success,
}: {
  error: string | undefined;
  success: boolean | undefined;
}) => {
  const isError = !success && typeof success !== "undefined";

  return (
    <section className="flex-1 flex">
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="card w-full md:w-96 max-w-full bg-white card-lg shadow-sm rounded-sm">
          <div className="card-body">
            <div className="w-full flex justify-start">
              <div className="bg-blue-50 p-3 text-blue-500">
                <Lock />
              </div>
            </div>
            <h2 className="card-title">Welcome back</h2>
            <p className="text-gray-600">Log in to your admin account.</p>

            <Form
              action="."
              method="POST"
              className="mt-3 flex w-full flex-col items-center"
            >
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Enter your username</legend>
                <input
                  required
                  type="text"
                  className="input"
                  placeholder="Type here"
                  name="username"
                />
              </fieldset>

              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Password</legend>
                <input
                  required
                  type="password"
                  className="input"
                  placeholder="*****"
                  name="password"
                />
              </fieldset>

              {isError && (
                <p className="font-normal text-sm text-red-500 mt-3 mr-auto">
                  {error && error === "badCredentials"
                    ? "Wrong credentials, try again"
                    : error === "rateLimited"
                      ? "Too many requests, try again later"
                      : null}
                </p>
              )}

              <button className="cursor-pointer flex w-full items-center justify-center gap-2 mt-5 border border-blue-500 bg-blue-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-600">
                Log in <ArrowRight />
              </button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
