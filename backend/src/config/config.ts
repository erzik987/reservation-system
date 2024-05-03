import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || '';
const SERVER_PORT = 8080;

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  }
};
