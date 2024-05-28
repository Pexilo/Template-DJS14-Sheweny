const { Defer } = require("../../utils/shortcuts");
const { Button } = require("sheweny");

class ButtonComponent extends Button {
  constructor(client) {
    super(client, ["primaryId", "secondaryId", "successId", "dangerId"]);
  }

  async execute(button) {
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

module.exports = ButtonComponent;
