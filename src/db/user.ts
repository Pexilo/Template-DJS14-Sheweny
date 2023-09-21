import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: String,
  guilds: {
    type: Array,
    default: ["" /* Guild ID */],
  },
});

export default mongoose.model("User", userSchema);
