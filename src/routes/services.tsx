import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route for /services/* - renders child routes (hub index + individual
// service pages). Page body lives in services.index.tsx.
export const Route = createFileRoute("/services")({
  component: ServicesLayout,
});

function ServicesLayout() {
  return <Outlet />;
}
