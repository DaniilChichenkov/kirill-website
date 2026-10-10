import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.ts"),
  layout("./layouts/HomeLayout.tsx", [
    route(":lang", "routes/home.tsx"),
    route(":lang/works", "routes/works.tsx"),
    // Privacy policy
    route("/:lang/privacy-policy", "routes/privacy.tsx"),
  ]),

  // Admin routes
  ...prefix("/:lang/dashboard", [
    layout("./layouts/AdminLayout.tsx", [
      route("change-password", "routes/adminChangePassword.tsx"),
      index("routes/botSetup.tsx"),
    ]),
  ]),

  // Admin login route
  route("/:lang/login", "routes/login.tsx"),

  // Admin logout route
  route("/:lang/logout", "routes/logout.tsx"),

  // Process enquiry
  route("/:lang/enquiry", "routes/processEnquiry.tsx"),
] satisfies RouteConfig;
