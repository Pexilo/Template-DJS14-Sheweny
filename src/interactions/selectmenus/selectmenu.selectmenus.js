const { Defer } = require("../../utils/shortcuts");
const { SelectMenu } = require("sheweny");

class SelectComponent extends SelectMenu {
  constructor(client) {
    super(client, ["selectId"]);
  }

  async execute(selectMenu) {
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

module.exports = SelectComponent;
