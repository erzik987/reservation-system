import dotenv from 'dotenv';

dotenv.config();

// const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
// const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@reservations.kjziwhf.mongodb.net/reservation-system`;
const MONGO_URL = process.env.MONGO_URL || ''; //`mongodb+srv://<username>:<password>@reservations.jpwmoa5.mongodb.net/?retryWrites=true&w=majority`;

const SERVER_PORT = 8080; //process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  }
};
