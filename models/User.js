import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      isAdmin: { type: Boolean, required: true, default: false },
      bookmark: [
         {
            postID: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Post",
            },
         },
      ],
   },
   {
      timestamps: true,
   }
);
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
