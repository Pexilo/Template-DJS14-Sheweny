import { Defer } from "@utils/shortcuts";
import type { ButtonInteraction } from "discord.js";
import type { ShewenyClient } from "sheweny";
import { Button } from "sheweny";

export class ButtonComponent extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["primaryId", "secondaryId", "successId", "dangerId"]);
  }

  async execute(button: ButtonInteraction) {
    const { customId } = button;
    await Defer(button);

    switch (customId) {
      case "primaryId":
        await button.editReply({
          content: "You have clicked on **primary** button !",
        });
        break;
      case "secondaryId":
        await button.editReply({
          content: "You have clicked on **secondary** button !",
        });
        break;
      case "successId":
        await button.editReply({
          content: "You have clicked on **success** button !",
        });
        break;
      case "dangerId":
        await button.editReply({
          content: "You have clicked on **danger** button !",
        });
        break;
    }
  }
}
