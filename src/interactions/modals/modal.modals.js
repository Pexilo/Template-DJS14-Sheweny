const { Modal } = require("sheweny");

class ModalComponent extends Modal {
  constructor(client) {
    super(client, ["modal-id"]);
  }

  async execute(modal) {
    modal.reply("Modal received !");
  }
}

module.exports = ModalComponent;
