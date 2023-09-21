import LanguageManager from "@utils/language-manager";
import { Defer, FetchAndGetLang } from "@utils/shortcuts";
import type { ButtonInteraction } from "discord.js";
import type { ShewenyClient } from "sheweny";
import { Button } from "sheweny";

export class ButtonComponent extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["primaryId", "secondaryId", "successId", "dangerId"]);
  }

  async execute(button: ButtonInteraction) {
    const { guild, customId } = button;
    await Defer(button);

    const { lang } = await FetchAndGetLang(guild!);
    const languageManager = new LanguageManager();
    const templateBtns =
      languageManager.getInterractionTranslation(lang).templateBtns;

    switch (customId) {
      case "primaryId":
        await button.editReply({
          content: templateBtns.primary,
        });
        break;
      case "secondaryId":
        await button.editReply({
          content: templateBtns.secondary,
        });
        break;
      case "successId":
        await button.editReply({
          content: templateBtns.success,
        });
        break;
      case "dangerId":
        await button.editReply({
          content: templateBtns.danger,
        });
        break;
    }
  }
}
