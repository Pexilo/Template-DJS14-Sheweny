const { Event } = require("sheweny");

class ReadyEvent extends Event {
  constructor(client) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
      emitter: client,
    });
  }

  execute() {
    console.log(`✅ ${this.client.user.username}`);
  }
}

module.exports = ReadyEvent;
