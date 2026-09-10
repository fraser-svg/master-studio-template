import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route for /projects/* - renders child routes (hub index + individual
// project pages). Page body lives in projects.index.tsx.
export const Route = createFileRoute("/projects")({
  component: ProjectsLayout,
});

function ProjectsLayout() {
  return <Outlet />;
}
