import { json } from "@remix-run/node";
import { 
  Outlet,
  useLoaderData,
  useSearchParams 
} from "@remix-run/react";

import { dateHelpers } from "~/utils/date.helper";

export const loader = async ({ params }: LoaderArgs) => {
  return json({
    current_date: Date.parse(params.date)
  })
};

export default function RosterRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Games on {dateHelpers.renderMonthDay(data.current_date)}</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}