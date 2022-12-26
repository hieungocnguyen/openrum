import nc from "next-connect";
import Post from "../../../models/Post";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
import { isAuth } from "../../../utils/auth";
import mongoose from "mongoose";

const handler = nc();

handler.use(isAuth).get(async (req, res) => {
   await dbConnect.connect();
   const posts = await Post.find({ authorID: req.user._id });
   await dbConnect.disconnect();
   res.send(posts);
});

export default handler;
