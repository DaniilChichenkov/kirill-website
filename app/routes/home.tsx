import type { Route } from "./+types/home";
import {
  Hero,
  Header,
  NiceText,
  Portfolio,
  Questions,
  Feedback,
} from "~/components";

export const loader = async ({ params }: Route.LoaderArgs) => {
  console.log("Home loader caught");
  return null;
};

const HomeRoute = () => {
  return (
    <>
      <Hero />
      <Questions
        headerText="What are we creating?"
        subHeaderText="A few quick questions to plan your film."
      />
      <Feedback />
      <NiceText />
      <Portfolio />
    </>
  );
};

export default HomeRoute;
