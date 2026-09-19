import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.ts"),
  route(":lang", "routes/home.tsx"),
] satisfies RouteConfig;
