import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   name: { type: String, required: true },
   comment: { type: String, required: true },
});

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
      reviews: [ReviewSchema],
   },
   {
      timestamps: true,
   }
);
module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);
