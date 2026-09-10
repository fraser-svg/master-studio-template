import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route for /areas/* - renders child routes (hub index + individual
// area pages). Page body lives in areas.index.tsx.
export const Route = createFileRoute("/areas")({
  component: AreasLayout,
});

function AreasLayout() {
  return <Outlet />;
}
