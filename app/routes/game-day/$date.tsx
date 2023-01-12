import { 
  json,
  LoaderArgs,
} from "@remix-run/node";

import {
  Link,
  Outlet,
  useLoaderData,
} from "@remix-run/react";


import { db } from "~/utils/db.server";

let renderMonthDay = function(dateObj) {
  if (typeof dateObj === 'string') {
    dateObj = new Date(dateObj)
  }

  let returnString = ""
  returnString += dateObj.getMonth() + 1
  returnString += "/"
  returnString += dateObj.getDate()

  return returnString;
}

let renderDateforURL = function(dateObj) {
  if (typeof dateObj === 'string') {
    dateObj = new Date(dateObj)
  }

  let returnString = ""
  returnString += dateObj.getFullYear()
  returnString += '-'
  returnString += dateObj.getMonth() + 1
  returnString += "-"
  returnString += dateObj.getDate()

  return returnString;
}

export const loader = async ({ params }: LoaderArgs) => {
  const current_date = new Date(params.date);

  return json({
    games: await db.Game.findMany({
        where: {
          gameTimeAt: {
              gte: current_date,
              lt: new Date(current_date.setDate(current_date.getDate() + 1)),
          }
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
            <Link to={'/game/' + game.id}>{game.awayTeam}</Link>
            <Link to={'/game/' + game.id}>{game.homeTeam}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
