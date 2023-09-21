import LanguageManager from "@utils/language-manager";
import { Defer, UpdateGuild } from "@utils/shortcuts";
import {
  ApplicationCommandOptionType,
  type CommandInteraction,
} from "discord.js";
import type { ShewenyClient } from "sheweny";
import { Command } from "sheweny";

export class LanguageCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "language",
      nameLocalizations: {
        fr: "langue",
      },
      description: "🤌 Change the bot language",
      descriptionLocalizations: {
        fr: "🤌 Change la langue du bot",
      },
      category: "Setup",
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "language",
          nameLocalizations: {
            fr: "langue",
          },
          description: "🗣️ Language to set",
          descriptionLocalizations: {
            fr: "🗣️ Langue à définir",
          },
          required: true,
          choices: [
            {
              name: "English",
              value: "en",
            },
            {
              name: "Français",
              value: "fr",
            },
          ],
        },
      ],
      userPermissions: ["ManageGuild"],
    });
  }

  async execute(interaction: CommandInteraction) {
    const { guild, options } = interaction;
    await Defer(interaction);

    const lang = options.get("language")!.value as string;
    const languageManager = new LanguageManager();
    const language = languageManager.getCommandTranslation(lang).language;

    await UpdateGuild(guild!, {
      language: lang,
    });

    return interaction.editReply({
      content: language.response,
    });
  }
}
