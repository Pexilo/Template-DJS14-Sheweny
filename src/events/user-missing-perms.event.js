const { Defer } = require("../utils/shortcuts");
const { Event } = require("sheweny");

class UserMissingPermissionsListener extends Event {
  constructor(client) {
    super(client, "userMissingPermissions", {
      description: "User missing permissions.",
      emitter: client.managers.commands,
    });
  }

  async execute(interaction, missing) {
    await Defer(interaction);

    return await interaction.editReply({
      content: `🚫 I need \`${missing}\` permission(s) to execute this command.`,
    });
  }
}

module.exports = UserMissingPermissionsListener;
