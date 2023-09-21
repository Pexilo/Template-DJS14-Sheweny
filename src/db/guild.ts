import mongoose from "mongoose";

const guildSchema = new mongoose.Schema({
  id: String,
  language: {
    type: String,
    default: "en",
  },
});

export default mongoose.model("Guild", guildSchema);
