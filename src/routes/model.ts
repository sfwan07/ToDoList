export interface RouteProps {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element> | any;
  exact?: boolean;
  role?: string[];
}
