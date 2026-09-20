import { Footer, NavigationComponent } from "~/components";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <NavigationComponent>
      <Outlet />
      <Footer />
    </NavigationComponent>
  );
};

export default HomeLayout;
