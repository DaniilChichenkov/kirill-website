import { Link, useParams } from "react-router";
import type { Route } from "./+types/works";

import { WorksHeader, WorksVideosList } from "~/components/works";
import { ArrowLeft } from "lucide-react";
import Question from "~/components/Question";

const supportedLanguages = ["ru", "et", "en"];

export const loader = async ({}: Route.LoaderArgs) => {
  console.log("Works route intercepted");
  return null;
};

const WorksRoute = () => {
  const { lang } = useParams();

  const getValidPath = () => {
    if (!lang || !supportedLanguages.includes(lang)) {
      return "/et";
    }
    return `/${lang}`;
  };

  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5">
          <Link
            to={getValidPath()}
            className="flex items-center justify-start gap-x-2 text-blue-500"
          >
            <ArrowLeft />
            Back to home
          </Link>
        </div>
      </section>
      <WorksHeader />
      <WorksVideosList />
      <Question
        headerText="Your story could be next"
        subHeaderText="Tell me what you have in mind. Let`s make it a film."
      />
    </>
  );
};

export default WorksRoute;
