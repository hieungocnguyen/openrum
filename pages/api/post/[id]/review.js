import mongoose from "mongoose";
import nextConnect from "next-connect";
import dbConnect from "../../../../utils/dbConnect";
import Post from "../../../../models/Post";
import { isAuth } from "../../../../utils/auth";

const handler = nextConnect();

handler.get(async (req, res) => {
   dbConnect.connect();
   const post = await Post.findById(req.query.id);
   dbConnect.disconnect();
   if (product) {
      res.send(post.reviews);
   } else {
      res.status(404).send({ message: "Product not found" });
   }
});

handler.use(isAuth).post(async (req, res) => {
   await dbConnect.connect();
   const post = await Post.findById(req.query.id);
   if (post) {
      const review = {
         user: mongoose.Types.ObjectId(req.user._id),
         name: req.user.name,
         comment: req.body.comment,
      };
      post.reviews.push(review);
      await post.save();
      await dbConnect.disconnect();
      res.status(201).send({
         message: "Review submitted",
      });
   } else {
      await dbConnect.disconnect();
      res.status(404).send({ message: "Product Not Found" });
   }
});

export default handler;
