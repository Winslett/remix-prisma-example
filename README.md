# Remix - Prisma - Postgres example app

This is a fairly small example app, but we feel like we've done a good
job of stressing the capabilities of Prisma interactions in such a way
that we need to break the rules.

The app is a league - game tracker.  So, games have a game time + home
team + away team. Simple, uh?

We complicated the app-to-database connection in a few ways:

1. Time zone complication.  When querying, for a specific date a person
   in Europe has a different "day" than a person in Asia.  Thus, the
   views, app, and database all have to agree how dates will be managed.
2. As of the creation of this application, you cannot pass SQL functions
   to a Prisma select. Thus, to extract the unique days from the
   datetime game values, it is fastest to use raw SQL.

Additionally, we added some good best-practices to this application:

1. Enhanced Postgres logging.  We want to see the queries that Prisma
   generates and executes.

## Installation

1. Pull down repo
2. Install libraries: `npm install`
3. Run Postgres: `initdb -D data; postgres -D data`
5. Run Prisma migrations: `npx prisma db push`
6. Seed data: `node --require esbuild-register prisma/seed.ts`
7. Run development: `npm run dev`
8. Open app in your browser: http://localhost:3000/games
