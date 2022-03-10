import { lazy } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import CustomLayout from "../components/Layout/Layout";
import NonAuthLayout from "../components/NonAuthLayout/NonAuthLayout";
import { RouteProps } from "./model";

import { isAuth, hasRole } from "../helper/helper";

const AsyncComponent = (module: any) => lazy(() => module);

const userRoutes: Array<RouteProps> = [
  { path: "/", component: AsyncComponent(import("../pages/Home/Home")) },
  { path: "/tasks", component: AsyncComponent(import("../pages/Tasks/Tasks")) },
  {
    path: "/groups",
    component: AsyncComponent(import("../pages/Groups/Groups")),
    role: ["admin"],
  },
  {
    path: "/users",
    component: AsyncComponent(import("../pages/Users/Users")),
    role: ["admin"],
  },
];

const authRoutes: Array<RouteProps> = [
  //Authentication pages
  {
    path: "/login",
    component: AsyncComponent(import("../pages/Authentication/Login/Login")),
  },
];

const allRoutes: Array<RouteProps> = [
  {
    path: "/404",
    component: AsyncComponent(import("../pages/Error404/Error404")),
  },
  {
    path: "/403",
    component: AsyncComponent(import("../pages/Error403/Error403")),
  },

  { path: "*", exact: true, component: () => <Navigate to="/404" /> },
];

// const DefaultRoute =

const CustomRoute = (
  item: RouteProps,
  index: number,
  LayoutType?: any,
  isPrivate?: boolean,
) => {
  const ComponentLayout = LayoutType ? (
    <LayoutType>{<item.component />}</LayoutType>
  ) : (
    <item.component />
  );

  const ComponentPrivate = () =>
    isPrivate && !isAuth ? (
      <Navigate to={"/login"} />
    ) : isPrivate && isAuth && item.role && !hasRole(item.role) ? (
      <Navigate to={"/403"} />
    ) : !isPrivate && isAuth ? (
      <Navigate to={"/"} />
    ) : (
      ComponentLayout
    );

  return (
    <Route
      key={index}
      path={item.path}
      element={<ComponentPrivate />}
      caseSensitive={false}
    />
  );
};

const IndexRoutes = () => [
  ...allRoutes.map((item, i) => CustomRoute(item, i)),
  ...userRoutes.map((item, i) => CustomRoute(item, i, CustomLayout, true)),
  ...authRoutes.map((item, i) => CustomRoute(item, i, NonAuthLayout, false)),
];

export default IndexRoutes;
