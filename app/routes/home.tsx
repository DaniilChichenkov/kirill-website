import type { Route } from "./+types/home";
import {
  NavigationComponent,
  Hero,
  Header,
  NiceText,
  Portfolio,
  Questions,
  Footer,
} from "~/components";

export const loader = async ({ params }: Route.LoaderArgs) => {
  console.log("Home loader caught");
};

const HomeRoute = () => {
  return (
    <NavigationComponent>
      <Hero />
      <Header />
      <NiceText />
      <Portfolio />
      <Questions />
      <Footer />
    </NavigationComponent>
  );
};

export default HomeRoute;
