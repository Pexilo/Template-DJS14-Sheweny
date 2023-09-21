import LanguageManager from "@utils/language-manager";
import { Defer, FetchAndGetLang } from "@utils/shortcuts";
import type { ModalSubmitInteraction } from "discord.js";
import type { ShewenyClient } from "sheweny";
import { Modal } from "sheweny";

export class ModalComponent extends Modal {
  constructor(client: ShewenyClient) {
    super(client, ["modal-id"]);
  }

  async execute(modal: ModalSubmitInteraction) {
    const { guild } = modal;

    const { lang } = await FetchAndGetLang(guild!);
    const languageManager = new LanguageManager();
    const templateModal =
      languageManager.getInterractionTranslation(lang).templateModal;

    modal.reply(templateModal.response);
  }
}
