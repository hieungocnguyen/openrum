import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         require: true,
      },
      post: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Post",
         require: true,
      },
      state: {
         type: Boolean,
         require: true,
      },
   },
   {
      timestamps: true,
   }
);
module.exports = mongoose.models.Like || mongoose.model("Like", LikeSchema);
