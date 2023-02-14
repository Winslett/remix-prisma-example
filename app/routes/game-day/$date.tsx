import { 
  json,
  LoaderArgs,
} from "@remix-run/node";

import {
  Link,
  Outlet,
  useLoaderData,
} from "@remix-run/react";

import { dateHelpers } from "~/utils/date.helper";

import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  flexiDate = new Date(params.date)
  
  const queryDate = new Date(flexiDate);
  const nextDate = new Date(flexiDate.setDate(flexiDate.getDate() + 1))

  return json({
    console.log(queryDate)
    games: await db.Game.findMany({
        where: {
          gameTimeAt: {
              gte: "'" + dateHelpers.renderDateforURL(queryDate) + "' AT TIME ZONE 'Europe/Rome'",
              lt: "'" + dateHelpers.renderDateforURL(nextDate) + "' AT TIME ZONE 'Europe/Rome'",
          }
        },
        orderBy: [
          {
            gameTimeAt: 'asc',
          }
        ],
        include: {
          awayTeam: true,
          homeTeam: true
        }
      }),
    teams: await db.Team.findMany(),
  });
};

export default function RosterIndexRoute() {
  const data = useLoaderData<typeof loader>();
  
  return (
    <div>
      <p>Games on Date</p>
      <ul>
       {data.games.map((game) => (
          <li key={game.id}>
            <Link to={'/team/' + game.awayTeam.id}>{game.awayTeam.name}</Link>
            &nbsp;@&nbsp;
            <Link to={'/team/' + game.homeTeam.id}>{game.homeTeam.name}</Link>
            &nbsp;-&nbsp;
            <Link to={'/game/' + game.id}>{dateHelpers.renderGameTime(game.gameTimeAt)}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
