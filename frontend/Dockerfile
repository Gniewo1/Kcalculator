FROM node:20-slim

WORKDIR /app

# Skopiuj package.json i zainstaluj zależności
COPY package*.json ./
RUN npm install

# Skopiuj cały projekt
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]