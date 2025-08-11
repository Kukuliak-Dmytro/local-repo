import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home.tsx"),
  route("ingredients", "pages/ingredients.tsx"),
  // Catch-all route for DevTools and other unknown paths
] satisfies RouteConfig;
