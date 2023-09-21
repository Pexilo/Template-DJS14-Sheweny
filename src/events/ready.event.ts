import type { ShewenyClient } from "sheweny";
import { Event } from "sheweny";

export class ReadyEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
      emitter: client,
    });
  }

  execute() {
    console.log(`✅ ${this.client.user!.username}`);
  }
}
