import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

function teamArray() {
  return [
    {"name":"Los Angeles Lakers"},
    {"name":"Sacramento Kings"},
    {"name":"Oklahoma City Thunder"},
    {"name":"San Antonio Spurs"},
    {"name":"Detroit Pistons"},
    {"name":"Miami Heat"},
    {"name":"Orlando Magic"},
    {"name":"Boston Celtics"},
    {"name":"Dallas Mavericks"},
    {"name":"Toronto Raptors"}, 
  ];
}

async function getTeams() {
    return await db.team.findMany()
}

async function seed() {
  const teamCount = await db.team.count();
    
  if (teamCount < 10) {
    teamArray().map(async (team) => await db.team.create({ data: team}))
  }
    
  for (i = 0; i < 20; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const shuffledteams = await getTeams();
    
    const daysGames = [];
    shuffledteams.forEach((team, index) => {
      gameKey = Math.floor(index / 2);
      if (!daysGames[gameKey]) {
        daysGames[gameKey] = {gameTimeAt: date};
      }

      if (index % 2 == 0) {
        daysGames[gameKey]["awayTeamId"] = team.id
      } else {
        daysGames[gameKey]["homeTeamId"] = team.id
      }
    })

    daysGames.map(async (game) => await db.game.create({ data: game }))
  }
}

seed();