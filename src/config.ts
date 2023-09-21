import * as dotenv from "dotenv";
dotenv.config();

export default {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  MONGO_URI: process.env.MONGO_URI,
};
