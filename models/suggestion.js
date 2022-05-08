const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SuggestionSchema = new Schema(
    {
        body: String,
        createdAt: { type: Date, default: Date.now },
        usage: {
            type: String,
            enum: ["report", "feature"],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
);

module.exports = mongoose.model("Suggestion", SuggestionSchema);