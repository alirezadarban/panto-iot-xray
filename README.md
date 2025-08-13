# X-ray IoT Service

## Setup
```bash
docker compose up -d rabbit mongo
npm install
cp .env.example .env
npm run start:dev
API
Swagger: http://localhost:3000/api

GET /signals

GET /signals/:id

POST /signals

POST /producer/send-xray