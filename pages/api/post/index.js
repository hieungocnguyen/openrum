import mongoose from "mongoose";
import nc from "next-connect";
import Post from "../../../models/Post";
import dbConnect from "../../../utils/dbConnect";

const handler = nc();

handler.get(async (req, res) => {
   await dbConnect.connect();
   const posts = await Post.find({});
   await dbConnect.disconnect();
   res.send(posts);
});

handler.post(async (req, res) => {
   await dbConnect.connect();
   const newPost = new Post({
      subject: req.body.subject,
      content: req.body.content,
      category: "sample category",
      author: "sample author",
   });
   const post = await newPost.save();
   await dbConnect.disconnect();
   res.send({ message: "Post Created", post });
});

export default handler;
