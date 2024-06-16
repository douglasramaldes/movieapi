# Movie API

This is an API to list movies and manage "to-watch" and "watched" lists for each user. The application is developed in Node.js, uses Sequelize as ORM, and is configured to run in a Docker environment with PostgreSQL.

## Features

- List all movies.
- Add a movie to the to-watch list.
- Mark a movie as watched.
- List to-watch and watched movies for each user.
- User authentication using Firebase Auth.

## Endpoints

- `POST /auth/register`: Create user
- `POST /auth/login`: Signin user
- `POST /auth/reset-password`: Reset password

- `GET /movies`: Returns a list of all movies.

- `GET /user/:userId/watchlist`: Returns the to-watch list of a user.
- `GET /user/:userId/watched`: Returns the watched list of a user.
- `POST /user/:userId/watchlist`: Adds a movie to a user's to-watch list.
- `PUT /user/:userId/watchlist/:movieId`: Marks a movie as watched.

## Prerequisites

- Docker
- Docker Compose
- Node.js (to run locally without Docker)
- PostgreSQL (to run locally without Docker)

## Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/movie-api.git
cd movie-api
```

### 2. Environment Variables
Create a .env file in the project root with the following content:

```
PORT=
NODE_ENV=
PG_HOST=
PG_DB=
PG_USER=
PG_PASSWORD=

##Firebase App
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

##Firebase Admin
FIREBASE_ADM_PROJECT_ID=
FIREBASE_ADM_PRIVATE_KEY_ID=
FIREBASE_ADM_CLIENT_EMAIL=
FIREBASE_ADM_CLIENT_ID=
```
### Run with Docker

docker-compose up --build

### Run Locally (Without Docker)
- npm install
- npm start

### Run seeders
- npx sequelize-cli init
- npm run seed
