# Pizza shop project
This project is an app that I set up to serve as an online shop for a local pizza business.

The app lets customers browse a pizza menu, customize orders with extra toppings, pick an available pickup timeslot, 
and place an order. The backend is an Express API that serves the menu, manages timeslot availability, 
and stores orders in a Postgres database using Drizzle ORM. The frontend is a React app built with Vite.

<img src="screenshots/Screenshot_20260403_180001.png" alt="Menu page" width="400">
<img src="screenshots/Screenshot_20260403_180025.png" alt="Toppings selection page" width="400">
<img src="screenshots/Screenshot_20260403_180034.png" alt="Cart page" width="400">

## Dependencies

Backend:

* Drizzle
* Postgres
* Express
* Node
* Jest
* Testcontainers

Frontend:
* Tailwind
* React
* React router
* Vite

## Environment variables

The backend requires a .env file with the `DB_URL` variable, pointing to a Postgres database.

## Getting started

### 1. Install prerequisites
   - [Node.js](https://nodejs.org/)
   - [PostgreSQL](https://www.postgresql.org/)
   - [Docker](https://www.docker.com/) (needed for tests)


### 2. Install dependencies
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

### 3. Set up environment variables

   Create a .env file in the backend directory:
   ```
   DB_URL=postgresql://user:password@localhost:5432/pogpizza
   ```

### 4. Create the database

   Connect to PostgreSQL and create a new database:
   ```bash
   sudo -u postgres psql
   ```
   ```sql
   CREATE DATABASE pogpizza;
   ```
   If your PostgreSQL user needs a password, set one with:
   ```sql
   ALTER USER your_username WITH PASSWORD 'your_password';
   ```
   Then update the `DB_URL` in your `.env` file to match the credentials you chose.


### 5. Set up the schema and seed data

   From the `backend` directory, push the schema and seed sample data:
   ```bash
   npx drizzle-kit push
   npx tsx scripts/reset_db.ts
   ```

### 6. Start the app

   Run the backend:

   ```bash
   cd backend
   npm run dev
   ```

   Then in a separate terminal, run the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

## Testing

Tests use Jest with Testcontainers, which spins up a real Postgres container for each test run.
You'll need Docker installed and running.

To run the tests from the `backend` directory:
```bash
npm run test
```