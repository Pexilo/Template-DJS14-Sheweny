import { Defer, Embed } from "@utils/shortcuts";
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
    const start = Date.now();
    await Defer(interaction);
    const djsApiLantency = Date.now() - 1000 - start;

    return await interaction.editReply({
      embeds: [
        Embed()
          .setTitle(`🏓 Pong!`)
          .addFields(
            {
              name: `🤖 Bot Latency`,
              value: `${"```"}${djsApiLantency}ms${"```"}`,
            },
            {
              name: `📡 Discord API`,
              value: `${"```"}${interaction.client.ws.ping + 1}ms${"```"}`,
            }
          ),
      ],
    });
  }
}
