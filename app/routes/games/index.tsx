import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
} from "@remix-run/react";

import { dateHelpers } from '~/utils/date.helper'

import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    gameDays: await db.$queryRaw`SELECT DISTINCT date_trunc('day', game_time_at AT TIME ZONE 'Europe/Rome') AS game_date FROM games ORDER BY game_date;`,
    teams: await db.Team.findMany(),
    gamesList: await db.Game.findMany({
      include: {
        awayTeam: true,
        homeTeam: true
      }
    }),
  });
};

export default function RosterIndexRoute() {
  const data = useLoaderData<typeof loader>();
  
  return (
    <div>
      <p>Game Days</p>
      <ul>
        {data.gameDays.map((gameDay) => (
          <li key={gameDay}>
            <Link to={'/game-day/' + dateHelpers.renderDateforURL(gameDay.game_date)}>{dateHelpers.renderMonthDay(gameDay.game_date)}</Link>
          </li>
        ))}
      </ul>
      <p>Teams</p>
      <ul>
       {data.teams.map((team) => (
          <li key={team.id}>
            <Link to={'/teams/' + team.id}>{team.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
