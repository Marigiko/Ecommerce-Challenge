# Ecommerce Backend Challenge

This project is an improved version of an existing backend system built with NestJS.

The goal was to refactor the architecture and introduce an event-driven approach.

---

## Technical documentation is located in /documentation/ecommerce_challenge_architecture.pdf file

## Tech Stack

- NestJS
- PostgreSQL
- Docker
- EventEmitter

---

## Running the project

### 1 Install dependencies

pnpm install

### 2 Setup de .env

.env examples are located in /envs

just rename the development.example.env and test.example.env to:

development.env
test.env

### 3 Start database

docker compose up -d

This command starts the PostgreSQL container required by the API.

Backend will run at

http://localhost:3000

---

## API Documentation

Swagger UI is available at

http://localhost:3000/docs

---

## Postman Collection

Import:

documentation/Ecommerce-Challenge.postman_collection.json

---

## Architecture

The system was refactored to use an **Event-Driven Architecture**.

Events implemented:

- **product.created**
  - creates inventory (Implementation Needed)
  - registers audit log

- **product.activated**
  - triggers analytics (Implementation Needed)
  - emits notification events
  - registers audit log

These events trigger side effects such as inventory creation and audit logging.

More details are available in the technical document.