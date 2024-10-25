
# EventManagementSystem

## Installation

### Database Setup
1. **Database**: PostgreSQL version 16.4-1
2. **Create Database**: 
   - Create a database called `EventManagementSystem` in your PostgreSQL server.
  
### Environment Setup
1. **.env File**:
   - Use the `env.develop` file as a template to create a `.env` file.
   - Make sure to configure the necessary environment variables like database credentials in the `.env` file to run the project.

### Prisma Setup
1. **Run Prisma Migrations and Generate Client**:
   ```bash
   $ npx prisma migrate deploy --schema=./src/modules/prisma/schema.prisma
   $ npx prisma generate --schema=./src/modules/prisma/schema.prisma
   ```

### API Server Setup
1. **Install Dependencies**:
   ```bash
   $ npm install
   ```
2. **Run Development Server**:
   ```bash
   $ npm run start:dev
   ```

3. **API URL**:
   - The API will be available at: `http://localhost:3000/api`

---

## Running the App

### Development Mode
1. **Start Development Server**:
   ```bash
   $ npm run start:dev
   ```

### Database Schema Changes
If you need to add a new field to the database, modify tables, or update the schema, follow these steps:

1. **Edit Schema**:
   - Alter the `schema.prisma` file to reflect the new changes.

2. **Generate Migration Script**:
   - Generate the migration script based on the updated schema and the actual database.
   ```bash
   $ npm run migrate-dev --schema=./src/modules/prisma/schema.prisma
   ```

3. **Sync Prisma Models**:
   - Synchronize the schema with the Prisma ORM models.
   ```bash
   $ npx prisma generate --schema=./src/modules/prisma/schema.prisma
   ```

4. **Apply Migrations to Database**:
   - Apply the migration files to update the actual database.
   ```bash
   $ npx prisma migrate deploy --schema=./src/modules/prisma/schema.prisma
