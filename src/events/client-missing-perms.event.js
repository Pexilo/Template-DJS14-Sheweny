const { Defer } = require("../utils/shortcuts");
const { Event } = require("sheweny");

class ClientMissingPermissionsListener extends Event {
  constructor(client) {
    super(client, "clientMissingPermissions", {
      description: "Client missing permissions.",
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

module.exports = ClientMissingPermissionsListener;
