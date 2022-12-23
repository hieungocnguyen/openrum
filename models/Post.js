import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
   {
      subject: {
         type: String,
         require: true,
      },
      content: {
         type: String,
         require: true,
      },
      category: { type: String, required: true },
      author: { type: String, require: true },
      image: { type: String, required: true },
   },
   {
      timestamps: true,
   }
);
module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);
