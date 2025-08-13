# Step 1 — Use Node.js base image
FROM node:20-alpine

# Step 2 — Set working directory
WORKDIR /app

# Step 3 — Copy package files first (better caching)
COPY package*.json ./

# Step 4 — Install dependencies
RUN npm install

# Step 5 — Copy source code
COPY . .

# Step 6 — Build the app
RUN npm run build

# Step 7 — Start app
CMD ["npm", "run", "start:prod"]

# Expose port
EXPOSE 3000
