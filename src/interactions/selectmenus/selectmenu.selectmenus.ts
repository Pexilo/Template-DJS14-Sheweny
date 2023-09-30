import { Defer } from "@utils/shortcuts";
import { StringSelectMenuInteraction } from "discord.js";
import type { ShewenyClient } from "sheweny";
import { SelectMenu } from "sheweny";

export class SelectComponent extends SelectMenu {
  constructor(client: ShewenyClient) {
    super(client, ["selectId"]);
  }

  async execute(selectMenu: StringSelectMenuInteraction) {
    const { values } = selectMenu;
    await Defer(selectMenu);

    switch (values[0]) {
      case "first_option":
        await selectMenu.editReply({
          content: "You have selected **first** option !",
        });
        break;
      case "second_option":
        await selectMenu.editReply({
          content: "You have selected **second** option !",
        });
        break;
    }
  }
}
