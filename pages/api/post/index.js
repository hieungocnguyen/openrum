import mongoose from "mongoose";
import nc from "next-connect";
import Post from "../../../models/Post";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
import { isAuth } from "../../../utils/auth";

const handler = nc();

handler.get(async (req, res) => {
   await dbConnect.connect();
   const posts = await Post.find({});
   await dbConnect.disconnect();
   res.send(posts);
});

handler.use(isAuth).post(async (req, res) => {
   await dbConnect.connect();
   const newPost = new Post({
      subject: req.body.subject,
      content: req.body.content,
      category: req.body.category,
      // author: {
      //    name: req.user.name,
      //    user: req.user._id,
      // },
      authorID: req.user._id,
      authorName: req.user.name,
      image: req.body.image,
   });
   const post = await newPost.save();
   await dbConnect.disconnect();
   res.send({ message: "Post created", post });
});

export default handler;
