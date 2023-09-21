import LanguageManager from "@utils/language-manager";
import { Defer, Embed, FetchAndGetLang } from "@utils/shortcuts";
import type { CommandInteraction } from "discord.js";
import type { ShewenyClient } from "sheweny";
import { Command } from "sheweny";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ping",
      description: "🏓 Show the bot latency",
      descriptionLocalizations: {
        fr: "🏓 Affiche la latence du bot",
      },
      category: "Misc",
      clientPermissions: ["EmbedLinks"],
    });
  }

  async execute(interaction: CommandInteraction) {
    const { guild } = interaction;

    const start = Date.now();
    await Defer(interaction);
    const djsApiLantency = Date.now() - 1000 - start;

    const { lang } = await FetchAndGetLang(guild!);
    const languageManager = new LanguageManager();
    const ping = languageManager.getCommandTranslation(lang).ping;

    return await interaction.editReply({
      embeds: [
        Embed()
          .setTitle(`🏓 ${ping.title}`)
          .addFields(
            {
              name: `🤖 ${ping.fields[0].name}`,
              value: `${"```"}${djsApiLantency}ms${"```"}`,
            },
            {
              name: `📡 ${ping.fields[0].name}`,
              value: `${"```"}${interaction.client.ws.ping + 1}ms${"```"}`,
            }
          ),
      ],
    });
  }
}
