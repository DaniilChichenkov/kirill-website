import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.ts"),
  layout("./layouts/HomeLayout.tsx", [
    route(":lang", "routes/home.tsx"),
    route(":lang/works", "routes/works.tsx"),
  ]),
] satisfies RouteConfig;
