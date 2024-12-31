FROM node:22
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN npx prisma generate
RUN npx prisma migrate deploy
CMD ["node", "app.js"]
