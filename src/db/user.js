const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  guilds: {
    type: Array,
    default: [
      /* Guild ID */
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
