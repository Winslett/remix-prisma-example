import { json } from "@remix-run/node";
import { 
  LiveReload,
  Outlet, 
  useLoaderData, 
  Form,
  useFetcher
} from "@remix-run/react";
import styles from "./styles/app.css"
import { db } from "~/utils/db.server";

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const loader = async () => {
  return json({
    timezones: await db.$queryRaw`SELECT name FROM pg_timezone_names;`,
  });
};

export default function App() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>My Sports Ball League Tracker</title>
      </head>
      <body>
        <fetcher.Form method="post" action="/set-session-timezone" onChange={() => fetcher.submit()}>
          <select type="text" name="timezone" onChange={() => fetcher.submit()}>
            {data.timezones.map((tz) => (
              <option key={tz.name} value={tz.name}>{tz.name}</option>
            ))}
          </select>
        </fetcher.Form>
        
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}
