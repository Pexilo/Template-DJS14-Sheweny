import { Defer } from "@utils/shortcuts";
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
    await Defer(interaction);

    return await interaction.editReply({
      content: `🚫 I need \`${missing}\` permission(s) to execute this command.`,
    });
  }
}
