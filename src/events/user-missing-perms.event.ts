import LanguageManager from "@utils/language-manager";
import { Defer, FetchAndGetLang } from "@utils/shortcuts";
import { CommandInteraction } from "discord.js";
import type { ShewenyClient } from "sheweny";
import { Event } from "sheweny";

export class UserMissingPermissionsListener extends Event {
  constructor(client: ShewenyClient) {
    super(client, "userMissingPermissions", {
      description: "User missing permissions.",
      emitter: client.managers.commands,
    });
  }

  async execute(interaction: CommandInteraction, missing: any) {
    const { guild } = interaction;
    await Defer(interaction);

    const { lang } = await FetchAndGetLang(guild!);
    const languageManager = new LanguageManager();
    const userMissingPermissions =
      languageManager.getEventTranslation(lang).userMissingPermissions; // Variables used: 'missing'

    return await interaction.editReply({
      content: eval(userMissingPermissions.response),
    });
  }
}
