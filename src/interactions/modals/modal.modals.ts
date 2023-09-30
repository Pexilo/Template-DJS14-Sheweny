import type { ModalSubmitInteraction } from "discord.js";
import type { ShewenyClient } from "sheweny";
import { Modal } from "sheweny";

export class ModalComponent extends Modal {
  constructor(client: ShewenyClient) {
    super(client, ["modal-id"]);
  }

  async execute(modal: ModalSubmitInteraction) {
    modal.reply("Modal received !");
  }
}
