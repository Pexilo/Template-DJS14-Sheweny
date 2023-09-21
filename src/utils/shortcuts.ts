import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  CommandInteraction,
  EmbedBuilder,
  Guild,
  StringSelectMenuInteraction,
} from "discord.js";
const { UserData } = require("../db/index");
const { GuildData } = require("../db/index");

export function Embed(color = true) {
  const embed = new EmbedBuilder();
  if (color) embed.setColor("#2b2d31");
  return embed;
}

export function Wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function Defer(
  interaction:
    | CommandInteraction
    | ButtonInteraction
    | StringSelectMenuInteraction
) {
  let bool = true;
  await interaction.deferReply({ ephemeral: true }).catch(() => {
    bool = false;
  });
  await Wait(1000);
  return bool;
}

export function Truncate(str: string, max: number) {
  return str.length > max ? str.substring(0, max - 1) + "..." : str;
}

export function CreateButtons(buttons: any[]) {
  let buttonRow = new ActionRowBuilder<ButtonBuilder>();
  for (const button of buttons) {
    buttonRow.addComponents(
      new ButtonBuilder()
        .setCustomId(button.customId)
        .setLabel(button.label)
        .setStyle(button.style)
        ?.setEmoji(button.emoji)
    );
  }
  return buttonRow;
}

export async function CreateGuild(guild: Guild) {
  const createGuild = new GuildData({ id: guild.id });
  createGuild
    .save()
    .then(() =>
      console.log(
        `➕• Guild: ${guild.name} - ${guild.id} - ${guild.members.cache.size} users`
      )
    );
  return createGuild;
}

export async function CreateUser(userId: string, guild: Guild) {
  const userData = new UserData({
    id: userId,
    guilds: [guild.id],
    points: { guildId: guild.id, score: 0 },
  });
  userData.save();
}

export async function DeleteGuild(guild: Guild) {
  await GuildData.deleteOne({ id: guild.id }).then(() =>
    console.log(
      `➖– Guild: ${guild.name} - ${guild.id} - ${guild.members.cache.size} users`
    )
  );
}

export async function DeleteUser(userId: string) {
  await UserData.deleteOne({ id: userId });
}

export async function FetchGuild(guild: Guild) {
  let data = await GuildData.findOne({ id: guild.id });
  if (!data) data = await CreateGuild(guild);
  return data;
}

export async function FetchUser(userId: string, guild: Guild) {
  const data = await UserData.findOne({ id: userId });
  if (!data) await CreateUser(userId, guild);
  if (data.guilds.indexOf(guild.id) === -1) {
    data.guilds.push(guild.id);
    data.save();
  }
  return data;
}

export async function FetchUsersFromGuild(guild: Guild) {
  const data = await UserData.find({ guilds: guild.id });
  return data;
}

export async function UpdateGuild(guild: Guild, data: any) {
  const guildData = await FetchGuild(guild);
  if (typeof data !== "object") return;
  for (const key in data) {
    if (guildData[key] !== data[key]) guildData[key] = data[key];
  }
  return guildData.save();
}

export async function UpdateUser(userId: string, guild: Guild, data: any) {
  const userData = await FetchUser(userId, guild);
  if (typeof data !== "object") return;
  for (const key in data) {
    if (userData[key] !== data[key]) userData[key] = data[key];
  }
  return userData.save();
}

type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY";
export function FormatToDcDate(date: Date, format: DateFormat) {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  let DateString =
    format === "DD/MM/YYYY"
      ? `${day}/${month}/${year}`
      : `${month}/${day}/${year}`;
  DateString += ` ${hours}:${minutes}`;
  return DateString;
}

export async function FetchAndGetLang(guild: Guild) {
  const guildData = await FetchGuild(guild);
  return { guildData, lang: guildData.language };
}
