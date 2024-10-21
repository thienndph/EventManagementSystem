# EventManagementSystem
## Installation
```bash
# DATABASE
- PostgreSQL vesion 16.4-1
- Create database EventManagementSystem
```

```bash
# Edit your .env file
- Use env.develop to create .evn run project
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
