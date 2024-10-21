#EventManagementSystem
## Installation
```bash
# DATABASE
- PostgreSQL vesion 16.4-1
- Create database EventManagementSystem
```

```bash
# Edit your .env file
-DATABASE_URL= postgres://<username>:<password>@<url database>/<database>?schema=<schema>
-GOOGLE_CLIENT_ID=880114734755-o7jlvg854tinugv1f8tb2necju88v5pm.apps.googleusercontent.com
-GOOGLE_CLIENT_SECRET=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
-GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

```bash
# Run Prisma client
$ npx prisma migrate dev --schema=./src/modules/prisma/postgres/schema.prisma
$ npx prisma generate --schema=./src/modules/prisma/postgres/schema.prisma
```

```bash
# Run the api server app
$ npm install
$ npm run start:dev
```

Our API should be ready at http://localhost:3000/api

## Running the app

```bash
# development
$ npm run start:dev
## Development
### Adding new field to DB, alter table, and generate new schema and migration script
- Alter `schema.prisma`
- `npm run migrate-dev` Generate migration script (SQL) based on schema vs actual DB
- `npm run generate-prisma`: sync schema to ORM models (NodeJS)
- `npm run migrate-deploy`: sync migration file into real DB
