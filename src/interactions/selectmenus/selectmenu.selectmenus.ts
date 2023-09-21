import LanguageManager from "@utils/language-manager";
import { Defer, FetchAndGetLang } from "@utils/shortcuts";
import { StringSelectMenuInteraction } from "discord.js";
import type { ShewenyClient } from "sheweny";
import { SelectMenu } from "sheweny";

export class SelectComponent extends SelectMenu {
  constructor(client: ShewenyClient) {
    super(client, ["selectId"]);
  }

  async execute(selectMenu: StringSelectMenuInteraction) {
    const { guild, values } = selectMenu;
    await Defer(selectMenu);

    const { lang } = await FetchAndGetLang(guild!);
    const languageManager = new LanguageManager();
    const templateSltMns =
      languageManager.getInterractionTranslation(lang).templateSltMns;

    switch (values[0]) {
      case "first_option":
        await selectMenu.editReply({
          content: templateSltMns.first_option,
        });
        break;
      case "second_option":
        await selectMenu.editReply({
          content: templateSltMns.second_option,
        });
        break;
    }
  }
}
