import nc from "next-connect";
import Post from "../../../models/Post";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
import { isAuth } from "../../../utils/auth";
import mongoose from "mongoose";

const handler = nc();

handler.use(isAuth).get(async (req, res) => {
   await dbConnect.connect();
   const user = await User.findById(req.user._id);
   await dbConnect.disconnect();
   res.send(user.bookmark);
});

handler.use(isAuth).post(async (req, res) => {
   await dbConnect.connect();
   const user = await User.findById(req.user._id);
   if (user) {
      user.bookmark.push({
         postID: mongoose.Types.ObjectId(req.body.postID),
      });
      await user.save();
      await dbConnect.disconnect();
      res.send(user);
   } else {
      await dbConnect.disconnect();
      res.send("ko co user nay");
   }
});

export default handler;
