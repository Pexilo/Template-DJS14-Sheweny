const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const { UserData } = require("../db/index");
const { GuildData } = require("../db/index");

function Embed(color = true) {
  const embed = new EmbedBuilder();
  if (color) embed.setColor("#2b2d31");
  return embed;
}

function Wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function Defer(interaction) {
  let bool = true;
  await interaction.deferReply({ ephemeral: true }).catch(() => {
    bool = false;
  });
  await Wait(1000);
  return bool;
}

function Truncate(str, max) {
  return str.length > max ? str.substring(0, max - 1) + "..." : str;
}

function CreateButtons(buttons) {
  let buttonRow = new ActionRowBuilder();
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

async function CreateGuild(guild) {
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

async function CreateUser(userId, guild) {
  const userData = new UserData({
    id: userId,
    guilds: [guild.id],
    points: { guildId: guild.id, score: 0 },
  });
  userData.save();
}

async function DeleteGuild(guild) {
  await GuildData.deleteOne({ id: guild.id }).then(() =>
    console.log(
      `➖– Guild: ${guild.name} - ${guild.id} - ${guild.members.cache.size} users`
    )
  );
}

async function DeleteUser(userId) {
  await UserData.deleteOne({ id: userId });
}

async function FetchGuild(guild) {
  let data = await GuildData.findOne({ id: guild.id });
  if (!data) data = await CreateGuild(guild);
  return data;
}

async function FetchUser(userId, guild) {
  const data = await UserData.findOne({ id: userId });
  if (!data) await CreateUser(userId, guild);
  if (data.guilds.indexOf(guild.id) === -1) {
    data.guilds.push(guild.id);
    data.save();
  }
  return data;
}

async function FetchUsersFromGuild(guild) {
  const data = await UserData.find({ guilds: guild.id });
  return data;
}

async function UpdateGuild(guild, data) {
  const guildData = await FetchGuild(guild);
  if (typeof data !== "object") return;
  for (const key in data) {
    if (guildData[key] !== data[key]) guildData[key] = data[key];
  }
  return guildData.save();
}

async function UpdateUser(userId, guild, data) {
  const userData = await FetchUser(userId, guild);
  if (typeof data !== "object") return;
  for (const key in data) {
    if (userData[key] !== data[key]) userData[key] = data[key];
  }
  return userData.save();
}

// Format expected into date parameter: "DD/MM/YYYY" | "MM/DD/YYYY";
function FormatToDcDate(date, format) {
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

async function FetchAndGetLang(guild) {
  const guildData = await FetchGuild(guild);
  return { guildData, lang: guildData.language };
}

module.exports = {
  Embed,
  Wait,
  Defer,
  Truncate,
  CreateButtons,
  CreateGuild,
  CreateUser,
  DeleteGuild,
  DeleteUser,
  FetchGuild,
  FetchUser,
  FetchUsersFromGuild,
  UpdateGuild,
  UpdateUser,
  FormatToDcDate,
  FetchAndGetLang,
};
