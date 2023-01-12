import { Outlet } from "@remix-run/react";

export default function RosterRoute() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">My Awesome Sportsball League</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}