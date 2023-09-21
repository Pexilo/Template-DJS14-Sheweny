import { IntentsBitField, Partials, PermissionFlagsBits } from "discord.js";
import { ShewenyClient } from "sheweny";
import config from "./config";
const { mongoose } = require("mongoose");

interface Error {
  reason?: string;
}
const client = new ShewenyClient({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
  ],
  partials: [Partials.GuildMember, Partials.Message, Partials.User],
  managers: {
    commands: {
      directory: "./commands",
      autoRegisterApplicationCommands: true,
      applicationPermissions: true,
      default: {
        type: "SLASH_COMMAND",
        channel: "GUILD",
        cooldown: 3,
        userPermissions: [PermissionFlagsBits.UseApplicationCommands],
      },
    },
    events: {
      directory: "./events",
      default: {
        once: false,
      },
    },
    buttons: {
      directory: "./interactions/buttons",
    },
    selectMenus: {
      directory: "./interactions/selectmenus",
    },
  },
  mode: "production",
});

mongoose
  .connect(config.MONGO_URI, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  })
  .then(() => console.log("✅ MongoDB"))
  .catch((err: Error) => {
    throw new Error("❌ MongoDB\n" + err.reason);
  });

client.login(config.DISCORD_TOKEN);
