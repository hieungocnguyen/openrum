import mongoose from "mongoose";
import nc from "next-connect";
import dbConnect from "../../../utils/dbConnect";
import Post from "../../../models/Post";

const handler = nc();

handler.get(async (req, res) => {
   await dbConnect.connect();
   const categories = await Post.find().distinct("category");
   await dbConnect.disconnect();
   res.send(categories);
});

export default handler;
