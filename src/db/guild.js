const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  id: String,
  language: {
    type: String,
    default: "en",
  },
});

module.exports = mongoose.model("Guild", guildSchema);
